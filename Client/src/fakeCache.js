export const fakeCache = {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
    const item = JSON.parse(localStorage.getItem("cache"));
    // const entries = Object.fromEntries(item);
    // console.log(key, "get from cache:", JSON.parse(item));
    return item;
  },

  setItem(key, value) {
    console.log("setting key: ", key, value);
    localStorage.setItem(key, JSON.stringify(value));
  },

  clear() {
    localStorage.clear();
  },
};
