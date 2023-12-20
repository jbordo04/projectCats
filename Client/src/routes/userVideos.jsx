import { useEffect, useRef, useState } from "react";
import { Form, useLoaderData, useOutletContext } from "react-router-dom";

export async function loader() {
  const session = JSON.parse(localStorage.getItem(1));
  console.log("sessLoader:", session.email);
  const data = await fetch("/downloadItem/videos/" + session.email);
  const res = await data.json();
  console.log(res);
  return res;
}
export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
}

// export async function Videos() { async no se puede aplicar a componentes funcionales!!
export function Videos() {
  const [videoURL, setVideoURL] = useState("");
  const videoRef = useRef(null);
  console.log("chunk:", videoURL);
  // const session = useOutletContext();
  const dataLoader = useLoaderData();
  console.log("dataLoad:", dataLoader); // {} siempree!! vacio al cargar el loader si no hay nada

  useEffect(() => {
    videoRef.current?.load();
    // videoRef1.current?.play();
  });

  return (
    <div id="cuerpo" className="body-container ">
      <div id="cuerpo-Central" className="body-center-usuario ">
        <div className="video-center">
          {dataLoader.length > 0 ? (
            dataLoader.map((video, index) => {
              console.log(video);
              return (
                <div className="containerVideo">
                  <Form>
                    <div className="boxVideo">
                      <video
                        key={index}
                        controls
                        width={500}
                        height={350}
                        ref={videoRef}
                      >
                        <source src={video.url}></source>
                      </video>
                      <button
                        type="submit"
                        name="datosFoto"
                        value={`${video.id}`}
                        className="boton-eliminar"
                      >
                        X
                      </button>
                    </div>
                  </Form>
                  <h1>{video.titulo}</h1>
                  <p className="text-foto">{video.texto}</p>
                </div>
              );
              // <VideoPlayer data={video} index={index} />;
            })
          ) : (
            <>Aun no hay ningun video!!</>
          )}
          {/* <source
              src={
                "http://localhost:3001/Files/romu@gmail.com/Video/Metodo%20Wim%20Hof%20.mp4"
              }
            ></source> */}
        </div>
      </div>
    </div>
  );
}

export const VideoPlayer = ({ data, index }) => {
  const videoRef1 = useRef(null);
  useEffect(() => {
    videoRef1.current?.load();
    // videoRef1.current?.play();
  });
  console.log("video", data);
  return (
    <div className="containerVideo">
      <Form>
        <div className="boxVideo">
          <video key={index} controls width={500} height={350} ref={videoRef1}>
            <source src={data.url}></source>
          </video>
          <button
            type="submit"
            name="datosFoto"
            value={`${data.id}`}
            className="boton-eliminar"
          >
            X
          </button>
        </div>
      </Form>
      <h1>{data.titulo}</h1>
      <p className="text-foto">{data.texto}</p>
      {/* <VideoPlayer data={video} /> */}
    </div>
  );
};
