import { Fragment } from "react";
import HeaderButton from "./headerButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styles from "./MainHeader.module.css";
const MainHeader = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <Fragment>
      <header className={styles.header}>
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          COVID Tracker
        </h1>
        <div>
          {isAuthenticated && (
            <span
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </span>
          )}
          <HeaderButton />
        </div>
      </header>
    </Fragment>
  );
};
export default MainHeader;
/*


.header {
    width: 100%;
    height: 5rem;
    background-color: #044599;
    padding: 0 10%;
  }
  
  .header nav {
    height: 100%;
  }
  
  .header ul {
    height: 100%;
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    justify-content: center;
  }
  
  .header li {
    margin: 0 1rem;
    width: 5rem;
  }
  
  .header a {
    color: white;
    text-decoration: none;
  }
  
  .header a:hover,
  .header a:active,
  .header a.active {
    color: #95bcf0;
    padding-bottom: 0.25rem;
    border-bottom: 4px solid #95bcf0;
  }


  <nav>
        <ul>
          <li>
            <NavLink activeclassname={styles.active} to="/">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname={styles.active} to="/form">
              form
            </NavLink>
          </li>
          <li>
            <NavLink activeclassname={styles.active} to="/dashboard">
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
*/
/*
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: #13068a;
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 0 10%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
}
.header h1{
  color: white;
}
*/
