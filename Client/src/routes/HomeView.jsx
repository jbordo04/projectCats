import { Navigate, useOutletContext } from "react-router-dom";
import { Landing } from "./userLanding";

export const HomeView = () => {
  const session = useOutletContext();
  return session.data ? <Navigate to="/page/0" /> : <Navigate to="/page/0" />;
};

export function NotfoundView() {
  <div id="content" class="d-flex flex__center snippet-hidden">
    <div class="flex--item wmx5">
      <h1 class="fs-headline1 mb4">Page not found</h1>
      <div class="fs-subheading mb24">
        <p>We're sorry, we couldn't find the page you requested.</p>
      </div>

      <div class="fs-body2">
        <p>
          Try <a href="/search">searching for similar questions</a>
        </p>

        <p>
          Browse our <a href="/questions">recent questions</a>
        </p>
        <p>
          Browse our <a href="/tags">popular tags</a>
        </p>

        <p class="mb0">
          If you feel something is missing that should be here,{" "}
          <a href="/contact">contact us</a>.
        </p>
      </div>
    </div>
  </div>;
}
