
import { defineNuxtPlugin } from '#imports';
import { utils } from './utils'

const quality = (base64: string, quality: number): Promise<{ data: string, size: string, quality: number, dimensions: { width: number, height: number } }> => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.crossOrigin = "anonymous";
        image.src = base64;

        image.addEventListener("load", () => {
            const width = image.naturalWidth;
            const height = image.naturalHeight;

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;

            // Calculate the aspect ratio of the image
            const imgAspectRatio = image.width / image.height;
            const canvasAspectRatio = width / height;

            let drawWidth: number, drawHeight: number;

            if (imgAspectRatio > canvasAspectRatio) {
                // Image is wider relative to its height than the canvas
                drawWidth = width;
                drawHeight = width / imgAspectRatio;
            } else {
                // Image is taller relative to its width than the canvas
                drawHeight = height;
                drawWidth = height * imgAspectRatio;
            }

            // Calculate the position to center the image
            const x = (width - drawWidth) / 2;
            const y = (height - drawHeight) / 2;

            context?.drawImage(image, x, y, drawWidth, drawHeight);

            const data = canvas.toDataURL('image/jpeg', quality); // quality only affected in jpeg format
            const bytes = Math.round((data.length * 3 / 4) - (data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0));
            const size = utils.formatBytes(bytes)

            resolve({
                data,
                size,
                quality,
                dimensions: {
                    width,
                    height
                }
            });
        }, false);

        image.addEventListener("error", (err) => {
            reject(err);
        }, false);
    });
};



const image = {
    quality
}

export default defineNuxtPlugin((_) => {
    return {
        provide: {
            image
        }
    }
})
