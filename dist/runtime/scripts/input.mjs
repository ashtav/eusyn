import { _ } from "../plugins/utils.mjs";
let _event;
const handleKeyPress = (instance, emit, props, event, value, formatters) => {
  _event = event;
  formatters = formatters.map((e) => e.split(":")[0]);
  if (formatters.includes("currency")) {
    if (value.length >= (props.maxLength == 255 ? 15 : props.maxLength)) {
      event.preventDefault();
    }
  }
  if (formatters.includes("numeric") || formatters.includes("currency")) {
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
    }
  }
  if (formatters.includes("decimal")) {
    const key = event.key;
    const dot = ".";
    if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"].includes(key)) {
      return;
    }
    const isDot = key === dot;
    const isNumber = /^[0-9]$/.test(key);
    const currentValue = event.target.value;
    const isDotAtStart = isDot && currentValue.length === 0;
    const hasDot = currentValue.includes(dot);
    const isInvalidDot = isDot && hasDot;
    if (!isNumber && !(isDot && !isDotAtStart && !isInvalidDot)) {
      event.preventDefault();
    }
  } else if (formatters.includes("alphanumeric")) {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122) && event.keyCode != 32 && event.keyCode != 46) {
      event.preventDefault();
    }
  } else if (formatters.includes("alpha")) {
    if ((event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122) && event.keyCode != 32) {
      event.preventDefault();
    }
  }
  if (event.keyCode == 13 && instance?.vnode?.props?.onEnter) {
    emit("enter", value);
  }
};
const formatting = (formatters, emit, value, type, then) => {
  let result = value;
  formatters.forEach((formatter) => {
    const split = formatter.split(":");
    const format = split[0];
    switch (format) {
      case "lower":
        result = result.toLowerCase();
        break;
      case "upper":
        result = result.toUpperCase();
        break;
      case "ucwords":
        result = _.ucwords(result);
        break;
      case "ucfirst":
        result = _.ucfirst(result);
        break;
      case "alpha":
        result = _.alpha(result);
        break;
      case "numeric":
        result = _.numeric(result);
        break;
      case "alphanumeric":
        result = _.alphanumeric(result);
        break;
      case "currency":
        const symbol = split.length == 1 ? "," : split[1];
        result = _.currency(result, symbol);
        if (result.slice(0, 1) == "0" && result.length > 1) {
          result = result.substring(1);
        }
        break;
      case "decimal":
        result = result.replace(/[^0-9.]/g, "");
        const dotIndex = result.indexOf(".");
        if (dotIndex !== -1) {
          result = result.substring(0, dotIndex + 1) + result.substring(dotIndex + 1).replace(/\./g, "");
        }
        if (result.startsWith(".")) {
          result = result.substring(1);
        }
        const parts = result.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts.length > 1) {
          result = parts[0] + "." + parts[1];
        } else {
          result = parts[0];
        }
        break;
      case "hashtag":
        {
          if (result.trim() == "")
            return;
          if (_event?.inputType == "deleteContentBackward" && result.slice(-1) == "#") {
            result = result.substring(0, result.length - 2);
            return;
          }
          if (result.slice(-1) == "#") {
            result = result.substring(0, result.length - 1);
            return;
          }
          const isContainSpace = result.replace(/#/g, "").includes(" ");
          if (isContainSpace) {
            const result_ = result.replace(/[#,]/g, "").split(" ").map((item) => {
              return item.length > 0 ? "#" + item : item;
            }).join(" ");
            result = result_;
          } else {
            result = "#" + result.replace(/#/g, "");
          }
        }
        break;
      default:
        break;
    }
  });
  then(result);
};
export { formatting, handleKeyPress };
