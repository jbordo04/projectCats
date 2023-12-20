import localforage from "localforage";
import { idBD } from "./db";
import { useEffect } from "react";

export function generateId() {
  // var code = "";
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // const abcArray = abc.split("");
  const max = abc.length;
  function add(code, i) {
    if (i == 7) return code;
    const num = Math.floor(Math.random() * max); //Floor para redondear, importante!!
    const letter = abc[num];
    console.log("index", num, "let:", letter);
    const newCode = code.concat(letter);
    return add(newCode, ++i);
  }

  let id = add("", 0);
  const copied = idBD.find((word) => word === id);

  if (copied) id = generateId();
  // if (copied) add("", 0); add() no se almacena el valor en ninguna var, antes estaba como return add()
  else {
    idBD.push(id);
  }
  return id;
}

export async function getUsers() {
  // await fakeNetwork(`getContacts:${query}`);
  let users = await localforage.getItem("users");
  if (!users) users = [];
  // if (query) {
  //   users = matchSorter(users, query, { keys: ["first", "last"] });
  // }
  // return users.sort(sortBy("last", "createdAt"));
  console.log("sasdf");
  return users;
}

export async function checkUser(values) {
  await fakeNetwork();
  // console.log(values);
  const payload = values;
  const data = JSON.stringify(payload);
  console.log("to fetch:", payload, data);
  return fetch("/entrada", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
  }).then((resp) => {
    const status = resp.status;
    console.log("status:", status);
    if (status == 200) {
      return resp.json().then((result) => {
        console.log("data", result, "status:", status);
        const data = result[0];
        console.log("globalUSer:", result[1]);
        return { data: data, status };
      });
    } else {
      return resp.text().then((data) => {
        console.log("data", data, "status:", status);
        return { data, status };
      });
    }
  });
}

export async function createUser(updates) {
  await fakeNetwork();
  var result = null;
  const data = updates;
  // console.log("to fetch:", payload, data);
  // let resp = await fetch("/registro", {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   method: "POST",
  //   body: data,
  // });
  // const content = await resp.statusText();
  return fetch("/registro", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then((resp) => {
    const status = resp.status;
    return resp.text().then((data) => {
      console.log(data, status);
      return { data, status };
    });
  });

  // console.log("from:", content);
  // await set(users);
  return result;
}
export async function sendItem(values) {
  await fakeNetwork();
  const data = values;
  const { foto, texto, email } = data;
  console.log(data);
  const res = await fetch("/reciveItem", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: {
      file: data,
      // texto: JSON.stringify(texto),
      // id: JSON.stringify(email),
    },
  });
  const status = res.status;
  const mssg = await res.text();
  return { status, mssg };
}

export async function updateUser(id, updates) {
  await fakeNetwork();
  let users = await localforage.getItem("users");
  console.log(users, "asd");
  let user = users.find((user) => user.id === id);
  // const user = users.find(user => user.id === id)
  if (!user) throw new Error("No user found for", id);
  Object.assign(user, updates);
  await set(users);
  console.log("adios");
  return true;
}

function set(users) {
  console.log("setting");
  return localforage.setItem("users", users);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
