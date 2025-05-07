interface Manipulate {
    ucwords?: Array<string>,
    numeric?: Array<string>,
    currency?: Array<string>,
}

interface Utils {
    /**
     * Removes all non-alphabetical characters from the input text.
     *
     * @param {string} text - The input string to be processed.
     * @returns {string} - A string containing only alphabetical characters and spaces.
     */
    alpha: (text: string) => string,

    /**
     * Removes all non-numeric characters from the input text.
     *
     * @param {string} text - The input string to be processed.
     * @returns {number}
     */
    numeric: (text: string) => number,

    /**
     * Removes all non-alphanumeric characters from the input text, except for periods and spaces.
     *
     * @param {string} text - The input string to be processed.
     * @returns {string} - A string containing only alphanumeric characters, periods, and spaces.
     */
    alphanumeric: (text: string) => string,

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
    ucwords: (text: string, normalize?: boolean, strict?: boolean) => string,

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
    ucfirst: (text: string, normalize?: boolean) => string,

    /**
    * Formats a string as a currency, adding a separator for thousands.
    *
    * @param text - The string to format as a currency.
    * @param separator - The separator to use for thousands. Defaults to ','.
    * @returns The formatted currency string.
    */
    currency: (text: string | number, separator?: string) => string,

    /**
     * Resets specific data properties on a Vue instance to their default values.
     *
     * @param self - The Vue instance (`this` context).
     * @param key - The key or array of keys of the properties to reset.
     */
    cleanMap: (self: any, key: any) => void,

    /**
     * Generates a random integer between the specified minimum and maximum values, inclusive.
     *
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @returns A random integer between min and max, inclusive.
     */
    randInt: (min: number, max: number) => number,

    /**
     * randString is a function to generate random string
     * @param {number} [length=10] - Optional length of the string.
     * @param {boolean} [withSpecialChar=false] - Optional flag to include special characters.
     * @returns {string} The random string.
     * @example
     * const str = randString(10, true); // 'aBcDeFgHiJ'
     */
    randString: (length?: number, withSpecialChar?: boolean) => string,

    /**
     * Converts a number of bytes into a more readable string format with the specified number of decimal places.
     *
     * @param {number} bytes - The number of bytes to be formatted.
     * @param {number} [decimals=2] - The number of decimal places to include in the formatted string. Defaults to 2.
     * @returns {string} - A string representing the number of bytes in a more readable format (e.g., KB, MB).
     */
    formatBytes: (bytes: number, decimals?: number) => string,

    /**
     * Returns one of two values based on the given condition.
     *
     * @param {boolean} condition - The condition to evaluate.
     * @param {any} then - The value to return if the condition is true.
     * @param {any} [or=''] - The value to return if the condition is false. Defaults to an empty string.
     * @returns {any} - The value corresponding to the result of the condition evaluation.
     */
    on: (condition: boolean, then: any, or?: any) => any,

    /**
     * Copies a value to the clipboard and optionally displays a success message using a toast notification.
     *
     * @param {any} value - The value to be copied to the clipboard.
     * @param {string} [message] - An optional message to display if the copy operation is successful.
     */
    copy: (value: any, message?: string) => void,

    /**
     * Downloads a file from the provided URL by creating an anchor element and triggering a click event.
     *
     * @param {string} url - The URL of the file to be downloaded.
     * @param {string} [filename] - The optional name of the file. Defaults to the name derived from the URL.
     */
    downloadFile: (url: string, filename?: string) => Promise<void>,

    /**
     * Formats a date according to the specified format string.
     *
     * @param date - The date to format, either as a string or a Date object.
     * @param format - The format string, e.g., 'Y-m-d', 'd-m-y', 'yyyy-mm-dd', 'DDD, d/MMM/Y H:i:s'.
     * @returns The formatted date as a string.
     */
    dateFormat: (date: string | Date, format?: string) => string,

    /**
     * Transforms the input data according to the provided manipulation actions.
     * 
     * Available actions:
     * - `ucwords`: Capitalizes the first letter of each word in the specified keys.
     * - `numeric`: Removes commas from numbers in the specified keys.
     * - `currency`: Formats numbers with commas in the specified keys.
     *
     * @param {Record<string, any>} data - The input object to manipulate.
     * @param {Manipulate} action - The manipulation actions to perform.
     * @returns {Record<string, any>} - The transformed object.
     *
     * @example
     * const data = {
     *   name: 'john doe',
     *   price: '1,500,000',
     *   quantity: '2,000',
     * };
     *
     * const action = {
     *   ucwords: ['name'],
     *   numeric: ['quantity'],
     *   currency: ['price'],
     * };
     *
     * const result = manipulate(data, action);
     * // result:
     * // {
     * //   name: 'John Doe',
     * //   price: '1,500,000',
     * //   quantity: '2000'
     * // }
     */
    manipulate: (data: Record<any, any>, action: Manipulate) => Record<any, any>

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
    getInitials: (value: string) => string,

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
    shuffle: <T>(array: T[]) => T[],

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
    arrDelete: <T>(array: T[], predicate: (element: T) => boolean) => void,

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
    arrUpdate: <T>(array: T[], predicate: (element: T) => boolean, newItem: T) => void,

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
    chunk: <T>(array: T[], size?: number) => T[][],

    /**
     * Create deep copy from object or array.
     * Useful to prevent mutation on original data structure.
     *
     * @template T - Element type from input
     * @param {T} value - Object or array to clone
     * @returns {T} Deep clone from input
     *
     * @example
     * const original = {
     *   name: 'Alice',
     *   scores: [90, 85, 100],
     *   address: {
     *     city: 'Denpasar',
     *     zip: '80114'
     *   }
     * };
     *
     * const clone = deepClone(original);
     * clone.name = 'Bob';
     * clone.scores[0] = 50;
     *
     * console.log(original.name); // 'Alice'
     * console.log(original.scores[0]); // 90
     */
    deepClone: <T>(value: T) => T,

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
    debounce: (func: Function, wait: number) => (...args: any[]) => void,

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
    throttle: (func: Function, limit: number) => (...args: any[]) => void,
}

export default Utils
export { Manipulate }

