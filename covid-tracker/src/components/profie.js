import { useAuth0, User } from "@auth0/auth0-react";
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        {user.picture && <img src={user.picture} alt={user.name} />}
        {user.name && <h2>{user.name}</h2>}
        {user.email && <p>{user.email}</p>}
        <p>{user.sub}</p>
      </div>
    )
  );
};
export default Profile;
