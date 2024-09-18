import { _ } from '../plugins/utils'

let _event: any

const handleKeyPress = (instance: any, emit: any, props: any, event: any, value: any, formatters: Array<string>) => {
    _event = event
    formatters = formatters.map((e: string) => e.split(':')[0])

    // if formatters is currency, set default max length to 15
    if (formatters.includes('currency')) {
        if (value.length >= (props.maxLength == 255 ? 15 : props.maxLength)) {
            event.preventDefault()
        }
    }

    // if formatters is numeric or currency, only allow number input
    if (formatters.includes('numeric') || formatters.includes('currency')) {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.preventDefault()
        }
    }

    // if formatters is decimal, only allow number and dot
    if (formatters.includes('decimal')) {
        const key = event.key
        const dot = '.'

        // Allow backspace, delete, arrow keys, tab, and enter
        if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(key)) {
            return // Allow these keys
        }

        // Allow only digits and a single dot
        const isDot = key === dot
        const isNumber = /^[0-9]$/.test(key)

        // Get the current value of the input
        const currentValue = event.target.value

        // Prevent the dot if it's at the beginning or if multiple dots are present
        const isDotAtStart = isDot && currentValue.length === 0
        const hasDot = currentValue.includes(dot)
        const isInvalidDot = isDot && hasDot

        // Allow numeric input or a dot if it's not at the start and not multiple
        if (!isNumber && !(isDot && !isDotAtStart && !isInvalidDot)) {
            event.preventDefault()
        }
    }

    // if contains alphanumeric, then only allow alphanumeric input, space and dot
    else if (formatters.includes('alphanumeric')) {
        if (
            (event.keyCode < 48 || event.keyCode > 57) &&
            (event.keyCode < 65 || event.keyCode > 90) &&
            (event.keyCode < 97 || event.keyCode > 122) &&
            event.keyCode != 32 &&
            event.keyCode != 46
        ) {
            event.preventDefault()
        }
    }

    // if contains alpha, then only allow alphabet input
    else if (formatters.includes('alpha')) {
        if (
            (event.keyCode < 65 || event.keyCode > 90) &&
            (event.keyCode < 97 || event.keyCode > 122) &&
            event.keyCode != 32
        ) {
            event.preventDefault()
        }
    }

    // enter
    if (event.keyCode == 13 && instance?.vnode?.props?.onEnter) {
        emit('enter', value)
    }
}

const formatting = (formatters: Array<string>, emit: any, value: string, type: string, then: any) => {
    let result = value

    formatters.forEach((formatter: string) => {
        // const cursorPosition = _event ? _event.target.selectionStart : 0

        // index 0 = format, index 1 = value or config
        // for example formatters="currency:." -> split thousand by dot (.)
        const split = formatter.split(':')
        const format = split[0]

        switch (format) {
            case 'lower':
                result = result.toLowerCase()
                break

            case 'upper':
                result = result.toUpperCase()
                break

            case 'ucwords':
                // console.log(`${format} executed...`, result)
                result = _.ucwords(result)
                break

            case 'ucfirst':
                result = _.ucfirst(result)
                break

            case 'alpha':
                result = _.alpha(result)
                break

            case 'numeric':
                result = _.numeric(result).toString()
                break

            case 'alphanumeric':
                result = _.alphanumeric(result)
                break

            case 'currency':
                const symbol = split.length == 1 ? ',' : split[1]
                result = _.currency(result, symbol)

                // if there is 0 in first, then remove it
                if (result.slice(0, 1) == '0' && result.length > 1) {
                    result = result.substring(1)
                }

                break


            case 'decimal':
                // Allow only numbers and dots
                result = result.replace(/[^0-9.]/g, '')

                // Ensure only one dot is allowed
                const dotIndex = result.indexOf('.')
                if (dotIndex !== -1) {
                    result = result.substring(0, dotIndex + 1) + result.substring(dotIndex + 1).replace(/\./g, '')
                }

                // Ensure dot is not at the beginning
                if (result.startsWith('.')) {
                    result = result.substring(1)
                }

                // Format the decimal value
                const parts = result.split('.')
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                if (parts.length > 1) {
                    result = parts[0] + '.' + parts[1]
                } else {
                    result = parts[0]
                }

                break

            case 'hashtag':
                {
                    if (result.trim() == '') return

                    // if user press backspace and the last character is # then remove it
                    if (_event?.inputType == 'deleteContentBackward' &&
                        result.slice(-1) == '#'
                    ) {
                        result = result.substring(0, result.length - 2)
                        return
                    }

                    // prevent user to input #
                    if (result.slice(-1) == '#') {
                        result = result.substring(0, result.length - 1)
                        return
                    }

                    // if input contains space
                    const isContainSpace = result.replace(/#/g, '').includes(' ')

                    if (isContainSpace) {
                        const result_ = result
                            .replace(/[#,]/g, '') // Remove existing hashtags
                            .split(' ') // Split by spaces
                            .map((item) => {
                                return item.length > 0 ? '#' + item : item // Add hashtag only if the item is not an empty string
                            })
                            .join(' ') // Join the words back with spaces

                        result = result_
                    } else {
                        result = '#' + result.replace(/#/g, '')
                    }

                }

                break

            default:
                break
        }

        // setTimeout(() => {
        //     if (_event && !['hashtag', 'currency'].includes(formatter) && !['date'].includes(type)) _event.target?.setSelectionRange(cursorPosition, cursorPosition);
        //     emit("update:modelValue", result);
        // }, 0);
    })

    then(result)
}

const handleMask = () => {

}

export { formatting, handleKeyPress, handleMask }

