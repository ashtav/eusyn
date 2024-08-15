
import { defineNuxtPlugin } from '#imports'
import type Image from '../types/image'
import { utils } from './utils'

class Img {
    base64: string
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    image: HTMLImageElement
    quality: number = 1

    constructor (base64: string) {
        this.base64 = base64

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')

        this.image = new Image()
        this.image.crossOrigin = 'anonymous'
        this.image.src = base64
    }

    load (callback: Function, error: Function) {
        this.image.addEventListener('load', () => {
            callback()
        }, false)

        this.image.addEventListener('error', (err) => {
            error(err)
        }, false)
    }

    size (base64: string): string {
        const data = base64
        const bytes = Math.round((data.length * 3 / 4) - (data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0))
        return utils.formatBytes(bytes)
    }

    draw (image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number, quality: number) {
        this.context?.drawImage(image, dx, dy, dw, dh)
        const data = this.canvas.toDataURL('image/jpeg', quality) // quality only affected in jpeg format
        const size = this.size(data)

        return {
            data, size
        }

    }
}

const quality = (base64: string, quality: number): Promise<{ data: string, size: string, quality: number, dimensions: { width: number, height: number } }> => {
    return new Promise((resolve, reject) => {
        const img = new Img(base64)
        const image = img.image, canvas = img.canvas

        img.load(() => {

            const width = image.naturalWidth
            const height = image.naturalHeight

            canvas.width = width
            canvas.height = height

            // Calculate the aspect ratio of the image
            const imgAspectRatio = image.width / image.height
            const canvasAspectRatio = width / height

            let drawWidth: number, drawHeight: number

            if (imgAspectRatio > canvasAspectRatio) {
                // Image is wider relative to its height than the canvas
                drawWidth = width
                drawHeight = width / imgAspectRatio
            } else {
                // Image is taller relative to its width than the canvas
                drawHeight = height
                drawWidth = height * imgAspectRatio
            }

            // Calculate the position to center the image
            const x = (width - drawWidth) / 2
            const y = (height - drawHeight) / 2

            const result = img.draw(image, x, y, drawWidth, drawHeight, quality)
            const data = result.data, size = result.size

            resolve({
                data, size, quality, dimensions: { width, height }
            })

        }, (err: ErrorEvent) => reject(err))
    })
}

const resize = (base64: string, sizes: Array<number>): Promise<{ data: string, size: string, dimensions: { width: number, height: number } }> => {
    return new Promise((resolve, reject) => {
        const img = new Img(base64)
        const image = img.image, canvas = img.canvas

        img.load(() => {
            const originalWidth = image.naturalWidth
            const originalHeight = image.naturalHeight

            const width = sizes.length > 0 ? sizes[0] : originalWidth
            let height = sizes.length > 1 ? sizes[1] : (width * originalHeight) / originalWidth

            if (sizes.length < 2) {
                height = (width * originalHeight) / originalWidth
            }

            canvas.width = width
            canvas.height = height

            // Calculate the aspect ratio of the image
            const imgAspectRatio = originalWidth / originalHeight
            const canvasAspectRatio = width / height

            let drawWidth: number, drawHeight: number

            if (imgAspectRatio > canvasAspectRatio) {
                // Image is wider relative to its height than the canvas
                drawWidth = width
                drawHeight = width / imgAspectRatio
            } else {
                // Image is taller relative to its width than the canvas
                drawHeight = height
                drawWidth = height * imgAspectRatio
            }

            // Calculate the position to center the image
            const x = (width - drawWidth) / 2
            const y = (height - drawHeight) / 2

            const result = img.draw(image, x, y, drawWidth, drawHeight, 1)
            const data = result.data, size = result.size

            resolve({
                data, size, dimensions: { width, height }
            })

        }, (err: ErrorEvent) => reject(err))

    })
}

// direction is horizontal or vertical
const flip = (base64: string, direction: string): Promise<{ data: string, size: string, dimensions: { width: number, height: number } }> => {
    return new Promise((resolve, reject) => {
        const img = new Img(base64)
        const image = img.image, canvas = img.canvas

        img.load(() => {
            const originalWidth = image.naturalWidth
            const originalHeight = image.naturalHeight

            canvas.width = originalWidth
            canvas.height = originalHeight

            if (img.context) {
                if (direction === 'horizontal') {
                    img.context.translate(originalWidth, 0)
                    img.context.scale(-1, 1)
                } else if (direction === 'vertical') {
                    img.context.translate(0, originalHeight)
                    img.context.scale(1, -1)
                } else {
                    reject(new Error('Invalid direction'))
                    return
                }

                const result = img.draw(image, 0, 0, originalWidth, originalHeight, 1)
                const data = result.data, size = result.size

                resolve({
                    data, size, dimensions: { width: originalWidth, height: originalHeight }
                })
            } else {
                reject(new Error('Canvas context is null'))
            }

        }, (err: ErrorEvent) => reject(err))
    })
}

// angle can be string (right or left) or number (degree)
const rotate = (base64: string, angle: string): Promise<{ data: string, size: string, dimensions: { width: number, height: number } }> => {
    return new Promise((resolve, reject) => {
        const img = new Img(base64)
        const image = img.image

        img.load(() => {
            const originalWidth = image.naturalWidth
            const originalHeight = image.naturalHeight

            let degrees: number
            if (typeof angle === 'string') {
                if (angle === 'right') {
                    degrees = 90
                } else if (angle === 'left') {
                    degrees = -90
                } else {
                    reject(new Error('Invalid angle string'))
                    return
                }
            }

            const radians = degrees * Math.PI / 180

            // Calculate new dimensions
            const sin = Math.abs(Math.sin(radians))
            const cos = Math.abs(Math.cos(radians))
            const newWidth = originalWidth * cos + originalHeight * sin
            const newHeight = originalWidth * sin + originalHeight * cos

            // Create a new canvas for the rotation
            const newCanvas = document.createElement('canvas')
            newCanvas.width = newWidth
            newCanvas.height = newHeight
            const newContext = newCanvas.getContext('2d')

            if (newContext) {
                // Set the origin to the center of the new canvas
                newContext.translate(newWidth / 2, newHeight / 2)
                newContext.rotate(radians)
                newContext.drawImage(image, -originalWidth / 2, -originalHeight / 2)

                const data = newCanvas.toDataURL('image/jpeg', img.quality)
                const size = img.size(data)

                resolve({
                    data,
                    size,
                    dimensions: { width: newCanvas.width, height: newCanvas.height }
                })
            } else {
                reject(new Error('Canvas context is null'))
            }

        }, (err: ErrorEvent) => reject(err))
    })
}



const image: Image = {
    quality, resize, flip, rotate
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            image
        }
    }
})