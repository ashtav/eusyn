
import { defineNuxtPlugin } from '#imports';

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

const on = (condition: boolean, then: any, or: any = '') => {
  return condition ? then : or
}

const utils = {
  ucwords, ucfirst, currency, cleanMap, randInt, randString, on
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

