import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const addActive = ({ isActive }) => (isActive ? css.active : css.link);
  return (
    <header>
      <nav className={clsx(css.nav)}>
        <NavLink className={addActive} to="/">
          Home
        </NavLink>
        <NavLink className={addActive} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
export default Navigation;
