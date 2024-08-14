import { useAuthStore } from "@/stores/auth";
import { toast } from '../../src/runtime/scripts/toast';

export const useApi = () => {

    /**
     * This code retrieves the base URL from the runtime configuration
     * and ensures that it ends with a trailing slash.
     */

    // Import the `useRuntimeConfig` function to access runtime configuration.
    const config = useRuntimeConfig();

    // Retrieve the API base URL from the runtime configuration.
    let baseUrl: string = config.public.API_BASE_URL as string

    // Check if the `baseUrl` does not already end with a trailing slash.
    if (!baseUrl.endsWith('/')) {
        baseUrl += '/'
    }

    /**
     * Handles HTTP request errors and returns an object with error details.
     * 
     * @param err - The error object representing the failed HTTP request.
     * @returns An object containing error status and message details.
     */

    const errorHandler = (err: any) => {
        let response = err?.response

        let message = response?._data?.message || response?._data?.error || response?._data || err?.message
        let code = err.response?.status

        // get path from url
        let path = err.response?.url

        // console.log('error response: ', response)
        // console.log('error message: ', err?.message)

        if ([401].includes(code)) {
            const auth = useAuthStore()
            auth.isLogged = false

            const cookie = useCookie('token')
            cookie.value = null


        }

        return {
            status: false,
            message
        }
    }

    const useToken = () => {
        const token = useCookie('token')

        if (token.value) {
            return {
                'Authorization': `Bearer ${token.value}`
            }
        }
    }

    const useHeaders = (isFormData: boolean = false) => {
        let headers = <any>{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }

        if (isFormData) delete headers['Content-Type']
        return headers
    }

    const getUrl = (path: string) => path.includes('http') ? path : baseUrl + path

    /**
    * Sends an HTTP GET request to a specified URL with optional query parameters.
    * 
    * @param url - The URL to send the GET request to.
    * @param queryParams - (Optional) An object containing query parameters to include in the request.
    * @returns A Promise that resolves to the response of the GET request.
    */

    const get_ = (url: string, queryParams: Record<string, any> = {}): Promise<any> => {
        return new Promise(async (resolve) => {
            const response = await $fetch(getUrl(url), {
                method: 'GET',
                params: queryParams,
                headers: {
                    'Accept': 'application/json',
                    ...useToken()
                }
            }).catch((err) => errorHandler(err)) as any

            resolve(response)
        })
    }

    /**
     * Sends an HTTP POST request to a specified URL with data in either JSON or FormData format.
     * 
     * @param url - The URL to send the POST request to.
     * @param data - The data to include in the request body, which can be JSON or FormData.
     * @returns A Promise that resolves to the response of the POST request.
     */

    const post_ = async (url: string, data: any) => {
        const response = await $fetch(getUrl(url), {
            method: 'POST',
            headers: {
                ...useHeaders(data instanceof FormData),
                ...useToken()
            },
            body: data instanceof FormData ? data : JSON.stringify(data)
        }).catch((err) => errorHandler(err)) as any

        return response
    }

    /**
     * Sends an HTTP PUT request to a specified URL with data in either JSON or FormData format.
     * 
     * @param url - The URL to send the PUT request to.
     * @param data - The data to include in the request body, which can be JSON or FormData.
     * @returns A Promise that resolves to the response of the PUT request.
     */

    const put_ = async (url: string, data: any) => {
        const response = await $fetch(getUrl(url), {
            method: 'PUT',
            headers: {
                ...useHeaders(data instanceof FormData),
                ...useToken()
            },
            body: data instanceof FormData ? data : JSON.stringify(data)
        }).catch((err) => errorHandler(err)) as any

        return response
    }

    /**
     * Sends an HTTP DELETE request to a specified URL.
     * 
     * @param url - The URL to send the DELETE request to.
     * @returns A Promise that resolves to the response of the DELETE request.
     */

    const delete_ = (url: string, query: any = {}): Promise<any> => {
        return new Promise(async (resolve) => {
            const response = await $fetch(getUrl(url), {
                method: 'DELETE',
                params: query,
                headers: { ...useToken() }
            }).catch((err) => errorHandler(err)) as any

            resolve(response)
        })
    }

    /**
     * Sends a custom HTTP request to a specified URL with the provided method and data.
     * 
     * @param url - The URL to send the custom request to.
     * @param method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE', etc.).
     * @param data - (Optional) The data to include in the request body, which can be JSON or FormData.
     * @returns A Promise that resolves to the response of the custom request.
     */

    const custom_ = (url: string, method: string, data: any = {}): Promise<any> => {
        return new Promise(async (resolve) => {
            let contentType = data instanceof FormData ? '' : 'application/json'
            let headers = {
                'Accept': 'application/json',
                contentType,
                ...useToken()
            }

            const response = await $fetch(getUrl(url), {
                method: method as any,
                headers: headers,
                body: data instanceof FormData ? data : JSON.stringify(data)
            }).catch((err) => errorHandler(err)) as any

            resolve(response)
        })
    }

    return {
        get: get_,
        post: post_,
        put: put_,
        delete: delete_,
        custom: custom_
    }


    // Example of use
    /*
        setup() {
            const api = useApi();
            return { api };
        },

        // in method
        this.api.get('/api/v1/users').then((res) => {})
    */
}

interface Response {
    status: boolean,
    data?: any,
    message: string,
    access_token?: string
}

export const api = {

    // example, usage in store (pinia)
    /* inside actions: {}

        login(data: any): any {
            return api.post('login', data)
            
            // or .then to manage data from the store, remember to return
            return api.post('login', data).then(res => {
                console.log('from store', res)
                return res
            })
        },

    */

    post: (path: string, payload: any) => {
        return new Promise<Response>(async (resolve) => {
            useApi().post(path, payload).then((res: Response) => resolve(res))
        })
    },

    get: (path: string, query: any = {}) => {
        return new Promise<Response>(async (resolve) => {
            useApi().get(path, query).then((res: Response) => resolve(res))
        })
    },

    put: (path: string, payload: any) => {
        return new Promise<Response>(async (resolve) => {
            useApi().put(path, payload).then((res: Response) => resolve(res))
        })
    },

    delete: (path: string) => {
        return new Promise<Response>(async (resolve) => {
            useApi().delete(path).then((res: Response) => resolve(res))
        })
    },

    response: (res: any, okmessage: Boolean = true) => {
        return new Promise<Response>(async (resolve) => {
            resolve(res?.data)

            if (!res.status) {
                toast.error(res.message)
                return res.status
            }

            if (okmessage) {
                toast.success(res.message)
            }

            return res.status
        })
    }
}