const get = (key) => {
  const data = localStorage.getItem(key) || "";
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};
const set = (key, payload) => {
  const data = payload instanceof Object ? JSON.stringify(payload) : payload;
  localStorage.setItem(key, data);
};
const remove = (key) => {
  localStorage.removeItem(key);
};
const storage = {
  get,
  set,
  remove
};
export default storage;
