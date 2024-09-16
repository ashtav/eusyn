interface Manipulate {
    ucwords?: Array<string>,
    numeric?: Array<string>,
    currency?: Array<string>,
}

interface Utils {
    alpha: (text: string) => string,
    numeric: (text: string) => number,
    alphanumeric: (text: string) => string,
    ucwords: (text: string, normalize?: boolean, strict?: boolean) => string,
    ucfirst: (text: string, normalize?: boolean) => string,
    currency: (text: string | number, separator?: string) => string,
    cleanMap: (self: any, key: any) => void,
    randInt: (min: number, max: number) => number,
    randString: (length?: number, withSpecialChar?: boolean) => string,
    formatBytes: (bytes: number, decimals?: number) => string,
    on: (condition: boolean, then: any, or?: any) => any,
    copy: (value: any, message?: string) => void,
    downloadFile: (url: string, filename?: string) => Promise<void>,
    dateFormat: (date: string | Date, format?: string) => string,
    manipulate: (data: Record<any, any>, action: Manipulate) => Record<any, any>
    getInitials: (value: string) => string,
    shuffle: <T>(array: T[]) => T[],
    arrDelete: <T>(array: T[], predicate: (element: T) => boolean) => void,
    arrUpdate: <T>(array: T[], predicate: (element: T) => boolean, newItem: T) => void,
}

export default Utils
export { Manipulate }

