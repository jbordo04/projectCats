import { Form, Link } from "react-router-dom";

export function Nav({ log }) {
  console.log(log);
  if (log === true) {
    return (
      <nav className="navegacion">
        <div style="display:flex; direction: row ">
          <a href="/landing">
            <img
              src={"${cookies.cok_foto ? cookies.cok_foto : " / " + result}"}
              id="navegacion_foto"
              alt="Foto de perfil"
            />
          </a>

          <a className="navegacion_foto_enlace" href="/landing">
            <p>
              ${cookies.cok_nombre} ${cookies.cok_apellidos}{" "}
            </p>
          </a>
        </div>

        {/* {
          console.log(cookies)
          const foto_src = document.getElementById('navegacion_foto')
          if(cookies.cok_foto){
            foto_src.src = "${cookies.cok_foto}"
          } else {
            foto_src.setAttribute = ('src', '/${result}')
          }
        } */}

        <ol>
          <li className="enlace-cabecera">Raza</li>
          <li className="enlace-cabecera">Historia</li>
          <li className="enlace-cabecera">FAQs</li>
        </ol>

        <form action="/search" method="GET">
          <input type="text" name="q" placeholder="Buscar: palabra" />
          <input type="submit" value="Send" />
        </form>

        <div className="dropdown">
          <button className="dropbtn" href="#">
            Usuario
          </button>
          <div className="dropdown-content">
            <a className="dropdown_link" href="/landing">
              Perfil
            </a>
            <a className="dropdown_link border-between" href="/cuenta">
              Cuenta
            </a>
            <a className="dropdown_link border-between" href="/setting">
              Configuracion
            </a>

            <form action="/cerrar_sesion" id="myform" method="POST">
              <a
                className="dropdown_link"
                href="#"
                onClick='document.getElementById("myform").submit()'
              >
                {" "}
                Cerrar Sesion
              </a>
            </form>
          </div>
        </div>
        <div className="shopDrop">
          <div className="shopDrop_boxfoto">
            <img
              src="/shop-cart-svgrepo-com.svg"
              alt="foto_shopping"
              className="shopDrop_boxfoto_foto"
            />
            <span className="shopDrop_boxfoto_span"></span>
          </div>
          <div className="shopDrop_list">
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
  } else {
    return (
      <nav className="navegacion">
        <ol>
          <li className="enlace-cabecera">Origen</li>
          <li className="enlace-cabecera">Historia</li>
          <li className="enlace-cabecera">Color</li>
        </ol>
        <form action="/search" method="GET">
          <input type="text" name="q" placeholder="Buscar: palabra" />
          <input type="submit" value="Send" />
        </form>

        <div>
          <button className="boton_cabecera">
            <Link to="/login">Logearte!</Link>
          </button>
          <button className="boton_cabecera">
            <Link to="/registro">Registrarse</Link>
          </button>
        </div>
        <div className="shopDrop">
          <div className="shopDrop_boxfoto" onClick="show()">
            <img
              n
              src="/shop-cart-svgrepo-com.svg"
              alt="foto_shopping"
              className="shopDrop_boxfoto_foto"
            />
            <span className="shopDrop_boxfoto_span"></span>
          </div>
          <div className="shopDrop_list">
            <ol className="shopDrop_list_ol">
              <p>El carrito está vacío</p>
            </ol>
            <div className="shopDrop_list_payment">
              <p>
                Total <span className="shopDrop_price"></span>€
              </p>
              <button className="shopDrop_list_cart">Proceder a pagar</button>
              {/* {
                const button = document.querySelector('.shopDrop_list_cart')
                button.addEventListener('click', async ()=>{
                  try{
                    const allFotos = window.paginas
                    const total_list = document.querySelectorAll('.shopDrop_list_item')
                    const id_fotos = []
                    //const id_foto = total_list.querySelector('.shopDrop_list_item span').textContent
                    total_list.forEach( item => {
                      const id_item = item.querySelector('.shopDrop_list_item span').textContent
                      //console.log(typeof(id_foto), typeof(id_item))
                      id_fotos.push(id_item)                
                    })

                    console.log(allFotos,'sdf',total_list, id_fotos)
                    const res = await fetch('/create-checkout-session', { 
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method : 'POST', 
                      body : JSON.stringify({cart: id_fotos, album: allFotos})
                    })
                    const data =  await res.json()
                    //console.log(window.location.href)
                    const new_url = data.ses.url
                    console.log('asdfas',new_url)
                    console.log('asdf',data.ses)
        
                    //window.location.href = 'elpais.com'
                    window.location.href = new_url
                  } catch (e){
                    console.log('Error aqui', e.message)
                  }
                })
              } */}
            </div>
          </div>
        </div>
        <button className="boton_modo boton_cabecera"></button>
      </nav>
    );
  }
}

export function Footer() {
  return (
    <footer id="footer">
      <div className="footer_logo">
        <Link to="/page/0">
          <img
            src="http://www.cosasdegatos.es/wp-content/uploads/2017/03/cabeceraweb2017.png"
            alt="logo de pagina"
            width="400"
            height="100"
          />
        </Link>
        <select className="footer_logo_lenguage">
          <option>Español</option>
          <option>English</option>
        </select>
        <p>
          El mundo de los gatos es nuestra afición, el miau nuestra nuestra
          banda sonora 😺
        </p>
        <p className="footer_logo_text">
          2023 C Cosas de gatos - Todos los derechos reservados - Términos de
          uso - Política de privacidad
        </p>
      </div>

      <div className="footer_redes">Redes Sociales</div>

      <div className="footer_menus">
        <div className="footer_menu">
          <div className="footer_menu_title">Acerca de nosotros</div>
          <ol>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Qué es Pinterest
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Nuestra página de Pinterest
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Blog de ingeniería marca
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Directrices de la
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Empleo
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Centro de ayuda
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Pinterest Labs
              </a>
            </li>
          </ol>
        </div>

        <div className="footer_menu">
          <div className="footer_menu_title">Nuestras politicas</div>
          <ol>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Copyright
              </a>{" "}
              &<a className="footer_menu_link"> marca registrada</a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Anuncios personalizados
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Condiciones de servicio
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Privacidad & cookies
              </a>
            </li>
          </ol>
        </div>
        <div className="footer_menu">
          <div className="footer_menu_title">Más información</div>
          <ol>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Para empresas
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Para empresas
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Para desarrolladores
              </a>
            </li>
            <li clas="footer_menu_list">
              <a href="#" className="footer_menu_link">
                Para inversiones
              </a>
            </li>
          </ol>
        </div>
      </div>
    </footer>
  );
}
