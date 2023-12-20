import { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import { fakeApi } from "../fakeApi";
import { fakeCache } from "../fakeCache";

export const Navigation = ({ navigate, session, show }) => {
  const showParam1 = useRef(null);
  const showParam2 = useRef(null);
  const butToShop = useRef(null);
  const [valueParam, setValueParam] = useState(false);
  const dataSession = session.data;
  console.log("session:", dataSession);
  const [isLoading, setLoading] = useState(false);
  const params = window.location.pathname;

  // if (
  //   params == "/landing" ||
  //   params == "/account" ||
  //   params == "/settings" ||
  //   params == "/photos"
  // ) {
  //   showParam1.current.style.display = "block";
  //   showParam2.current.style.display = "none";
  // } else {
  //   showParam1.current.style.display = "none";
  //   showParam2.current.style.display = "block";
  // }

  useEffect(() => {
    if (
      params == "/landing" ||
      params == "/account" ||
      params == "/settings" ||
      params == "/photos" ||
      params == "/videos"
    ) {
      setValueParam(true);
    } else {
      setValueParam(false);
    }
  });

  // console.log(params);

  const onLogout = async () => {
    setLoading(true);
    fakeCache.clear();
    await fakeApi.logout();
    session.setData(null);
    setLoading(false);
    navigate("/");
  };

  function shopButton() {
    butToShop.current.classList.toogle("visible");
    // style.display = "block"));
  }
  console.log(valueParam);
  return (
    <nav className="navegacion" style={{ display: show }}>
      {session.data ? (
        <div style={{ display: "flex", direction: "row" }}>
          <Link to="/landing">
            <img
              src="../public/perfil_blanco.jpg"
              id="navegacion_foto"
              alt="Foto de perfil"
            />
          </Link>

          <Link className="navegacion_foto_enlace" to="/landing">
            {dataSession ? (
              <p>{dataSession.nombre + " " + dataSession.apellidos}</p>
            ) : null}
          </Link>
        </div>
      ) : null}

      {valueParam ? ( //No funcional al 100%, solo cuando cargamos la pagina entera, al canviar de rutas por Link, no se carga la pagina
        <ol style={{ display: "flex" }} ref={showParam1}>
          <li>
            <Link
              style={{ margin: "0px" }}
              to="/photos"
              className="enlace-cabecera"
            >
              Mis fotos
            </Link>
          </li>
          <li>
            <Link
              style={{ margin: "0px" }}
              to="/videos"
              className="enlace-cabecera"
            >
              Mis Videos
            </Link>
          </li>
          <li>
            <Link
              style={{ margin: "0px" }}
              to="/about"
              className="enlace-cabecera"
            >
              About
            </Link>
          </li>
        </ol>
      ) : (
        <ol style={{ display: "flex" }} ref={showParam2}>
          <li className="enlace-cabecera">Raza</li>
          <li className="enlace-cabecera">Historia</li>
          <li className="enlace-cabecera">FAQs</li>
        </ol>
      )}
      <Form action="/search" method="GET">
        <input type="text" name="q" placeholder="Buscar: palabra" />
        <input type="submit" value="Send" />
      </Form>
      {session.data ? (
        <div className="dropdown">
          <button className="dropbtn" href="#">
            Usuario
          </button>
          <div className="dropdown-content">
            <Link className="dropdown_link" to="/landing">
              Perfil
            </Link>
            <Link className="dropdown_link border-between" to="/account">
              Cuenta
            </Link>
            <Link className="dropdown_link border-between" to="/settings">
              Configuración
            </Link>
            <form action="/cerrar_sesion" id="myform" method="POST">
              <Link className="dropdown_link" onClick={onLogout}>
                Cerrar Session
              </Link>
            </form>
          </div>
        </div>
      ) : (
        <>
          <button className="boton_cabecera">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button
            className="boton_cabecera"
            // disabled={isLoading}
            // onClick={onLogin}
          >
            <Link to="/login">Login</Link>
            {/* {isLoading ? "loading..." : "Login"} */}
          </button>
        </>
      )}

      <div className="shopDrop" onClick={shopButton}>
        <div className="shopDrop_boxfoto">
          <img
            src="/shop-cart-svgrepo-com.svg"
            alt="foto_shopping"
            className="shopDrop_boxfoto_foto"
          />
          <span className="shopDrop_boxfoto_span"></span>
        </div>
        <div className="shopDrop_list" ref={butToShop}>
          <ol className="shopDrop_list_ol">
            <p>El carrito está vacío</p>
          </ol>
          <div className="shopDrop_list_payment">
            Total <span className="shopDrop_price"></span>€
            <a href="/payment" className="shopDrop_list_cart">
              Proceder a pagar
            </a>
          </div>
        </div>
      </div>

      <button className="boton_modo"></button>
    </nav>
  );
};
