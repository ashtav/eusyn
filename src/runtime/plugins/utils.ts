import { defineNuxtPlugin } from '#imports'
import { toast } from '../scripts/toast/index'
import type Utils from '../types/utils'
import type { Manipulate } from '../types/utils'

/**
 * Removes all non-alphabetical characters from the input text.
 *
 * @param {string} text - The input string to be processed.
 * @returns {string} - A string containing only alphabetical characters and spaces.
 */
const alpha = (text: string): string => {
  return text.replace(/[^a-zA-Z ]/g, '')
}

/**
 * Removes all non-alphanumeric characters from the input text, except for periods and spaces.
 *
 * @param {string} text - The input string to be processed.
 * @returns {string} - A string containing only alphanumeric characters, periods, and spaces.
 */
const alphanumeric = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9. ]/g, '')
}

/**
 * Removes all non-numeric characters from the input text.
 *
 * @param {string} text - The input string to be processed.
 * @returns {number}
 */
const numeric = (text: string): number => {
  return Number(text.replace(/[^0-9]/g, ''))
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
  const value = normalize ? (text ?? '').toLowerCase() : (text ?? '')

  if (strict) {
    return value.replace(/(?:^|\s|\()(\w)/g, function ($1) {
      return $1.toUpperCase()
    })
  } else {
    return value.replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase()
    })
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
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return htmlString.replace(/(>[^<]*?)(\w)/, function (_, before, char) {
      return before + capitalizeFirst(char)
    })
  }

  const isHTML = (str: any) => {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i
    return htmlRegex.test(str)
  }

  const value = normalize ? text.toLowerCase() : text
  return isHTML(value) ? capitalizeFirstActualLetter(value as string) : value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * Formats a string as a currency, adding a separator for thousands.
 *
 * @param text - The string to format as a currency.
 * @param separator - The separator to use for thousands. Defaults to ','.
 * @returns The formatted currency string.
 */
const currency = (text: string | number, separator: string = ','): string => {
  return text.toString().replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

/**
 * Resets specific data properties on a Vue instance to their default values.
 *
 * @param self - The Vue instance (`this` context).
 * @param key - The key or array of keys of the properties to reset.
 */
const cleanMap = (self: any, key: any) => {
  if (typeof key === 'string') {
    Object.assign(self.$data[key], (self.$options as any).data()[key])
  } else if (Array.isArray(key)) {
    key.forEach((k) => {
      Object.assign(self.$data[k], (self.$options as any).data()[k])
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
  return Math.floor(Math.random() * (max - min + 1)) + min
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
  const charactersLength = characters.length
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
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
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
      toast.success(message)
    }
  }).catch(err => {
    toast.warning('Failed to copy: ', err)
  })
}

/**
 * Downloads a file from the provided URL by creating an anchor element and triggering a click event.
 *
 * @param {string} url - The URL of the file to be downloaded.
 * @param {string} [filename] - The optional name of the file. Defaults to the name derived from the URL.
 */
const downloadFile = async (url: string, filename?: string) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || url.split('/').pop() || 'download'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Formats a date according to the specified format string.
 *
 * @param date - The date to format, either as a string or a Date object.
 * @param format - The format string, e.g., 'Y-m-d', 'd-m-y', 'yyyy-mm-dd', 'DDD, d/MMM/Y H:i:s'.
 * @returns The formatted date as a string.
 */
const dateFormat = (date: string | Date, format?: string): string => {
  let parsedDate: Date;

  if (typeof date === 'string') {
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }

  const pad = (number: number, length: number): string => {
    return number.toString().padStart(length, '0');
  }

  // Use toLocaleString to get localized month and day names
  const getMonthShort = (): string => parsedDate.toLocaleString('en', { month: 'short' });
  const getMonthLong = (): string => parsedDate.toLocaleString('id', { month: 'long' });
  const getDayShort = (): string => parsedDate.toLocaleString('en', { weekday: 'short' });
  const getDayLong = (): string => parsedDate.toLocaleString('en', { weekday: 'long' });

  const formatMapping: { [key: string]: string } = {
    'Y': parsedDate.getFullYear().toString(),
    'y': parsedDate.getFullYear().toString().slice(-2),
    'M': pad(parsedDate.getMonth() + 1, 2),
    'm': pad(parsedDate.getMonth() + 1, 2),
    'D': pad(parsedDate.getDate(), 2),
    'd': pad(parsedDate.getDate(), 2),
    'H': pad(parsedDate.getHours(), 2),
    'i': pad(parsedDate.getMinutes(), 2),
    's': pad(parsedDate.getSeconds(), 2),
    'MMM': getMonthShort(),
    'MMMM': getMonthLong(),
    'DDD': getDayShort(),
    'DDDD': getDayLong()
  };

  let formattedDate = format ?? 'Y-m-d H:i:s';

  // Replace in order to avoid conflicts, longer keys first
  Object.keys(formatMapping).sort((a, b) => b.length - a.length).forEach(key => {
    formattedDate = formattedDate.replace(new RegExp(`\\b${key}\\b`, 'g'), formatMapping[key]);
  });


  return formattedDate;
}


/**
 * Transforms the input data according to the provided manipulation actions.
 * - `ucwords`: Capitalizes the first letter of each word in the specified keys.
 * - `numeric`: Removes any commas in the specified keys to convert to plain numbers.
 * - `currency`: Adds commas to numbers in the specified keys for currency formatting.
 * - `lower`: Converts the specified keys to lowercase.
 * - `upper`: Converts the specified keys to uppercase.
 * - `alpha`: Removes all non-alphabetical characters from the specified keys.
 * - `alphanumeric`: Removes all non-alphanumeric characters from the specified keys, except for periods and spaces.
 *
 * @param {Record<string, any>} data - The input data object to manipulate.
 * @param {Manipulate} action - The manipulation actions to perform on the data.
 * @returns {Record<string, any>} - The transformed data object.
 * 
 */
const manipulate = (data: Record<any, any>, action: Manipulate): Record<any, any> => {
  const result: Record<any, any> = { ...data };

  if (action.ucwords) {
    action.ucwords.forEach((key) => {
      if (result[key]) {
        result[key] = ucwords(result[key])
      }
    });
  }

  if (action.numeric) {
    action.numeric.forEach((key) => {
      if (result[key]) {
        result[key] = numeric(result[key].toString())
      }
    });
  }

  if (action.currency) {
    action.currency.forEach((key) => {
      if (result[key]) {
        result[key] = currency(result[key])
      }
    });
  }

  // lower
  if (action.lower) {
    action.lower.forEach((key) => {
      if (result[key]) {
        result[key] = result[key].toLowerCase();
      }
    });
  }

  // upper
  if (action.upper) {
    action.upper.forEach((key) => {
      if (result[key]) {
        result[key] = result[key].toUpperCase();
      }
    });
  }

  // alpha
  if (action.alpha) {
    action.alpha.forEach((key) => {
      if (result[key]) {
        result[key] = alpha(result[key]);
      }
    });
  }

  // alphanumeric
  if (action.alphanumeric) {
    action.alphanumeric.forEach((key) => {
      if (result[key]) {
        result[key] = alphanumeric(result[key]);
      }
    });
  }

  return result;
}

/**
 * Generates initials from a full name.
 *
 * @param {string} value - The full name to generate initials from.
 * @returns {string} The initials derived from the full name.
 *
 * @example
 * ```typescript
 * getInitials("John Doe"); // Returns "JD"
 * ```
 */
const getInitials = (value: string): string => {
  return value.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

/**
 * Randomly shuffles the elements of an array using the Fisher-Yates algorithm.
 *
 * @template T The type of elements in the array.
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} A new array with the elements shuffled.
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffle(numbers); // e.g., [3, 5, 1, 2, 4]
 * ```
 */
const shuffle = <T>(array: T[]): T[] => {
  const result = array.slice(); // Make a copy of the array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]; // Swap elements
  }
  return result;
};

/**
 * Removes the first element from an array that matches the predicate function.
 *
 * @param {T[]} array - The array from which the element will be removed.
 * @param {(element: T) => boolean} predicate - A function to test each element of the array. 
 *        Return `true` to delete the element.
 * 
 * @returns {void} - This function modifies the array in place and does not return a value.
 *
 * @example
 * ```typescript
 * const fruits = [{ id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }];
 * arrDelete(fruits, (fruit) => fruit.id === 1); 
 * // fruits will be [{ id: 2, name: 'Banana' }]
 * ```
 */
const arrDelete = <T>(array: T[], predicate: (element: T) => boolean): void => {
  const index = array.findIndex(predicate);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

/**
 * Updates the first element in an array that matches the predicate function by replacing it with a new item.
 *
 * @param {T[]} array - The array containing the element to be updated.
 * @param {(element: T) => boolean} predicate - A function to test each element of the array. 
 *        Return `true` to update the element.
 * @param {T} newItem - The new item that will replace the matched element.
 * 
 * @returns {void} - This function modifies the array in place and does not return a value.
 *
 * @example
 * ```typescript
 * const fruits = [{ id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }];
 * arrUpdate(fruits, (fruit) => fruit.id === 1, { id: 3, name: 'Mango' });
 * // fruits will be [{ id: 3, name: 'Mango' }, { id: 2, name: 'Banana' }]
 * ```
 */
const arrUpdate = <T>(array: T[], predicate: (element: T) => boolean, newItem: T): void => {
  const index = array.findIndex(predicate);
  if (index !== -1) {
    array.splice(index, 1, newItem);
  }
}

/**
 * Splits an array into smaller arrays (chunks) of a specified size.
 *
 * @template T - The type of elements in the input array.
 * @param {T[]} array - The array to be chunked.
 * @param {number} size - The size of each chunk.
 * @returns {T[][]} An array of chunks, where each chunk is an array of elements.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const chunked = chunk(numbers, 3);
 * console.log(chunked); // Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 */
const chunk = <T>(array: T[], size: number = 2): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * Create deeply copy from object or array
 *
 * @template T - Element type from input
 * @param {T} value - Object or array
 * @returns {T} Deep clone from input
 */
const deepClone = <T>(value: T): T => {
  if (value === null || typeof value !== 'object') {
    return value; // return value if not object
  }

  if (Array.isArray(value)) {
    return value.map(item => deepClone(item)) as unknown as T; // clone array
  }

  const clonedObject = {} as T; // create empty object
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      clonedObject[key] = deepClone(value[key]); // clone object property
    }
  }
  return clonedObject;
};

/**
 * Creates a debounced function that delays invoking the provided function
 * until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} A new debounced function.
 *
 * @example
 * const search = debounce((query: string) => {
 *     console.log('Searching for:', query);
 * }, 300);
 * 
 * // Calling search multiple times rapidly
 * search('apple'); // Will only execute after 300ms pause in calls
 * search('banana');
 * search('cherry'); // Final call after user pauses typing
 */
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per specified period of time.
 *
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The number of milliseconds to throttle.
 * @returns {Function} A new throttled function.
 *
 * @example
 * const logScroll = throttle(() => {
 *     console.log('Scroll event triggered');
 * }, 200);
 * 
 * // Attaching to scroll event
 * window.addEventListener('scroll', logScroll);
 * // This will log the scroll event at most once every 200 milliseconds
 */
const throttle = (func: Function, limit: number) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return (...args: any[]) => {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

// @param {Date} date - The date for which to find the first and last dates of the month.
// @return {Object} An object containing the first and last dates of the month.
// @example
// firstAndLastDate(new Date('2023-10-15')); // { first: 1, last: 31 }
const firstAndLastDate = (date: string | Date, dateOnly: Boolean): { first: Number | string, last: Number | string } => {
  const d = new Date(date);
  const firstDate = new Date(d.getFullYear(), d.getMonth(), 1);
  const lastDate = new Date(d.getFullYear(), d.getMonth() + 1, 0);

  return {
    first: !dateOnly ? dateFormat(firstDate, 'Y-m-d') : firstDate.getDate(),
    last: !dateOnly ? dateFormat(lastDate, 'Y-m-d') : lastDate.getDate()
  }
}

// @param {string} format - The format string for the current date. Defaults to 'Y-m-d'.
const now = (args?: { format?: string, add?: number, subtract?: number } | string) => {
  let now = new Date();

  if (typeof args === 'string') {
    return dateFormat(now, args);
  }

  if (args?.add) {
    now.setDate(now.getDate() + args.add);
  }

  if (args?.subtract) {
    now.setDate(now.getDate() - args.subtract);
  }

  return dateFormat(now, args?.format ?? 'Y-m-d');
}

const date = (date?: string | Date, args?: { add?: number, subtract?: number, format?: string }): string => {
  let d = new Date(date);
  if (args?.add) {
    d.setDate(d.getDate() + args.add);
  }
  if (args?.subtract) {
    d.setDate(d.getDate() - args.subtract);
  }
  return dateFormat(d, args?.format ?? 'Y-m-d');
}

/**
 * Returns an array of month names or numbers.
 *
 * @param {boolean} [number=false] - If true, returns an array of month numbers (1-12). If false, returns an array of month names.
 * @returns {string[] | number[]} An array of month names or numbers.
 *
 * @example
 * months(); // ['January', 'February', ..., 'December']
 * months(true); // [1, 2, ..., 12]
 */
const months = (number: boolean = false): Array<string | number> => {
  return number ? Array.from({ length: 12 }, (_, i) => i + 1) : [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
}

/**
 * Returns an array of dates for the current month, starting from the first to the last date.
 *
 * @param {string | Date} [date=new Date()] - The date to determine the month for. Defaults to the current date.
 * @returns {number[]} An array of numbers representing the dates in the month.
 *
 * @example
 * dates(); // [1, 2, ..., 31] for the current month
 * dates('2023-10-15'); // [1, 2, ..., 31] for October 2023
 */
const dates = (date: string | Date = new Date()): Array<number> => {
  const d = new Date(date);
  const first = firstAndLastDate(d, true).first as number;
  const last = firstAndLastDate(d, true).last as number;

  return Array.from({ length: last - first + 1 }, (_, i) => i + first);
}

/**
 * Formats a number or string to a string representation in thousands (K).
 * If the input is less than 1000, it returns the number formatted with commas.
 * If the input is 1000 or more, it divides by 1000 and appends 'K'.
 *
 * @param {string | number} input - The input value to format.
 * @param {string} [separator=','] - The separator for thousands. Defaults to ','.
 * @returns {string} The formatted string.
 */
const formatNumberToK = (input: string | number, separator: string = ','): string => {
  const num = typeof input === "string"
    ? parseFloat(input.replace(new RegExp(`\\${separator}`, "g"), "").trim())
    : input;

  if (isNaN(num)) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1e3) {
    const thousands = num / 1e3;
    return thousands.toLocaleString(undefined).replace(/,/g, separator) + "K";
  }

  return num.toLocaleString().replace(/,/g, separator);
};

/**
 * Calculates the number of full days between two dates.
 * If the second date is null or not provided, it defaults to the current date.
 * @param {Date | string} date1 - The start date as a Date object or a string in 'YYYY-MM-DD' format.
 * @param {Date | string | null} [date2] - The end date as a Date object or a string in 'YYYY-MM-DD' format. Defaults to now if not provided.
 * @returns {number} The number of full days between the two dates.
 * @example
 * daysBetween('2025-08-01'); // difference from 2025-08-01 to today
 * daysBetween(new Date('2025-08-01'), '2025-08-11'); // 10
 */
const daysBetween = (
  date1: Date | string,
  date2?: Date | string | null
): number => {
  const start = typeof date1 === 'string' ? new Date(date1) : new Date(date1)
  const end = date2
    ? typeof date2 === 'string'
      ? new Date(date2)
      : new Date(date2)
    : new Date() // default now

  // reset waktu supaya cuma hitung hari penuh
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Generates an array of date strings between two dates (inclusive).
 * The second parameter can be:
 *   - a Date or string 'YYYY-MM-DD' representing the end date, or
 *   - a number representing the number of days to add to the start date.
 * @param {Date | string} startDate - The start date.
 * @param {Date | string | number} endDateOrDays - The end date or number of days from the start date.
 * @returns {string[]} An array of date strings in 'YYYY-MM-DD' format.
 * @example
 * // Using end date
 * getDateRange('2025-08-01', '2025-08-05');
 * // → ['2025-08-01', '2025-08-02', '2025-08-03', '2025-08-04', '2025-08-05']
 *
 * // Using number of days
 * getDateRange('2025-08-01', 5);
 * // → ['2025-08-01', '2025-08-02', '2025-08-03', '2025-08-04', '2025-08-05']
 */
export const getDateRange = (
  startDate: Date | string,
  endDateOrDays: Date | string | number
): string[] => {
  function formatDateLocal(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const start = typeof startDate === 'string' ? new Date(startDate) : new Date(startDate)

  let end: Date
  if (typeof endDateOrDays === 'number') {
    end = new Date(start)
    end.setDate(end.getDate() + (endDateOrDays - 1)) // -1 karena start sudah dihitung
  } else {
    end = typeof endDateOrDays === 'string' ? new Date(endDateOrDays) : new Date(endDateOrDays)
  }

  // pastikan waktu direset
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const range: string[] = []
  let current = new Date(start)

  while (current <= end) {
    range.push(formatDateLocal(current))
    current.setDate(current.getDate() + 1)
  }

  return range
}



const utils: Utils = {
  alpha, numeric, alphanumeric, ucwords, ucfirst, currency, cleanMap, randInt, randString, formatBytes,
  on, copy, downloadFile, dateFormat, manipulate, getInitials, shuffle, arrDelete, arrUpdate, chunk, deepClone,
  debounce, throttle, firstAndLastDate, now, date, months, dates, formatNumberToK, daysBetween, getDateRange
}

const _ = utils
export { _, utils }

export default defineNuxtPlugin(() => {
  return {
    provide: {
      utils: utils
    }
  }
})