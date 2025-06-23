import { utils } from "./utils.mjs";
class Img {
  base64;
  canvas;
  context;
  image;
  quality = 1;
  constructor(base64) {
    this.base64 = base64;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.crossOrigin = "anonymous";
    this.image.src = base64;
  }
  load(callback, error) {
    this.image.addEventListener("load", () => {
      callback();
    }, false);
    this.image.addEventListener("error", (err) => {
      error(err);
    }, false);
  }
  size(base64) {
    const data = base64;
    const bytes = Math.round(data.length * 3 / 4 - (data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0));
    return utils.formatBytes(bytes);
  }
  draw(image2, dx, dy, dw, dh, quality2) {
    this.context?.drawImage(image2, dx, dy, dw, dh);
    const data = this.canvas.toDataURL("image/jpeg", quality2);
    const size = this.size(data);
    return {
      data,
      size
    };
  }
}
const quality = (base64, quality2) => {
  return new Promise((resolve, reject) => {
    const img = new Img(base64);
    const image2 = img.image, canvas = img.canvas;
    img.load(() => {
      const width = image2.naturalWidth;
      const height = image2.naturalHeight;
      canvas.width = width;
      canvas.height = height;
      const imgAspectRatio = image2.width / image2.height;
      const canvasAspectRatio = width / height;
      let drawWidth, drawHeight;
      if (imgAspectRatio > canvasAspectRatio) {
        drawWidth = width;
        drawHeight = width / imgAspectRatio;
      } else {
        drawHeight = height;
        drawWidth = height * imgAspectRatio;
      }
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      const result = img.draw(image2, x, y, drawWidth, drawHeight, quality2);
      const data = result.data, size = result.size;
      resolve({
        data,
        size,
        quality: quality2,
        dimensions: { width, height }
      });
    }, (err) => reject(err));
  });
};
const resize = (base64, sizes) => {
  return new Promise((resolve, reject) => {
    const img = new Img(base64);
    const image2 = img.image, canvas = img.canvas;
    img.load(() => {
      const originalWidth = image2.naturalWidth;
      const originalHeight = image2.naturalHeight;
      const width = sizes.length > 0 ? sizes[0] : originalWidth;
      let height = sizes.length > 1 ? sizes[1] : width * originalHeight / originalWidth;
      if (sizes.length < 2) {
        height = width * originalHeight / originalWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const imgAspectRatio = originalWidth / originalHeight;
      const canvasAspectRatio = width / height;
      let drawWidth, drawHeight;
      if (imgAspectRatio > canvasAspectRatio) {
        drawWidth = width;
        drawHeight = width / imgAspectRatio;
      } else {
        drawHeight = height;
        drawWidth = height * imgAspectRatio;
      }
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      const result = img.draw(image2, x, y, drawWidth, drawHeight, 1);
      const data = result.data, size = result.size;
      resolve({
        data,
        size,
        dimensions: { width, height }
      });
    }, (err) => reject(err));
  });
};
const flip = (base64, direction) => {
  return new Promise((resolve, reject) => {
    const img = new Img(base64);
    const image2 = img.image, canvas = img.canvas;
    img.load(() => {
      const originalWidth = image2.naturalWidth;
      const originalHeight = image2.naturalHeight;
      canvas.width = originalWidth;
      canvas.height = originalHeight;
      if (img.context) {
        if (direction === "horizontal") {
          img.context.translate(originalWidth, 0);
          img.context.scale(-1, 1);
        } else if (direction === "vertical") {
          img.context.translate(0, originalHeight);
          img.context.scale(1, -1);
        } else {
          reject(new Error("Invalid direction"));
          return;
        }
        const result = img.draw(image2, 0, 0, originalWidth, originalHeight, 1);
        const data = result.data, size = result.size;
        resolve({
          data,
          size,
          dimensions: { width: originalWidth, height: originalHeight }
        });
      } else {
        reject(new Error("Canvas context is null"));
      }
    }, (err) => reject(err));
  });
};
const rotate = (base64, angle) => {
  return new Promise((resolve, reject) => {
    const img = new Img(base64);
    const image2 = img.image;
    img.load(() => {
      const originalWidth = image2.naturalWidth;
      const originalHeight = image2.naturalHeight;
      let degrees;
      if (typeof angle === "string") {
        if (angle === "right") {
          degrees = 90;
        } else if (angle === "left") {
          degrees = -90;
        } else {
          reject(new Error("Invalid angle string"));
          return;
        }
      }
      const radians = degrees * Math.PI / 180;
      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      const newWidth = originalWidth * cos + originalHeight * sin;
      const newHeight = originalWidth * sin + originalHeight * cos;
      const newCanvas = document.createElement("canvas");
      newCanvas.width = newWidth;
      newCanvas.height = newHeight;
      const newContext = newCanvas.getContext("2d");
      if (newContext) {
        newContext.translate(newWidth / 2, newHeight / 2);
        newContext.rotate(radians);
        newContext.drawImage(image2, -originalWidth / 2, -originalHeight / 2);
        const data = newCanvas.toDataURL("image/jpeg", img.quality);
        const size = img.size(data);
        resolve({
          data,
          size,
          dimensions: { width: newCanvas.width, height: newCanvas.height }
        });
      } else {
        reject(new Error("Canvas context is null"));
      }
    }, (err) => reject(err));
  });
};
const base64toFile = (base64, filename) => {
  return new Promise((resolve, reject) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    resolve(new File([u8arr], filename, { type: mime }));
  });
};
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};
const image = {
  quality,
  resize,
  flip,
  rotate,
  base64toFile,
  fileToBase64
};
export { image };
