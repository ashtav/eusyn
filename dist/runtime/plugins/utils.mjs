import { defineNuxtPlugin } from "#imports";
import { toast } from "../scripts/toast/index.mjs";
const alpha = (text) => {
  return text.replace(/[^a-zA-Z ]/g, "");
};
const alphanumeric = (text) => {
  return text.replace(/[^a-zA-Z0-9. ]/g, "");
};
const numeric = (text) => {
  return Number(text.replace(/[^0-9]/g, ""));
};
const ucwords = (text, normalize = false, strict = false) => {
  const value = normalize ? (text ?? "").toLowerCase() : text ?? "";
  if (strict) {
    return value.replace(/(?:^|\s|\()(\w)/g, function($1) {
      return $1.toUpperCase();
    });
  } else {
    return value.replace(/^(.)|\s+(.)/g, function($1) {
      return $1.toUpperCase();
    });
  }
};
const ucfirst = (text, normalize = false) => {
  const capitalizeFirstActualLetter = (htmlString) => {
    function capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return htmlString.replace(/(>[^<]*?)(\w)/, function(_2, before, char) {
      return before + capitalizeFirst(char);
    });
  };
  const isHTML = (str) => {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i;
    return htmlRegex.test(str);
  };
  const value = normalize ? text.toLowerCase() : text;
  return isHTML(value) ? capitalizeFirstActualLetter(value) : value.charAt(0).toUpperCase() + value.slice(1);
};
const currency = (text, separator = ",") => {
  return text.toString().replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
const cleanMap = (self, key) => {
  if (typeof key === "string") {
    Object.assign(self.$data[key], self.$options.data()[key]);
  } else if (Array.isArray(key)) {
    key.forEach((k) => {
      Object.assign(self.$data[k], self.$options.data()[k]);
    });
  }
};
const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randString = (length = 10, withSpecialChar = false) => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  if (withSpecialChar) {
    characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  }
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0)
    return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
const on = (condition, then, or = "") => {
  return condition ? then : or;
};
const copy = (value, message) => {
  navigator.clipboard.writeText(`${value}`).then(() => {
    if (message) {
      toast.success(message);
    }
  }).catch((err) => {
    toast.warning("Failed to copy: ", err);
  });
};
const downloadFile = async (url, filename) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || url.split("/").pop() || "download";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const dateFormat = (date2, format) => {
  let parsedDate;
  if (typeof date2 === "string") {
    parsedDate = new Date(date2);
  } else {
    parsedDate = date2;
  }
  const pad = (number, length) => {
    return number.toString().padStart(length, "0");
  };
  const getMonthShort = () => parsedDate.toLocaleString("en", { month: "short" });
  const getMonthLong = () => parsedDate.toLocaleString("id", { month: "long" });
  const getDayShort = () => parsedDate.toLocaleString("en", { weekday: "short" });
  const getDayLong = () => parsedDate.toLocaleString("en", { weekday: "long" });
  const formatMapping = {
    "Y": parsedDate.getFullYear().toString(),
    "y": parsedDate.getFullYear().toString().slice(-2),
    "M": pad(parsedDate.getMonth() + 1, 2),
    "m": pad(parsedDate.getMonth() + 1, 2),
    "D": pad(parsedDate.getDate(), 2),
    "d": pad(parsedDate.getDate(), 2),
    "H": pad(parsedDate.getHours(), 2),
    "i": pad(parsedDate.getMinutes(), 2),
    "s": pad(parsedDate.getSeconds(), 2),
    "MMM": getMonthShort(),
    "MMMM": getMonthLong(),
    "DDD": getDayShort(),
    "DDDD": getDayLong()
  };
  let formattedDate = format ?? "Y-m-d H:i:s";
  Object.keys(formatMapping).sort((a, b) => b.length - a.length).forEach((key) => {
    formattedDate = formattedDate.replace(new RegExp(`\\b${key}\\b`, "g"), formatMapping[key]);
  });
  return formattedDate;
};
const manipulate = (data, action) => {
  const result = { ...data };
  if (action.ucwords) {
    action.ucwords.forEach((key) => {
      if (result[key]) {
        result[key] = ucwords(result[key]);
      }
    });
  }
  if (action.numeric) {
    action.numeric.forEach((key) => {
      if (result[key]) {
        result[key] = numeric(result[key].toString());
      }
    });
  }
  if (action.currency) {
    action.currency.forEach((key) => {
      if (result[key]) {
        result[key] = currency(result[key]);
      }
    });
  }
  if (action.lower) {
    action.lower.forEach((key) => {
      if (result[key]) {
        result[key] = result[key].toLowerCase();
      }
    });
  }
  if (action.upper) {
    action.upper.forEach((key) => {
      if (result[key]) {
        result[key] = result[key].toUpperCase();
      }
    });
  }
  if (action.alpha) {
    action.alpha.forEach((key) => {
      if (result[key]) {
        result[key] = alpha(result[key]);
      }
    });
  }
  if (action.alphanumeric) {
    action.alphanumeric.forEach((key) => {
      if (result[key]) {
        result[key] = alphanumeric(result[key]);
      }
    });
  }
  return result;
};
const getInitials = (value) => {
  return value.split(" ").map((word) => word[0]).join("").toUpperCase();
};
const shuffle = (array) => {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const arrDelete = (array, predicate) => {
  const index = array.findIndex(predicate);
  if (index !== -1) {
    array.splice(index, 1);
  }
};
const arrUpdate = (array, predicate, newItem) => {
  const index = array.findIndex(predicate);
  if (index !== -1) {
    array.splice(index, 1, newItem);
  }
};
const chunk = (array, size = 2) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const deepClone = (value) => {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }
  const clonedObject = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      clonedObject[key] = deepClone(value[key]);
    }
  }
  return clonedObject;
};
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(void 0, args), wait);
  };
};
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      func.apply(void 0, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(void 0, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
const firstAndLastDate = (date2, dateOnly) => {
  const d = new Date(date2);
  const firstDate = new Date(d.getFullYear(), d.getMonth(), 1);
  const lastDate = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  return {
    first: !dateOnly ? dateFormat(firstDate, "Y-m-d") : firstDate.getDate(),
    last: !dateOnly ? dateFormat(lastDate, "Y-m-d") : lastDate.getDate()
  };
};
const now = (args) => {
  let now2 = /* @__PURE__ */ new Date();
  if (typeof args === "string") {
    return dateFormat(now2, args);
  }
  if (args?.add) {
    now2.setDate(now2.getDate() + args.add);
  }
  if (args?.subtract) {
    now2.setDate(now2.getDate() - args.subtract);
  }
  return dateFormat(now2, args?.format ?? "Y-m-d");
};
const date = (date2, args) => {
  let d = new Date(date2);
  if (args?.add) {
    d.setDate(d.getDate() + args.add);
  }
  if (args?.subtract) {
    d.setDate(d.getDate() - args.subtract);
  }
  return dateFormat(d, args?.format ?? "Y-m-d");
};
const months = (number = false) => {
  return number ? Array.from({ length: 12 }, (_2, i) => i + 1) : [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
};
const dates = (date2 = /* @__PURE__ */ new Date()) => {
  const d = new Date(date2);
  const first = firstAndLastDate(d, true).first;
  const last = firstAndLastDate(d, true).last;
  return Array.from({ length: last - first + 1 }, (_2, i) => i + first);
};
const formatNumberToK = (input, separator = ",") => {
  const num = typeof input === "string" ? parseFloat(input.replace(new RegExp(`\\${separator}`, "g"), "").trim()) : input;
  if (isNaN(num))
    return "0";
  const absNum = Math.abs(num);
  if (absNum >= 1e3) {
    const thousands = num / 1e3;
    return thousands.toLocaleString(void 0).replace(/,/g, separator) + "K";
  }
  return num.toLocaleString().replace(/,/g, separator);
};
const utils = {
  alpha,
  numeric,
  alphanumeric,
  ucwords,
  ucfirst,
  currency,
  cleanMap,
  randInt,
  randString,
  formatBytes,
  on,
  copy,
  downloadFile,
  dateFormat,
  manipulate,
  getInitials,
  shuffle,
  arrDelete,
  arrUpdate,
  chunk,
  deepClone,
  debounce,
  throttle,
  firstAndLastDate,
  now,
  date,
  months,
  dates,
  formatNumberToK
};
const _ = utils;
export { _, utils };
export default defineNuxtPlugin(() => {
  return {
    provide: {
      utils
    }
  };
});
