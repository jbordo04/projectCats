import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();
  // console.log(err)
  let navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>Ooops!!</h1>

      <p>Something is wrong, watch out pls!!</p>

      <p>
        <i>{err.statusText || err.message}</i>
      </p>
      <button onClick={() => navigate(-1)}>Atrás</button>
    </div>
  );
}
