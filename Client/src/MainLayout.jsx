import { useRef, useState } from "react";
import { Nav, Footer } from "./routes/Footer.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "./useSession.js";
import { Navigation } from "./routes/Navigation.jsx";

export default function MainLayout() {
  const navigate = useNavigate();
  // const showNav = useRef(null);
  // const ref1 = useRef(null);
  const id = window.location.pathname;
  var ref1 = null;
  const param = id.split("/")[1];
  // console.log("params:", param);

  // const [log, Setlog] = useState(false);
  const session = useSession();
  console.log("sessMain:", session);

  if (param == "login" || param == "signup") {
    ref1 = "none";
    console.log("style:", ref1);
    // ref1.current.style.display = "none";
  }

  return (
    <>
      {
        !session.loading ? (
          <div>
            <Navigation session={session} navigate={navigate} show={ref1} />
            <div
            // isLoggedIn={!!session.data}
            >
              {/* context proporciona el context de los siguientes componentes, mediante l */}
              <Outlet context={session} />
            </div>
          </div>
        ) : null
        // <Loading />
      }
      {param == "login" || param == "signup" ? null : <Footer />}
    </>
  );
}
