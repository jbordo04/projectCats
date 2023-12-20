import localforage from "localforage";
import { useEffect, useRef, useState, React } from "react";
import {
  Form,
  useNavigate,
  NavLink,
  redirect,
  useLoaderData,
  useOutletContext,
  useActionData,
  Link,
} from "react-router-dom";
import { checkUser, getUsers } from "../funciones";
import { useSession } from "../useSession";
import { fakeApi } from "../fakeApi";
import { fakeCache } from "../fakeCache";

//Resolviendo con CallBack
// localforage
//   .getItem("users")
//   .then((resp) => console.log(resp))
//   .catch((e) => console.log(e)); //Siempre tiene que tener un método para recojer el error y este al final de la cadena de promesas

// // //Resolviendo con Async/Await
// const datos = async () => localforage.getItem("users");
// ``;
// try {
//   console.log(await datos());
// } catch (error) {
//   console.log(error);
// }

//GET, sale la request en la URL. se obtiene4 con el constructor new URL(rquest)
export async function loader({ request }) {}

export async function action({ request }) {
  // const users = await getUsers();
  // const FormData = await request.formData();
  // const checkLogin = Object.fromEntries(FormData);
  // var user = users.find(
  //   (user) =>
  //     user.email === checkLogin.email && user.password === checkLogin.password
  // );
  // console.log("user to login is:", user);
  // if (user != undefined) {
  //   const { id, nombre, email, apellidos, nickname } = user;
  //   const dataUser = { id, nombre, email, apellidos, nickname };
  //   // console.log(dataUser);
  //   return { dataUser };
  // } else {
  //   const dataUser = { email: null };
  //   // user = "Error en el login o la contraseña!";
  //   return dataUser;
  // }

  // const navigate =  useNavigate()
  // const session = useSession();
  const FormData = await request.formData();
  const dataLogin = Object.fromEntries(FormData);
  // console.log("data to check:", dataLogin);
  const user = await checkUser(dataLogin);

  return user;
}

export function Login() {
  // const { user } = useActionData();
  const actionData = useActionData();
  const [textLog, setTextLog] = useState("hola");
  console.log("asd:", actionData, textLog);

  const session = useOutletContext();
  const navigate = useNavigate();
  const [log, setLog] = useState(true);
  const [isLoading, setLoading] = useState(false);
  // const [actionD, setActionD] = useState(null);
  // const { user } = useLoaderData()
  // console.log(error)

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const butToCorreo = useRef(null);
  const butToGit = useRef(null);
  const backBot = useRef(null);
  const backTop = useRef(null);
  const formTo = useRef(null);
  const [show, setShow] = useState(false);
  const errDiv = useRef(null);
  // console.log("dato de action:", actionData);

  const onLogin = async ({ value }) => {
    // e.preventDefault();
    // await action();
    console.log("DATOS PARA LA SESSION:", value);
    // useEffect(() => {
    //   setLoading(true);
    // }, []);
    const SESSION_KEY = 1;

    //NO puede ser este, porque genera un num cada vez, al no coincidir con la siguiente, da error de ususario
    const SESSION_Key = Math.random();

    const sessionData = await fakeApi.login(value);
    // console.log("datos de session:", sessionData);

    //
    session.setData(sessionData);
    fakeCache.setItem(SESSION_KEY, sessionData);

    // session.setData(value);
    // fakeCache.setItem(SESSION_KEY, value);
    // session.setData(sessionData);
    // useEffect(() => {
    //   setLoading(false);
    // }, []);
    navigate("/landing");
  };

  useEffect(() => {
    if (actionData != undefined) {
      const { status, data } = actionData || {};
      // const userData = actionData.dataUser;

      // console.log("daTOS del estado:", status);
      // if (userData == undefined) {
      //   setLog(false);
      // } else {
      //   onLogin({ value: userData });
      // }
      if (status != 200) {
        setTextLog(data);
        setLog(false);
      } else {
        onLogin({ value: data });
      }
    }
  });

  // useEffect(() => {
  //   if (actionData) {
  //     setActionD(actionData);
  //   }
  // }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const resp = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const res_json = await resp.json();
      // console.log('asda')
      const img = res_json[0].url;

      ref1.current.style.display = "none";
      ref2.current.setAttribute("src", img);
      ref2.current.style.display = "block";
    }, 6000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

  let navigi = useNavigate();

  function loginCorreo(e) {
    butToCorreo.current.style.display = "none";
    butToGit.current.style.display = "none";

    backBot.current.style.display = "none";
    backTop.current.style.display = "block";
    formTo.current.style.display = "block";
  }

  // function login() {}

  function mostrarPass() {
    setShow(!show);
  }

  function volverLogin(e) {
    e.target.style.display = "none";
    formTo.current.style.display = "none";
    butToCorreo.current.style.display = "block";
    butToGit.current.style.display = "block";
    backBot.current.style.display = "block";
  }

  return (
    <div className="pageLogin">
      <img
        className="img1Login test opacidad"
        ref={ref1}
        src="https://cdn2.thecatapi.com/images/b4paC3RGM.jpg"
      />

      <img
        className="img2Login test"
        ref={ref2}
        src="https://cdn2.thecatapi.com/images/bcm.jpg"
      />
      <div className="formLogin flex-col">
        <button
          style={{ width: "80px", display: "none" }}
          className="button_back_top"
          onClick={volverLogin}
          ref={backTop}
        >
          Volver
        </button>
        <img
          src="http://www.cosasdegatos.es/wp-content/uploads/2017/03/cabeceraweb2017.png"
          alt="logo de pagina"
          className="formLogin_foto"
        />
        <div>
          <button
            className="button_Login buttonToHide margin_Login"
            onClick={loginCorreo}
            ref={butToCorreo}
          >
            Continuar con el Correo
          </button>

          <div
            id="g_id_onload"
            data-client_id="832763461545-r20n9teivs23rjvl8a7cu6dhv6mvnebr.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:3000/google"
            data-nonce=""
            data-auto_prompt="false"
          ></div>

          <div
            className="g_id_signin margin_login buttonToHide"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-width="300"
            data-logo_alignment="left"
          ></div>

          <button
            className="button_Login buttonToHide margin_login"
            // onClick={login}
            ref={butToGit}
          >
            Continuar con Github
          </button>

          <Form
            id="formIniciarSesion"
            method="post"
            ref={formTo}
            // onSubmit={onLogin}
          >
            {/* <Form id='formIniciarSesion' ref={formTo}> */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              defaultValue="joan.bordonaba@gmail.com"
              placeholder="Correo aquí"
            />

            <label htmlFor="password">Password</label>
            <input
              type={show ? "text" : "password"}
              id="passw"
              name="password"
              defaultValue=""
              placeholder="Password aquí"
            />

            <div>
              <input
                type="checkbox"
                id="checking"
                name="checking"
                placeholder="Mostrar password"
                onChange={mostrarPass}
              />
              <label htmlFor="checking">Mostrar password</label>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="button_entrar"
              // onClick={onLogin}
            >
              {isLoading ? "Entrando" : "Entrar"}
              {/* Entrar */}
            </button>
            <div id="errorAlert" style={{ display: !log ? "block" : "none" }}>
              {!log ? (
                <p>{textLog}</p>
              ) : // <p>Error al logear en el email o la contraseña!!</p>
              null}
            </div>
            <p>
              No tienes cuenta?
              <Link style={{ margin: "0px" }} to="/signup">
                Registrate
              </Link>
            </p>
          </Form>
        </div>

        <Link className="button_back" to="/page/0" ref={backBot}>
          Volver
        </Link>
      </div>
    </div>
  );
}
