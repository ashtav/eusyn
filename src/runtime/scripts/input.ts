import { _ } from '../plugins/utils';

let _event: any

const handleKeyPress = (instance: any, emit: any, props: any, event: any, value: any, formatters: Array<string>) => {
    _event = event

    // if formatters is currency, set default max length to 15
    if (formatters.includes("currency")) {
        if (value.length >= (props.maxLength == 255 ? 15 : props.maxLength)) {
            event.preventDefault();
        }
    }

    // if formatters is numeric or currency, only allow number input
    if (formatters.includes("numeric") || formatters.includes("currency")) {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.preventDefault();
        }
    }

    // if contains alphanumeric, then only allow alphanumeric input, space and dot
    else if (formatters.includes("alphanumeric")) {
        if (
            (event.keyCode < 48 || event.keyCode > 57) &&
            (event.keyCode < 65 || event.keyCode > 90) &&
            (event.keyCode < 97 || event.keyCode > 122) &&
            event.keyCode != 32 &&
            event.keyCode != 46
        ) {
            event.preventDefault();
        }
    }

    // if contains alpha, then only allow alphabet input
    else if (formatters.includes("alpha")) {
        if (
            (event.keyCode < 65 || event.keyCode > 90) &&
            (event.keyCode < 97 || event.keyCode > 122) &&
            event.keyCode != 32
        ) {
            event.preventDefault();
        }
    }

    // enter
    if (event.keyCode == 13 && instance?.vnode?.props?.onEnter) {
        emit("enter", value);
    }
}

const formatting = (formatters: Array<string>, emit: any, value: string, type: string, then: any) => {

    formatters.forEach((formatter) => {
        const cursorPosition = _event ? _event.target.selectionStart : 0;

        switch (formatter) {
            case "ucwords":
                then(_.ucwords(value))
                break;

            case "ucfirst":
                then(_.ucfirst(value))
                break;

            case "lower":
                then(value.toLowerCase())
                break;

            case "upper":
                then(value.toUpperCase())
                break;

            case "numeric":
                then(value.replace(/[^0-9]/g, ""))

                break;

            case "currency":
                then(_.currency(value))

                // if there is 0 in first, then remove it
                if (value.slice(0, 1) == "0" && value.length > 1) {
                    then(value.substring(1))
                }

                break;

            case "decimal":
                // Allow only numbers and commas
                then(value
                    .toString().replace(/[^0-9,]/g, ""));

                // Ensure comma is not at the beginning
                if (value.startsWith(",")) {
                    then(value.substring(1));
                }

                // Format the decimal value
                let parts = value.split(",");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                if (parts.length > 1) {
                    then(parts[0] + "," + parts[1]);
                } else {
                    then(parts[0]);
                }

                break;

            case "alphanumeric":
                then(value.replace(/[^a-zA-Z0-9. ]/g, ""))
                break;

            case "alpha":
                then(value.replace(/[^a-zA-Z ]/g, ""))
                break;

            case "hashtag":
                {
                    if (value.trim() == "") return;

                    // if user press backspace and the last character is # then remove it
                    if (
                        _event?.inputType == "deleteContentBackward" &&
                        value.slice(-1) == "#"
                    ) {
                        then(value.substring(0, value.length - 2))
                        return;
                    }

                    // prevent uer to input #
                    if (value.slice(-1) == "#") {
                        then(value.substring(0, value.length - 1))
                        return;
                    }

                    value = value.replace(/,/g, "");

                    // if input contains space
                    if (value.replace(/#/g, "").includes(" ")) {
                        let result = value
                            .replace(/#/g, "")
                            .split(" ")
                            .map((item) => {
                                return "#" + item;
                            })
                            .join(" ");

                        then(result)
                    } else {
                        then("#" + value.replace(/#/g, ""))
                    }
                }

                break;
        }


        setTimeout(() => {
            if (_event && !['hashtag', 'currency'].includes(formatter) && !['date'].includes(type)) _event.target?.setSelectionRange(cursorPosition, cursorPosition);
            emit("update:modelValue", value);
        }, 0);
    });
};

export { formatting, handleKeyPress };

