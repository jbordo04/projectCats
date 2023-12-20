import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { createUser, updateUser } from "../funciones";
import { useEffect, useRef, useState } from "react";
import { useSession } from "../useSession";
import { fakeCache } from "../fakeCache";
import { fakeApi } from "../fakeApi";

export async function action({ request }) {
  const FormData = await request.formData();
  const updates = Object.fromEntries(FormData);
  console.log(updates);
  const { nombre, apellido, nickname, email } = updates;
  const { password, ...valuesSpread } = updates;
  const res = await createUser(updates);
  // console.log(user); // {data: 'xxxx', status: 200}
  // const respii = await updateUser(user.id, updates);
  if (res) {
    const values = { nombre, apellido, nickname, email };
    // const session = useSession();
    // useEffect(() => {
    //   session.setData(sessionData);
    //   fakeCache.setItem(SESSION_KEY, sessionData);
    //   return redirect("/landing");
    // });
    // } else {
    return { res, valuesSpread };
  }
}

export function Registro() {
  const dataAction = useActionData();
  const errShow = useRef();
  const [textReg, setTextReg] = useState("null");
  const [log, setLog] = useState(true);
  // const navigation = useNavigation(); //Devuelve los estados
  const navigate = useNavigate();
  // console.log("useNavigation:", navigation, "useNavigate:", navigate);
  const session = useOutletContext();

  console.log(dataAction);

  const onLogin = async ({ values }) => {
    //Si envio datos vacios o no definidos, se guardara en la cache, y esta dara error en todas las demas paginas
    if (!values) return;
    console.log("data to log:", values);
    const SESSION_KEY = 1;
    const sessionData = await fakeApi.login(values);
    session.setData(sessionData);
    fakeCache.setItem(SESSION_KEY, sessionData);
    console.log("Ahora redicreccion!");
    navigate("/landing");
  };

  useEffect(() => {
    if (dataAction != undefined) {
      const { res, valuesSpread } = dataAction || {}; // Si no se pone  || {}, en la primera renderizacion, sera un objeto inexistente y dara error al desestructurarlo
      const { status, data } = res;
      console.log("mm:", status, data, valuesSpread);
      if (status != 200) {
        setTextReg(data);
        setLog(false);
      } else {
        onLogin({ values: valuesSpread });
      }
    }
  });

  return (
    <div id="body_registro">
      {/* <h1 id="titulo-registro" style={{background-color: 'aquamarine', position:relative, width: 100%}}>Bienvenido al Rincón felino</h1> */}

      <p
        style={{
          textAlign: "center",
          backgroundColor: "bisque",
          padding: "20px",
          margin: "0",
        }}
      >
        Esta a punto de acceder al rincón de los felinos, donde solo los más
        curiosos pueden acceder, si has llegado hasta aquí es porque eres un
        amante de estas criaturas 🙀
      </p>

      <Form id="form-registro" method="post">
        <input
          className="input_reg"
          type="text"
          name="nombre"
          defaultValue=""
          placeholder="Nombre aquí"
        />
        <input
          className="input_reg"
          type="text"
          name="apellidos"
          defaultValue=""
          placeholder="Apellidos aquí"
        />
        <input
          className="input_reg"
          type="email"
          name="email"
          defaultValue=""
          placeholder="correo aquí"
          required
        />
        <input
          className="input_reg"
          type="password"
          name="password"
          defaultValue=""
          placeholder="Password aquí"
          required
        />
        <input
          className="input_reg"
          type="text"
          name="nickname"
          defaultValue=""
          placeholder="NickName"
        />
        <button type="submit">Registrar</button>
        {!log && (
          <div id="errorAlert" ref={errShow}>
            <h3>{textReg}</h3>
          </div>
        )}
      </Form>
      <Link
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "blue",
          padding: "5px",
          color: "blanchedalmond",
          borderColor: "azure",
          borderRadius: "5px",
        }}
      >
        Volver
      </Link>
    </div>
  );
}
