import { useEffect, useRef, useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { generateId, sendItem } from "../funciones";
// import { Player } from "video-react";
// import { Dropzone, FileMosaic } from "@files-ui/react";

export async function action({ request }) {
  const session = JSON.parse(localStorage.getItem(1));
  const idFoto = await generateId();
  const data = await request.formData();
  const dataObj = Object.fromEntries(data);
  dataObj.idFoto = idFoto;

  const formData = new FormData();
  formData.append("fotaco", dataObj.fotaco);
  formData.append("titulo", dataObj.titulo);
  formData.append("texto", dataObj.texto);
  formData.append("id", dataObj.idFoto);
  console.log("formD:", dataObj, formData);
  const res2 = await fetch(`/uploadFoto/${session.email}`, {
    method: "POST",
    // body: data,
    body: formData,
  });
  const status2 = res2.status;
  const mssg2 = await res2.text();
  console.log("action2 text:", mssg2);
  if (status2 == 200 && mssg2 == "image") return redirect("/photos");
  else if (status2 == 200 && mssg2 == "video") return redirect("/videos");
  else if (status2 !== 200) return { status2, mssg2 };
  // } else if (status !== 200) return { status, mssg };
}

export function Landing() {
  const dataAction = useActionData();
  console.log(dataAction);
  const videRef = useRef(null);
  const srcRef = useRef(null);
  const buttDel = useRef(null);
  const buttText = useRef(null);
  const buttTit = useRef(null);
  const buttFoto = useRef(null);
  const buttURL = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [files, setFiles] = useState([]);
  // console.log("asdf", imgUrl);
  const [format, setFormat] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  function borrarFotos() {
    setImgUrl(null);
    setFormat("");
    buttFoto.current.style.display = "block";
    buttURL.current.style.display = "block";
    buttDel.current.style.display = "none";
    buttTit.current.style.display = "none";
    buttText.current.style.display = "none";
  }

  async function previsualizarInput(e) {
    const file = e.target.files[0];
    const format = file.type;
    console.log("filtered", file, format);

    if (file.type.includes("image")) {
      setFormat("img");
      console.log("aqui img");
      let reader = new FileReader();
      // if (!reader) {
      //   console.log("esta vacios");
      // }

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // console.log("we", reader.result);
        // setImgUrl(imgUrl.concat(reader.result));
        setImgUrl(reader.result);
      };

      buttFoto.current.style.display = "none";
      buttTit.current.style.display = "block";
      buttDel.current.style.display = "block";
      buttURL.current.style.display = "none";
    } else if (file.type.includes("video")) {
      console.log("aqui video", format);
      setFormat("video");
      setImgUrl(URL.createObjectURL(file)); //file ya es un blob
      // let reader = new FileReader();
      // reader.onloadend = () => {
      //   console.log("asdf");
      //   const buffer = reader.result;
      //   console.log("buffer:", buffer);
      //   const blob = new Blob([new Uint8Array(buffer)], {
      //     type: format,
      //   });
      //   // const urlBlob = URL.createObjectURL(blob);
      //   const urlBlob = URL.createObjectURL(blob);
      //   console.log("url", urlBlob);
      //   setImgUrl(urlBlob);
      buttURL.current.style.display = "none";
      buttFoto.current.style.display = "none";
      buttText.current.style.display = "block";
      buttTit.current.style.display = "block";
      buttDel.current.style.display = "block";

      // };
    } else {
      setFormat("otro");
    }
  }
  useEffect(() => {
    videRef.current?.load();
  }, [imgUrl]);

  function añadirFoto() {
    const url = prompt("Añade la foto:");
    setImgUrl(imgUrl.concat(url));
  }

  // const manageSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const res = await fetch("/reciveItem", {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     method: "POST",
  //     body: formData,
  //   });
  //   console.log(res);
  // };

  const updateFiles = (incomingFiles) => {
    console.log("archivo:", files);
    // setFiles(files.concat(incomingFiles));
    setFiles(incomingFiles);
    buttText.current.style.display = "block";
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
    buttText.current.style.display = "none";
    buttFoto.current.style.display = "block";
  };
  function handleVideo() {
    const nextWord = !isPlaying;
    setIsPlaying(nextWord);
    if (nextWord) {
      videRef.current.play();
    } else {
      videRef.current.pause();
    }
  }

  return (
    <div id="Cuerpo-central" className="body-center-usuario">
      {/* <Dropzone
        style={{ width: "400px" }}
        header={true}
        footer={true}
        // maxFiles={2}
        onChange={updateFiles}
        label="Album de fotos por nota"
        value={files}
        // accept="images/*"
        // cleanFiles
        // actionButtons={{ position: "bottom", cleanButton: {} }}
      >
        {files.map((file) => (
          <FileMosaic
            key={file.id}
            {...file}
            onDelete={removeFile}
            info
            preview
          />
        ))}
      </Dropzone> */}

      <Form
        method="post"
        id="maqueta_foto"
        // action="/reciveItem"
        style={{ width: "200px" }}
        encType="multipart/form-data"
        // onSubmit={manageSubmit}
      >
        {/* <!-- siempre es con enctype='multip...', permite leer el archivo con su formato original --> */}
        <input
          type="file"
          name="fotaco"
          id="foto_input"
          accept="image/*, video/*"
          onChange={previsualizarInput}
          ref={buttFoto}
        />
        <div className="TextInput">
          <label style={{ display: "none" }} ref={buttTit}>
            Pon un titulo que resalte o resuma el contenido
            <br />
            <input
              type="text"
              name="titulo"
              placeholder="Titulo"
              id="titulo_input"
              required
            />
          </label>
          <label style={{ display: "none" }} ref={buttText}>
            Describe con los detalles que necesites el contenido que van a ver
            <br />
            <textarea
              name="texto"
              placeholder="Descripcion"
              id="text_input"
              defaultValue=".."
              required
              row={10}
              col={40}
            />
          </label>
        </div>
        <div ref={buttDel} id="boton_borrar" style={{ display: "none" }}>
          <button type="button" onClick={borrarFotos}>
            <img
              src="../public/archive-outline.svg"
              style={{ height: "20px", width: "20px" }}
            />
          </button>

          <button
            type="submit"
            // onClick={guardarFotos}
          >
            <img
              src="../public/cloud-upload-outline.svg"
              style={{ height: "20px", width: "20px" }}
            />
          </button>
        </div>
        {format == "video" && (
          <button onClick={handleVideo}>{isPlaying ? "Pause" : "Play"}</button>
        )}
      </Form>
      <button onClick={añadirFoto} ref={buttURL}>
        Añadir foto desde URL
      </button>

      <div id="previsualizar_foto">
        {format.length != 0 ? (
          format == "img" ? (
            <img
              // key={img.data}
              className="foto-gatito"
              alt="foto para subir"
              src={imgUrl}
            />
          ) : format == "video" ? (
            <video
              controls="controls"
              autoPlay={true}
              width="450"
              height="350"
              ref={videRef}
              // src={imgUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source
                src={imgUrl}
                //  type={format}
              />
              Sorry, your browser doesn't support embedded videos
            </video>
          ) : (
            <p>Solo se admite fotos y Videos</p>
          )
        ) : null}
      </div>
    </div>
  );
}
export function Cuenta() {
  return <></>;
}
export function Perfil() {
  return <></>;
}
export function Contenido() {
  return <></>;
}
