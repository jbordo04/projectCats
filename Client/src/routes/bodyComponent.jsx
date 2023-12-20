import { json, useLoaderData } from "react-router-dom";
import Side from "../routes/sideBody.jsx"; // { name_function} cuando es algo específico y no lleva el DEFAULT!!
import Scroll from "./paginacion.jsx";
import { useEffect, useState } from "react";

export function Aside() {}

export const loader = async ({ params }) => {
  const resp = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const url = params.numPage;
  // console.log(url, typeof(parseInt(url + 1)))
  // const res_json = await resp.text();
  const res_json = await resp.json();
  console.log(res_json);
  const jsonToShow = [];
  console.log("wwe", jsonToShow.length, typeof url);
  // res_json.map( (let i = 0 res_json.length != 0){
  // }
  var j = 0;
  var k = 0;
  for (let i = 1; i < res_json.length; i++) {
    if (i % 4 == 0) {
      const item_res = res_json.slice(j, i);
      // console.log(item_res)
      // jsonToShow.push({ k : item_res})
      jsonToShow.push([item_res]);
      j = i;
      k += 1;
      // console.log('as',jsonToShow)
    }
    if (i + 1 == res_json.length) {
      const item_res = res_json.slice(j, i + 1);
      jsonToShow.push([item_res]);
    }
  }
  // jsonToShow.push(res_json.slice(0,3))
  console.log("asd", jsonToShow.length);
  // console.log(jsonToShow[url])
  var finalToShow = [];
  if (url == "all") {
    finalToShow = res_json;
  } else {
    finalToShow = jsonToShow[url][0];
  }
  return { finalToShow, jsonToShow, url };
};

export function Body() {
  const { finalToShow, jsonToShow, url } = useLoaderData();
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch("/api", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({ a: "two" }),
  //   }) //mirara que exista el endpoint!! que tenga method GET, sino te enviara la pag html entera!!
  //     .then((resp) => {
  //       const state = resp.status;
  //       resp.text().then((data) => {
  //         console.log("Msg:", data, "Status:", state);
  //       });
  //     })
  //     .catch((e) => console.error("err:", e));
  // }, []);
  console.log("23", finalToShow);

  return (
    <div className="body-container">
      {/* <h1>Contempla la nueva coleccion de gatos que salen de este mes!</h1> */}
      <Side nPage={url} />
      <div id="cuerpo-central">
        <div className="body-center">
          {finalToShow.length ? (
            finalToShow.map((photo) => (
              <div>
                {console.log("w2", photo.url)}
                <img
                  className="foto-gatito"
                  key={photo.id}
                  src={photo.url}
                  alt="Foto de gatitos!"
                />

                <p> Gatito {photo.id} </p>
              </div>
            ))
          ) : (
            <p>No hay fotos que mostrar aquí</p>
          )}
        </div>
        <Scroll pages={jsonToShow} nPage={url} />
      </div>
    </div>
    // <>Dale papii!!</>
  );
}
