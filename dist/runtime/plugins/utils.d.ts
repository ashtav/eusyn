import type Utils from '../types/utils';
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
export declare const getDateRange: (startDate: Date | string, endDateOrDays: Date | string | number) => string[];
declare const utils: Utils;
declare const _: Utils;
export { _, utils };
declare const _default: any;
export default _default;
