require("dotenv").config();
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
// const http = require("http");
const url = require("url");
const { createClient } = require("@libsql/client");
const multer = require("multer");

// console.log("user:", globalUser);

const dataFilePath = path.join(__dirname, "data", "datausers.txt");
// const dataSqlPath = path.join(__dirname, "dataSQL.db");
const emailFilePath = path.join(__dirname, "data", "email&passw.txt");

// const config = { url: `file: ${dataSqlPath}` };
const config = { url: "file:dataSQL.db" };
const db = createClient(config);
// const config = { url: "file:registro copy/email&passw.db" };
const indexFolderPath = path.join(__dirname);
// const userPC = "C:\\Users\\bordo_lapop\\Onedrive";  \\Necesita una doble barra, caracter especial
const userPc = indexFolderPath.split("\\")[2];
console.log("pathGlobal:", indexFolderPath, "laptop:", userPc);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded()); //body-parse!! middleware!!
app.use(express.json()); // body-parser!! middleware for parser JSON body
// app.use("/Files", express.static(indexFolderPath));
// app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/Files", express.static(path.join(__dirname, "Files")));

db.execute(/*sql*/ `create table if not exists dataUsers  (
  userId integer PRIMARY KEY,
  nombre  text NOT NULL,
  apellidos text NOT NULL,
  email text UNIQUE,
  password text NOT NULL,
  nickname text NOT NULL UNIQUE,
  fotoPerfil text not null,
  fecha date
)  `);

db.execute(/*sql*/ `create table if not exists fotosUsers (
  fotosId integer PRIMARY KEY,
  nombre text not null,
  url text not null,
  texto text not null,
  fecha date,
  idPublico text not null,
  idUser int not null,
  constraint fk_userId foreign key (IdUser) references dataUsers(userId)
)`);

db.execute(/*sql*/ `create table if not exists videosUsers (
  id integer PRIMARY KEY,
  nombre text not null,
  url text not null,
  titulo text not null,
  texto text not null,
  fecha date,
  idPublico text not null,
  idUser int not null,
  constraint fk_userId foreign key (IdUser) references dataUsers(userId)
)`);

// db.execute(
//   /*sql*/ ` insert into dataUsers (nombre, apellidos, email, password, nickname, fotoPerfil, fecha) values('Joan', 'Bordonaba', 'joan.bordonaba@gmail.com','asdf', 'bordo','data/perfil_blanco.jpg', current_date )`
// );

// db.execute(/*sql*/ `delete from fotosUsers where texto = 'CaraCarton como Obama'`);
// db.execute(/*sql*/ `truncate table dataUsers`);//no admite clasusula WHERE, mas rapido, resetea los AUTOINCREMENT KEY
// db.execute(/*sql*/ `drop table videoUsers`);
// db.execute(/*sql*/ `select * from fotosUsers`).then((data) =>
//   console.log(data.rows)
// );

app.post("/registro", async (req, res) => {
  const dataBody = req.body;
  console.log("req.body:", dataBody);
  const {
    nombre: n,
    apellidos: p,
    email: e,
    password: pw,
    nickname: nn,
  } = req.body;
  db.execute(
    /*sql*/ `insert into dataUsers ( nombre, apellidos, email, password, nickname, fotoPerfil, fecha)
             
    values ( '${n}','${p}','${e}','${pw}','${nn}','registro/perfil_blanco.jpg',  current_date)`
    // values ( ?,?,?,?,?, 'registro/perfil_blanco.jpg',  current_date)`,
    // [n,p, e, pw, nn]
  )
    //Hay que añadir el path.join(__dirname), sino no encuentra la direccion exacta!!
    .then(() => fs.promises.mkdir(path.join(__dirname, `Files/${e}`)))
    .then(() => fs.promises.mkdir(path.join(__dirname, `Files/${e}/Foto`)))
    .then(() => fs.promises.mkdir(path.join(__dirname, `Files/${e}/Video`)))
    .then(() => {
      res.status(200).send("tdo ok");
    })
    .catch((e) => {
      const value = e.message.split(":").slice(1).join(":").trim();
      const valueErr = value[0].toUpperCase() + value.slice(1);
      console.error("error:", valueErr);
      if (valueErr == "UNIQUE constraint failed: dataUsers.nickname")
        res.status(400).send("Ya existe este nickname");
      else if (valueErr == "UNIQUE constraint failed: dataUsers.email")
        res.status(400).send("Ya existe este email");
      //Si esta activo, salta este error: Cannot set headers after they are sent to the client, que se envia  un res, despues de otro res??
      // else res.status(400).send(valueErr);
    });
});

app.post("/entrada", async (req, res) => {
  const { email, password } = req.body;

  //   const data_json = JSON.parse(data);
  //   const errEmail = data_json.find((user) => userlogin.email == user.email);
  //   const user = data_json.find(
  //     (user) =>
  //       user.email === userlogin.email && user.password === userlogin.password
  //   );
  //   // console.log("db:", data_json);
  //   if (!errEmail) return res.status(400).send("El email no existe!");
  //   else if (!user) return res.status(400).send("Password incorrecto!");
  //   else {
  //     //Con Metodo de objetos, podemos aplicar el metodo filter!!
  //     const filterMethod = Object.fromEntries(
  //       Object.entries(user).filter(([key]) => key != "password")
  //     );
  //     //Sino utilizamos el metodo spread
  //     const { password, ...spreadMethod } = user;
  //     console.log("user:", filterMethod, spreadMethod);
  //     return res.status(200).send(spreadMethod);

  //     // return res.status(200).json(spreadMethod);

  try {
    const respUser = await db.execute(/*sql*/ `
  select nombre, apellidos, email, nickname from dataUsers where email == '${email}' and password == '${password}'
  `);
    const respEmail = await db.execute(
      `select email from dataUsers where email == '${email}'`
    );
    const jsonResp = respUser.rows;
    console.log("resp:", respEmail, typeof respEmail);
    if (respEmail.rows.length == 0)
      return res.status(400).send("No existe este correo!");
    else if (jsonResp.length == 0)
      res.status(400).send("Error en el correo o la contraseña");
    globalUser = email;
    res.status(200).send([jsonResp[0], globalUser]);
  } catch (e) {
    console.log("eer:", e);
  }

  // res.status(404).send("Todo correcto!!");
  // res.send("Hello Login!!");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = file.mimetype.split("/")[0];
    const format = type === "image" ? "Foto" : "Video";
    console.log("multer:", type, "tipo:", format);
    // const format = type[0].toUpperCase() + type.slice(1);
    const user = req.params.userId;
    console.log(req.params.userId);
    // const upFoto = path.join(__dirname, "/Receive");
    // const upFoto = path.join(__dirname, "Files/");
    // const upFoto = path.join(__dirname, `Files/${user}/Foto`);
    const wholePath = path.join(__dirname, `Files/${user}/${format}`);
    cb(null, wholePath);
    // return res.status(200).send("Archivo subidooo!!!");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadFoto = multer({ storage: storage });

app.post(
  "/uploadFoto/:userId",
  uploadFoto.single("fotaco"),
  async (req, res) => {
    const type = req.file.mimetype.split("/")[0]; //'image/video/...
    console.log("file", type);
    const user = req.params.userId;
    const texto = req.body;
    const indexFiles = req.file.path
      .split("\\")
      .findIndex((word) => word == "Files");
    const fileURL = req.file.path.split("\\").slice(indexFiles).join("\\");
    console.log("texto:", texto, "file:", fileURL);

    try {
      const iduser = await db.execute(
        /*sql*/ `select userId from dataUsers where email = '${user}' `
      );
      console.log("id:", iduser.rows[0].userId);
      if (type == "image") {
        const result = await db.execute(/*sql*/ `insert into fotosUsers (
    nombre, url, texto, fecha, idPublico, idUser) values (
    '${req.file.filename}', '${fileURL}', '${req.body.titulo}', current_date, '${req.body.id}', '${iduser.rows[0].userId}'
    )`);
      } else if (type == "video") {
        const result = await db.execute(/*sql*/ `insert into videosUsers (
          nombre, url, titulo, texto, fecha, idPublico, idUser) values (
          '${req.file.filename}', '${fileURL}', '${req.body.titulo}','${req.body.texto}', current_date, '${req.body.id}', '${iduser.rows[0].userId}'
          )`);
      }
      // console.log(result.rows[0]);
      return res.status(200).send(type);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
);
app.get("/videoStream/:videoID", async (req, res) => {
  const id = req.params.videoID;
  const data = await db.execute(
    /*sql*/ `select url  from videosUsers where idPublico = '${id}'`
  );

  const fileurl = data.rows[0].url;
  const wholePath = indexFolderPath + "\\" + fileurl;
  var videoHead = req.headers;
  videoHead.range = "bytes=0-";
  const videoRange = videoHead.range;
  console.log("Headers:", videoHead);
  var positions = videoRange.replace(/bytes=/, "").split("-");
  var start = parseInt(positions[0], 10);

  const Stats = await fs.promises.stat(wholePath).catch((e) => {
    console.log(e);
  });
  var total = Stats.size;
  var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
  var CHUNK_SIZE = end - start + 1;
  res.writeHead(206, {
    "Content-Range": "bytes " + start + "-" + end + "/" + total,
    "Accept-Ranges": "bytes",
    "Content-Length": CHUNK_SIZE,
    "Content-Type": "video/mp4",
  });
  const stream = fs
    .createReadStream(wholePath, { start: start, end: end })
    .on("open", () => {
      stream.pipe(res);
    })
    .on("error", (err) => {
      res.status(400).send(err);
    });
});

app.get("/downloadItem/:type/:emailID", async (req, res) => {
  const id = req.params.emailID;
  const format = req.params.type;
  console.log(id, ", ", format);
  var dataItems = [];

  try {
    if (format == "photos") {
      const data = await db.execute(
        /*sql*/ `select f.nombre, url, texto, f.fecha, idPublico  from fotosUsers f inner join dataUsers d on f.idUser = d.userId where email = '${id}'`
      );
      for (let i = 0; i < data.rows.length; ++i) {
        //El id del laptop no coincide, hay que cambiarlo al id del pc que lo ejecute, siempre que este en la misma ruta que cambia solo 1 nombre
        const fileURL = data.rows[i].url;
        const wholePath = indexFolderPath + "\\" + fileURL;
        console.log("datoss SqL a descagar:", wholePath);
        // var reader = fs.createReadStream(data.rows[i].url, "utf-8");
        const result = await fs.promises.readFile(wholePath);
        console.log("File Foto:", result); // <Buffer ff d7 ...777899 more bytess>
        dataItems[i] = {
          url: result,
          titulo: data.rows[i].texto,
          fecha: data.rows[i].fecha,
          id: data.rows[i].idPublico,
        };
      }
      return res.send(dataItems);
    } else if (format == "videos") {
      const data = await db.execute(
        /*sql*/ `select v.nombre, titulo, texto, v.fecha, url, idPublico  from videosUsers v inner join dataUsers d on v.idUser = d.userId where email = '${id}'`
      );
      // const file = data.rows[0];
      console.log("datos de", data);

      for (let i = 0; i < data.rows.length; ++i) {
        dataItems[i] = {
          // url: "http://localhost:3001/videoStream/" + data.rows[i].idPublico,
          //Pagina estatica,asi no tienes que redigirlo a otro endpoint para que procese el archivo
          url: "http://localhost:3001/" + data.rows[i].url, //static page
          titulo: data.rows[i].titulo,
          texto: data.rows[i].texto,
          fecha: data.rows[i].fecha,
          id: data.rows[i].idPublico,
        };
      }
    }

    // res.set("Content-Type", "image/jpeg").send(dataOBject[0].url);

    console.log(dataItems);
    return res.status(200).send(dataItems);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
});

app.post("/deleteItem/:emailID/:data", async (req, res) => {
  const id = req.params.emailID;
  const data = req.params.data;
  const idPublico = data.split("-")[0];
  const title = data.split("-")[1];
  // const filepath = path.join(__dirname, `Files/${id}/Foto/${title}.jpg`);
  // console.log("path", filepath);
  // return res.end();
  try {
    const seleSQL = await db.execute(
      `select url from fotosUsers where idPublico = '${idPublico}'`
    );
    const pathFile = seleSQL.rows[0].url;
    console.log(pathFile);
    // return res.end();
    const deletSQL = await db.execute(
      /*sql*/ `delete from fotosUsers  where '${idPublico}' = idPublico `
    );
    console.log("delPath:", deletSQL);
    const wholePath = indexFolderPath + "\\" + pathFile;
    const deleteFile = await fs.promises.unlink(wholePath);
    console.log("link", deleteFile);
    res.status(200).send("tdo ok");
  } catch (e) {
    console.log("error aqui", e);
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
