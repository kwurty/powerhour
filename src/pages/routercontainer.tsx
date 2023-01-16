import { Outlet } from "react-router-dom";
import Nav from "../components/nav";

export default function RouterContainer() {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <Outlet />
    </div>
  );
}
