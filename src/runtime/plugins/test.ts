/**
 * Removes all non-alphabetical characters from the input text.
 * 
 * @param {string} text - The input string to be processed.
 * @returns {string} - A string containing only alphabetical characters and spaces.
 */
const alpha = (text: string): string => {
  return text.replace(/[^a-zA-Z ]/g, "")
}

/**
 * Removes all non-alphanumeric characters from the input text, except for periods and spaces.
 * 
 * @param {string} text - The input string to be processed.
 * @returns {string} - A string containing only alphanumeric characters, periods, and spaces.
 */
const alphanumeric = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9. ]/g, "")
}

/**
 * Removes all non-numeric characters from the input text.
 * 
 * @param {string} text - The input string to be processed.
 * @returns {string} - A string containing only numeric characters.
 */
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

/**
 * Converts a number of bytes into a more readable string format with the specified number of decimal places.
 * 
 * @param {number} bytes - The number of bytes to be formatted.
 * @param {number} [decimals=2] - The number of decimal places to include in the formatted string. Defaults to 2.
 * @returns {string} - A string representing the number of bytes in a more readable format (e.g., KB, MB).
 */
const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Returns one of two values based on the given condition.
 * 
 * @param {boolean} condition - The condition to evaluate.
 * @param {any} then - The value to return if the condition is true.
 * @param {any} [or=''] - The value to return if the condition is false. Defaults to an empty string.
 * @returns {any} - The value corresponding to the result of the condition evaluation.
 */
const on = (condition: boolean, then: any, or: any = '') => {
  return condition ? then : or
}

/**
 * Copies a value to the clipboard and optionally displays a success message using a toast notification.
 * 
 * @param {any} value - The value to be copied to the clipboard.
 * @param {string} [message] - An optional message to display if the copy operation is successful.
 */
const copy = (value: any, message?: string) => {
  navigator.clipboard.writeText(`${value}`).then(() => {
    if (message) {
      // toast.success(message);
    }
  }).catch(err => {
    // toast.warning('Failed to copy: ', err);
  });
}

/**
 * Downloads a file from the provided URL by creating an anchor element and triggering a click event.
 * 
 * @param {string} url - The URL of the file to be downloaded.
 * @param {string} [filename] - The optional name of the file. Defaults to the name derived from the URL.
 */
const downloadFile = async (url: string, filename?: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || url.split('/').pop() || 'download';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Formats a date according to the specified format string.
 *
 * @param date - The date to format, either as a string or a Date object.
 * @param format - The format string, e.g., 'Y-m-d', 'd-m-y', 'yyyy-mm-dd'.
 * @returns The formatted date as a string.
 */
const dateFormat = (date: string | Date, format: string): string => {
  let parsedDate: Date;

  if (typeof date === 'string') {
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }

  const pad = (number: number, length: number): string => {
    return number.toString().padStart(length, '0');
  };

  const formatMapping: { [key: string]: string } = {
    'Y': parsedDate.getFullYear().toString(),
    'y': parsedDate.getFullYear().toString().slice(-2),
    'M': pad(parsedDate.getMonth() + 1, 2),
    'm': pad(parsedDate.getMonth() + 1, 2),
    'D': pad(parsedDate.getDate(), 2),
    'd': pad(parsedDate.getDate(), 2),
  };

  let formattedDate = format;
  Object.keys(formatMapping).forEach(key => {
    formattedDate = formattedDate.replace(new RegExp(key, 'g'), formatMapping[key]);
  });

  return formattedDate;
};

const utils = {
  alpha, numeric, alphanumeric, ucwords, ucfirst, currency, cleanMap, randInt, randString, formatBytes, on, copy, downloadFile, dateFormat
}

export default utils


