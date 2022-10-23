import { useAuth0 } from "@auth0/auth0-react";
import styles from "./customButton.module.css";
const Logout = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <button
        className={styles.button}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Sign Out
      </button>
    )
  );
};
export default Logout;
