import { defineNuxtPlugin } from "#imports";
import { toast } from "../scripts/toast/index.mjs";
const alpha = (text) => {
  return text.replace(/[^a-zA-Z ]/g, "");
};
const alphanumeric = (text) => {
  return text.replace(/[^a-zA-Z0-9. ]/g, "");
};
const numeric = (text) => {
  return text.replace(/[^0-9]/g, "");
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
const dateFormat = (date, format) => {
  let parsedDate;
  if (typeof date === "string") {
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }
  const pad = (number, length) => {
    return number.toString().padStart(length, "0");
  };
  const formatMapping = {
    "Y": parsedDate.getFullYear().toString(),
    "y": parsedDate.getFullYear().toString().slice(-2),
    "M": pad(parsedDate.getMonth() + 1, 2),
    "m": pad(parsedDate.getMonth() + 1, 2),
    "D": pad(parsedDate.getDate(), 2),
    "d": pad(parsedDate.getDate(), 2)
  };
  let formattedDate = format;
  Object.keys(formatMapping).forEach((key) => {
    formattedDate = formattedDate.replace(new RegExp(key, "g"), formatMapping[key]);
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
        result[key] = numeric(result[key]);
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
  return result;
};
const getInitials = (value) => {
  return value.split(" ").map((word) => word[0]).join("").toUpperCase();
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
  getInitials
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
