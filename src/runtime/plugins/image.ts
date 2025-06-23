import type Image from '../types/image';
import { utils } from './utils';

/**
 * Represents an image utility class for handling base64 images, drawing on canvas, and exporting with quality control.
 *
 * @example
 * ```typescript
 * const img = new Img(base64String);
 * img.load(() => {
 *   const result = img.draw(img.image, 0, 0, 100, 100, 0.8);
 *   console.log(result.data); // base64 JPEG data URL
 *   console.log(result.size); // formatted size string
 * }, (err) => {
 *   console.error('Image failed to load', err);
 * });
 * ```
 */
class Img {
    base64: string
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    image: HTMLImageElement
    quality: number = 1

    constructor(base64: string) {
        this.base64 = base64

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')

        this.image = new Image()
        this.image.crossOrigin = 'anonymous'
        this.image.src = base64
    }

    load(callback: Function, error: Function) {
        this.image.addEventListener('load', () => {
            callback()
        }, false)

        this.image.addEventListener('error', (err) => {
            error(err)
        }, false)
    }

    size(base64: string): string {
        const data = base64
        const bytes = Math.round((data.length * 3 / 4) - (data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0))
        return utils.formatBytes(bytes)
    }

    draw(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number, quality: number) {
        this.context?.drawImage(image, dx, dy, dw, dh)
        const data = this.canvas.toDataURL('image/jpeg', quality) // quality only affected in jpeg format
        const size = this.size(data)

        return {
            data, size
        }

    }
}

/**
 * Quality compresses a base64-encoded image to a specified quality level.
 * @param base64 - The base64-encoded string representing the image to compress.
 * @param quality - The quality level for compression (0 to 1).
 *  @returns A promise that resolves to an object containing:
 *   - `data`: The compressed image as a base64-encoded string.
 *    - `size`: The size of the compressed image as a string.
 *   - `quality`: The quality level used for compression.
 *    - `dimensions`: An object with the `width` and `height` of the compressed image.
 */
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

/**
 * Resizes a base64-encoded image to the specified dimensions while maintaining aspect ratio.
 *
 * @param base64 - The base64-encoded string representing the image to resize.
 * @param sizes - An array specifying the desired width and optionally height. 
 *                If only width is provided, height is calculated to maintain aspect ratio.
 * @returns A promise that resolves to an object containing:
 *   - `data`: The resized image as a base64-encoded string.
 *   - `size`: The size of the resized image as a string.
 *   - `dimensions`: An object with the `width` and `height` of the resized image.
 */
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

/**
 * Flips a base64-encoded image horizontally or vertically.
 *
 * @param base64 - The base64 string representing the image to flip.
 * @param direction - The direction to flip the image. Accepts 'horizontal' or 'vertical'.
 * @returns A Promise that resolves with an object containing:
 *   - `data`: The base64 string of the flipped image.
 *   - `size`: The size of the resulting image as a string.
 *   - `dimensions`: An object with the `width` and `height` of the image.
 *
 * @throws {Error} If the direction is invalid or the canvas context is null.
 *
 * @example
 * ```typescript
 * const base64Image = 'data:image/png;base64,...';
 * flip(base64Image, 'horizontal').then(result => {
 *   console.log(result.data); // Flipped image as base64
 *   console.log(result.size); // Size of the image
 *   console.log(result.dimensions); // { width: ..., height: ... }
 * }).catch(error => {
 *   console.error(error);
 * });
 * ```
 */
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

/**
 * Rotates a base64-encoded image by a specified angle ("left" or "right").
 *
 * @param base64 - The base64-encoded string of the image to rotate.
 * @param angle - The direction to rotate the image. Accepts "left" (−90°) or "right" (+90°).
 * @returns A promise that resolves to an object containing:
 *   - `data`: The rotated image as a base64-encoded JPEG string.
 *   - `size`: The size of the rotated image as a string.
 *   - `dimensions`: The width and height of the rotated image.
 *
 * @example
 * ```typescript
 * rotate(myBase64Image, "right").then(result => {
 *   console.log(result.data); // Rotated image as base64 string
 *   console.log(result.size); // Size of the rotated image
 *   console.log(result.dimensions); // { width, height }
 * });
 * ```
 */
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

/**
 * Converts a base64-encoded image string to a `File` object.
 *
 * @param base64 - The base64-encoded image string, including the data URI prefix (e.g., "data:image/png;base64,...").
 * @param filename - The desired filename for the resulting `File` object.
 * @returns A Promise that resolves to a `File` object representing the decoded image.
 *
 * @example
 * ```typescript
 * const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
 * base64toFile(base64, "image.png").then((file) => {
 *   // Use the File object, e.g., upload to a server
 *   console.log(file.name); // "image.png"
 * });
 * ```
 */
const base64toFile = (base64: string, filename: string): Promise<File> => {
    return new Promise((resolve, reject) => {
        const arr = base64.split(',')
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
        const bstr = atob(arr[1])
        const n = bstr.length
        const u8arr = new Uint8Array(n)

        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i)
        }

        resolve(new File([u8arr], filename, { type: mime }))
    })
}

/**
 * Converts a `File` object to a Base64-encoded data URL string.
 *
 * @param file - The file to be converted.
 * @returns A promise that resolves to a Base64-encoded string representing the file's data.
 *
 * @example
 * ```typescript
 * const input = document.querySelector('input[type="file"]');
 * input.addEventListener('change', async (event) => {
 *   const file = (event.target as HTMLInputElement).files?.[0];
 *   if (file) {
 *     const base64 = await fileToBase64(file);
 *     console.log(base64); // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *   }
 * });
 * ```
 */
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = (err) => {
            reject(err)
        }
        reader.readAsDataURL(file)
    })
}

const image: Image = {
    quality, resize, flip, rotate, base64toFile, fileToBase64
}

export { image };

