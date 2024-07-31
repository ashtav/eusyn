
import { defineNuxtPlugin } from '#imports';

const alpha = (text: string): string => {
  return text.replace(/[^a-zA-Z ]/g, "")
}

const alphanumeric = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9. ]/g, "")
}

const numeric = (text: string): string => {
  return text.replace(/[^0-9]/g, "")
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} text - The input string.
 * @param {boolean} [normalize=false] - Optional flag to convert the string to lowercase before capitalizing.
 * @param {boolean} [strict=false] - Optional flag to capitalize the first letter of words inside parentheses.
 * @returns {string} The modified string with the first letter of each word capitalized.
 * @example
 * const str = "john doE (training)";
 * console.log(ucwords(str, false, true)); // 'John DoE (Training)'
 */
const ucwords = (text: string, normalize: boolean = false, strict: boolean = false): string => {
  let value = normalize ? text.toLowerCase() : text;

  if (strict) {
    return value.replace(/(?:^|\s|\()(\w)/g, function ($1) {
      return $1.toUpperCase();
    });
  } else {
    return value.replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase();
    });
  }
}

/**
 * Capitalizes the first letter of a string, with optional normalization to lowercase.
 * If the string contains HTML, it capitalizes the first letter of the actual content.
 * @param {string} text - The input string.
 * @param {boolean} [normalize=false] - Optional flag to convert the string to lowercase before capitalizing.
 * @returns {string} The modified string with the first letter capitalized.
 * @example
 * const str = "hello world";
 * console.log(ucfirst(str)); // 'Hello world'
 * 
 * const htmlStr = "<p>hello world</p>";
 * console.log(ucfirst(htmlStr)); // '<p>Hello world</p>'
 */
const ucfirst = (text: string, normalize: boolean = false): string => {
  const capitalizeFirstActualLetter = (htmlString: string) => {
    // Helper function to capitalize the first character of a string
    function capitalizeFirst(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return htmlString.replace(/(>[^<]*?)(\w)/, function (_, before, char) {
      return before + capitalizeFirst(char);
    });
  }

  const isHTML = (str: any) => {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i;
    return htmlRegex.test(str);
  }

  let value = normalize ? text.toLowerCase() : text;
  return isHTML(value) ? capitalizeFirstActualLetter(value as string) : value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Formats a string as a currency, adding a separator for thousands.
 * 
 * @param text - The string to format as a currency.
 * @param separator - The separator to use for thousands. Defaults to ','.
 * @returns The formatted currency string.
 */
const currency = (text: string, separator: string = ','): string => {
  return text.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

/**
 * Resets specific data properties on a Vue instance to their default values.
 * 
 * @param self - The Vue instance (`this` context).
 * @param key - The key or array of keys of the properties to reset.
 */
const cleanMap = (self: any, key: any) => {
  if (typeof key === 'string') {
    Object.assign(self.$data[key], (self.$options as any).data()[key]);
  } else if (Array.isArray(key)) {
    key.forEach((k) => {
      Object.assign(self.$data[k], (self.$options as any).data()[k]);
    })
  }
}

/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 * 
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min and max, inclusive.
 */
const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * randString is a function to generate random string
 * @param {number} [length=10] - Optional length of the string.
 * @param {boolean} [withSpecialChar=false] - Optional flag to include special characters.
 * @returns {string} The random string.
 * @example
 * const str = randString(10, true); // 'aBcDeFgHiJ'
 */
const randString = (length: number = 10, withSpecialChar: boolean = false): string => {
  let result = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  if (withSpecialChar) {
    characters += '!@#$%^&*()_+~`|}{[]\:;?><,./-='
  }
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength))
  }
  return result
}

const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const handleFiles = function (e: any, callback: any, config: any = {}): any {
  const file = e.target.files[0];
  if (file == null) return;

  // 1 kb = 1024, 1024 * 1000 = 1 mb
  let maxSize = config?.max_size || 1024 * 1000 * 3 // 3MB
  let allowedType = config?.allowed_type || ['image/png', 'image/jpeg', 'image/jpg']
  let minWidth = config?.min_width || 500, maxWidth = config?.max_width || 1920
  let minHeight = config?.min_height || 500, maxHeight = config?.max_height || 1920
  let strict = config?.strict || false

  if (file.size > maxSize) {
    callback({ error: `File size must be less than ${formatBytes(maxSize)}` })
    return;
  }

  // check file type
  if (!allowedType.includes(file.type) && !config?.allowed_type.includes('*')) {
    callback({ error: `File type must be ${allowedType.join(', ')}` })
    return;
  }

  if (typeof FileReader === "function") {
    const reader = new FileReader();
    reader.onload = (event) => {
      // check image resolution
      let img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {

        if (img.width < minWidth || img.width > maxWidth) {
          callback({ error: strict ? `Image width must be ${minWidth}px` : `Image width must be between ${minWidth}px and ${maxWidth}px` });
          return;
        }

        if (img.height < minHeight || img.height > maxHeight) {
          callback({ error: strict ? `Image height must be ${minWidth}px` : `Image height must be between ${minHeight}px and ${maxHeight}px` });
          return;
        }

        if (callback) {
          callback({
            name: file.name,
            size: formatBytes(file.size),
            type: file.type,
            data: event.target?.result
          })
        }
      }

      // if not image
      if (file.type.startsWith('image/') === false && callback) {
        callback({
          name: file.name,
          size: formatBytes(file.size),
          type: file.type,
          data: event.target?.result
        })
      }
    };
    reader.readAsDataURL(file);
  } else {
    callback({ error: `Your browser does not support FileReader.` })
  }
}

const on = (condition: boolean, then: any, or: any = '') => {
  return condition ? then : or
}

const utils = {
  alpha, numeric, alphanumeric, ucwords, ucfirst, currency, cleanMap, randInt, randString, formatBytes, handleFiles, on
}

export default defineNuxtPlugin((_) => {
  return {
    provide: {
      _: utils
    }
  }
})

const _ = utils
export { _, utils };

