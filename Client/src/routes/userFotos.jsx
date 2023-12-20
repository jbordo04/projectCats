import { useLoaderData, Form, useActionData } from "react-router-dom";

export async function loader() {
  // const param = window.location.pathname.slice(1);
  const session = JSON.parse(localStorage.getItem(1));
  console.log("sessLoader:", session.email);
  const data = await fetch("downloadItem/photos/" + session.email);
  const dataObj = await data.json();
  console.log(dataObj);
  var ArrItems = [];

  for (let i = 0; i < dataObj.length; ++i) {
    const { url, titulo, fecha, id } = dataObj[i];
    // console.log("url:", url);

    //Si creamo un el Objeto, el 1er item tiene que ser un Array, aunque lo sea, aplicar UNint
    const blob = new Blob([new Uint8Array(url.data)], { type: "image/jpeg" });
    console.log(blob);
    const urlIMG = URL.createObjectURL(blob);
    console.log("url:", urlIMG);
    ArrItems[i] = { urL: urlIMG, txt: titulo, date: fecha, idPublico: id };
  }

  console.log(ArrItems);
  return ArrItems;
}

export async function action({ request }) {
  const userEmail = JSON.parse(localStorage.getItem(1)).email;
  const formData = await request.formData();
  const dataObj = Object.fromEntries(formData);
  console.log("asdf", dataObj, userEmail);
  const resp = await fetch(
    "/deleteItem/" + userEmail + "/" + dataObj.datosFoto,
    {
      method: "POST",
    }
  );
  const text = await resp.text();
  return text;
}

export function Fotos() {
  console.log("hola");
  const dataLoader = useLoaderData();
  const dataAction = useActionData();
  // const url = dataLoader.split(":").slice(1).join(":");
  console.log(dataLoader);

  return (
    <div id="cuerpo" className="body-container">
      <div id="cuerpo-Central" className="body-center-usuario">
        {dataLoader.length > 0 ? (
          dataLoader.map((img, index) => {
            console.log(img);
            // const url = img.url.split("Files")[1].replace(/\\/g, "/");
            // console.log("/../../../Server/Files" + url);
            return (
              <div className="container-all">
                <Form method="post">
                  <div className="container-foto">
                    <img
                      key={index}
                      className="foto-gatito card"
                      src={img.urL}
                      alt="Un dia más"
                      name="IMG"
                    />
                    <button
                      type="submit"
                      name="datosFoto"
                      value={`${img.idPublico}-${img.txt}`}
                      className="boton-eliminar"
                    >
                      x
                    </button>
                  </div>
                  <div className="text-foto">{img.txt}</div>
                </Form>
              </div>
            );
          })
        ) : (
          <>Aun no hay ninguna fotooos subidas!!</>
        )}
      </div>
    </div>
  );
}
