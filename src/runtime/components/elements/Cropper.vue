<template>
  <div :class="['cropper', { 'show': show }]">
    <div class="canvas">
      <canvas id="__canvas" />
      <div id="__croparea" />

      <div class="text-white text-center small mt-3">
        Use the scroll wheel on the mouse to resize the crop area. <br> Press <code
          class="cursor-pointer"
          @click="doCrop"
        >Enter</code> to crop and
        <code class="cursor-pointer" @click="show = false">Esc</code> to cancel.
      </div>
    </div>

    <div class="backdrop" />
  </div>
</template>

<script lang="ts">

import type { Ref } from 'vue';
import { ref } from 'vue';

interface Config {
  x: number | null,
  y: number | null,
  size: number | null,
  minCropSize: number
}

interface CropData {
  data: string, // base64
  config?: Config,
  onCrop?: Function
}

export default {
  setup () {
    const show: Ref<boolean> = ref(false)
    const dimension: Ref<Object> = ref({ width: 0, height: 0 })

    let cropAreaConfig: Config = { x: null, y: null, size: null, minCropSize: 150 }
    let canvas: HTMLCanvasElement
    let context: CanvasRenderingContext2D
    let cropArea: HTMLDivElement

    let isDragging = false
    let redrawPending = false
    let cropAreaPosition = { x: 0, y: 0, ox: 0, oy: 0 }

    const degree = 0
    let cropperCallback: Function
    let imageOrigin: string

    const getCroppedData = (): string => {
      const x = cropArea.offsetLeft
      const y = cropArea.offsetTop
      const width = cropArea.offsetWidth
      const height = cropArea.offsetHeight

      const croppedCanvas = document.createElement('canvas') as HTMLCanvasElement
      const croppedCtx = croppedCanvas.getContext('2d') as CanvasRenderingContext2D
      croppedCanvas.width = width
      croppedCanvas.height = height

      // clear the region inside the crop area
      croppedCtx.clearRect(0, 0, width, height)

      // draw the cropped portion of the image inside the crop area
      croppedCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height)

      // call callback
      return croppedCanvas.toDataURL()
    }

    const doCrop = () => {
      if (cropperCallback) {
        const base64: string = getCroppedData()
        cropperCallback(base64)
        show.value = false
      }
    }

    const initKeyShortcut = (value: boolean) => {
      if (!value) {
        return document.onkeydown = null
      }

      document.onkeydown = (e) => {
        if ((e.key == 'Escape' || e.key == 'Esc') && show.value) {
          e.preventDefault()
          show.value = false
        }

        if (e.key == 'Enter' && show.value) {
          e.preventDefault()
          doCrop()
        }
      }
    }

    const clearCropAreaImage = (image: HTMLImageElement, width: number, height: number) => {
      // clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height)

      // translate the canvas to the center point
      context.translate((canvas.width / 2), (canvas.height / 2))

      // rotate the canvas based on the current degree
      context.rotate(degree * Math.PI / 180)

      // flip the canvas horizontally if it was flipped
      // if (flippedHorizontally) {
      //     ctx.scale(-1, 1);
      // }

      // // flip the canvas vertically if it was flipped
      // if (flippedVertically) {
      //     ctx.scale(1, -1);
      // }

      // draw the image
      context.drawImage(image, -width / 2, -height / 2, width, height)

      // reset transformations
      context.setTransform(1, 0, 0, 1, 0, 0)

      // draw the black backdrop outside the crop area
      context.fillStyle = 'rgba(0, 0, 0, 0.6)'
      context.fillRect(0, 0, canvas.width, cropArea.offsetTop)
      context.fillRect(0, cropArea.offsetTop + cropArea.offsetHeight, canvas.width, canvas.height - (cropArea.offsetTop + cropArea.offsetHeight))
      context.fillRect(0, cropArea.offsetTop, cropArea.offsetLeft, cropArea.offsetHeight)
      context.fillRect(cropArea.offsetLeft + cropArea.offsetWidth, cropArea.offsetTop, canvas.width - (cropArea.offsetLeft + cropArea.offsetWidth), cropArea.offsetHeight)

      dimension.value = { width: cropArea.offsetWidth, height: cropArea.offsetHeight }
    }

    const updateCropAreaSize = (size: number) => {
      cropArea.style.width = `${size}px`
      cropArea.style.height = `${size}px`
    }

    const drawCropArea = (image: HTMLImageElement, width: number, height: number) => {
      const defaultSize = Math.min(width, height) * 0.7 // 70% from size of image
      const size = cropAreaConfig.size !== null ? cropAreaConfig.size : defaultSize

      if (cropAreaConfig.x === null && cropAreaConfig.y === null) {
        cropArea.style.left = `${(width / 2) - (size / 2)}px`
        cropArea.style.top = `${(height / 2) - (size / 2)}px`
      } else {
        // cropArea.style.left = `${cropAreaConfig.x}px`;
        // cropArea.style.top = `${cropAreaConfig.y}px`;
      }

      updateCropAreaSize(size)
      clearCropAreaImage(image, width, height)

      // set crop area data
      const setCropAreaData = (e: MouseEvent) => {
        cropAreaPosition = {
          x: e.clientX,
          y: e.clientY,
          ox: e.clientX - cropArea.offsetLeft,
          oy: e.clientY - cropArea.offsetTop
        }

        cropAreaConfig.x = cropAreaPosition.x
        cropAreaConfig.y = cropAreaPosition.y
      }

      // add event listener to crop area
      cropArea.onmousedown = (e) => {
        isDragging = true

        setCropAreaData(e)
      }

      document.onmouseup = (e) => {
        isDragging = false

        // store last crop area position
        setCropAreaData(e)
      }

      document.onmousemove = (e) => {
        if (isDragging) {
          let x = e.clientX - cropAreaPosition.ox
          let y = e.clientY - cropAreaPosition.oy

          // ensure the crop area does not go outside the canvas boundaries
          x = Math.max(0, Math.min(x, width - cropArea.offsetWidth))
          y = Math.max(0, Math.min(y, height - cropArea.offsetHeight))

          cropArea.style.left = `${x}px`
          cropArea.style.top = `${y}px`

          // throttle the redraw
          if (!redrawPending) {
            redrawPending = true
            requestAnimationFrame(() => {
              clearCropAreaImage(image, width, height)
              redrawPending = false
            })
          }
        }
      }

      cropArea.onwheel = (e: any) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -10 : 10
        const currentLeft = cropArea.offsetLeft
        const currentTop = cropArea.offsetTop
        const currentSize = cropArea.offsetWidth
        const mouseX = e.clientX - cropArea.getBoundingClientRect().left
        const mouseY = e.clientY - cropArea.getBoundingClientRect().top

        let newSize = currentSize + delta

        // ensure the new size does not exceed canvas boundaries
        newSize = Math.max(cropAreaConfig.minCropSize, Math.min(newSize, Math.min(width, height)))
        cropAreaConfig.size = newSize

        // calculate new position based on new size
        let newLeft = currentLeft - (newSize - currentSize) * (mouseX / currentSize)
        let newTop = currentTop - (newSize - currentSize) * (mouseY / currentSize)

        // ensure the new position stays within the canvas boundaries
        newLeft = Math.max(0, Math.min(newLeft, width - newSize))
        newTop = Math.max(0, Math.min(newTop, height - newSize))

        updateCropAreaSize(newSize)
        cropArea.style.left = `${newLeft}px`
        cropArea.style.top = `${newTop}px`

        clearCropAreaImage(image, width, height)
      }

    }

    const drawCanvas = (image: HTMLImageElement, width: number, height: number) => {
      canvas = document.getElementById('__canvas') as HTMLCanvasElement
      context = canvas.getContext('2d') as CanvasRenderingContext2D
      cropArea = document.getElementById('__croparea') as HTMLDivElement

      if (!canvas || !context) {
        console.error('Canvas or context not found!')
        return
      }

      // adjust size (width & height) to fit in the screen
      const maxDimension = Math.min(window.innerWidth, window.innerHeight) * 0.7

      if (width > height) {
        if (width > maxDimension) {
          height *= maxDimension / width
          width = maxDimension
        }
      } else {
        if (height > maxDimension) {
          width *= maxDimension / height
          height = maxDimension
        }
      }

      canvas.width = width
      canvas.height = height

      context.drawImage(image, 0, 0, width, height)

      // fill the canvas with a semi-transparent black color
      context.fillStyle = 'rgba(0, 0, 0, 0.5)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      // draw crop area
      drawCropArea(image, width, height)
    }

    const init = (data: CropData) => {
      show.value = true
      initKeyShortcut(true)

      // callback cropper
      cropperCallback = data.onCrop as Function

      // init crop area config
      // cropAreaConfig = data.config ?? { x: null, y: null, size: null, minCropSize: 150 }

      // init image data
      const image = new Image()
      image.src = imageOrigin ?? data.data

      if (imageOrigin == null) {
        imageOrigin = image.src
      } else {
        if (imageOrigin != data.data) {
          image.src = data.data
          imageOrigin = image.src

          cropAreaConfig = { x: null, y: null, size: null, minCropSize: 150 }
        }
      }

      image.onload = () => {
        const width = image.width
        const height = image.height

        drawCanvas(image, width, height)
      }

    }

    return { show, init, doCrop }
  }
}
</script>

<style lang="scss" scoped>
.cropper,
.backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.cropper {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: .2s;
    z-index: 999999;

    &.show {
        opacity: 1;
        pointer-events: all;

        .backdrop {
            background: rgba(0, 0, 0, 0.7);
            // backdrop-filter: blur(5px);
        }
    }

    .backdrop {
        background: rgba(0, 0, 0, 0);
        // backdrop-filter: blur(0px);
        transition: .2s;
    }

    .canvas {
        z-index: 1;
        position: absolute;

        #__croparea {
            position: absolute;
            border: 1px dashed white;
            cursor: move;

            &::before,
            &::after {
                position: absolute;
                color: white;
                font-size: 12px;
            }

            &::before {
                content: attr(data-x);
                left: -25px;
                top: 50%;
                transform: rotate(-90deg) translate(0, -50%);
                transform-origin: 50% 50%;
                will-change: transform;
                backface-visibility: hidden;
                // filter: blur(0);
            }

            &::after {
                content: attr(data-x);
                top: 0px;
                left: 50%;
                transform: translate(-50%, -25px);
            }
        }
    }
}
</style>