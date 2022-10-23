import { useAuth0 } from "@auth0/auth0-react";
import Login from "./login";
import Logout from "./logout";

const HeaderButton = () => {
  const { isAuthenticated } = useAuth0();

  return !isAuthenticated ? <Login /> : <Logout />;
};
export default HeaderButton;
