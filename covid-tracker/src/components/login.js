import { useAuth0 } from "@auth0/auth0-react";
import styles from "./customButton.module.css";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className={styles.button} onClick={() => loginWithRedirect()}>
        Sign In
      </button>
    )
  );
};
export default Login;
