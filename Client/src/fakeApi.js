import { db } from "./db";
import { fakeCache } from "./fakeCache";

class FakeApi {
  static REQUEST_TIME = 1000;
  static KEY_CACHE = "cache";
  static DB = db;

  context = {};

  constructor() {
    const context = fakeCache.getItem(FakeApi.KEY_CACHE);
    if (context) {
      this.context = context;
    }
  }
  // No hace falta, ya hacmeos la verificacion desde el localForage
  static userById = (id) => FakeApi.DB.find((user) => user.id === id);

  #asyncRequest = (callback) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const result = callback();
        resolve(result);
      }, FakeApi.REQUEST_TIME);
    });

  getSession() {
    return this.#asyncRequest(() => this.context.session);
  }

  login(values) {
    // console.log(FakeApi.KEY_CACHE, JSON.stringify(values));
    // this.context.session = FakeApi.userById(1);
    this.context.session = values;
    fakeCache.setItem(FakeApi.KEY_CACHE, this.context);
    return this.getSession();
  }

  logout() {
    this.context = {};
    fakeCache.clear();
    return this.#asyncRequest(() => null);
  }
}

export const fakeApi = new FakeApi();
