import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserForm.module.css";

const UserForm = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState("");
  const [age, setAge] = useState("");
  const [allValid, setAllValid] = useState(false);
  const [location, setLocation] = useState({
    loaded: false,
    coord: { lat: "", lng: "" },
  });

  const authID = user.sub.split("|")[1];
  async function getToken() {
    const token = await getAccessTokenSilently();
    return token;
  }

  useEffect(() => {
    if (isAuthenticated) {
      const split_id = user.sub.split("|");

      async function fetchdata() {
        const token = await getAccessTokenSilently();

        const response = await fetch(`/api/users/${split_id[1]}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        let body = await response.text();

        if (!body) {
          fetch("/api/adduser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ authUserID: split_id[1] }),
          });
        }
      }
      fetchdata();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!navigator.geolocation) {
      onError({
        code: 0,
        message: "GeoLocation Not Supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSucces, onError);
  }, []);

  if (location.error)
    alert("Please allow Covid Tracker to access your location ");

  const onSucces = (location) => {
    setLocation({
      loaded: true,
      coord: { lat: location.coords.latitude, lng: location.coords.longitude },
    });
  };

  const onError = (error) => {
    setLocation({ loaded: true, error });
  };

  const ageHandler = (event) => {
    setAge(event.target.value);
    if (event.target.value === "" || temperature === "" || location.error)
      setAllValid(false);
    else setAllValid(true);
  };

  const temperatureHandler = (event) => {
    setTemperature(event.target.value);
    if (age === "" || event.target.value === "" || location.error)
      setAllValid(false);
    else setAllValid(true);
  };

  const submitUserForm = async (event) => {
    event.preventDefault();
    const token = getToken();

    try {
      const response = await fetch(`/api/user/${authID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: age,
          temperarture: temperature,
          location: location.coord,
        }),
      });
      const res = await response.json();

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.create}>
      <form onSubmit={submitUserForm}>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" value={age} onChange={ageHandler} />

        <label htmlFor="temperature">Temperature</label>
        <input
          type="number"
          id="temperature"
          value={temperature}
          onChange={temperatureHandler}
        />

        <label htmlFor="name">Location</label>
        <input
          type="text"
          id="location"
          readOnly={true}
          value={
            !location.error
              ? location.coord.lat + ", " + location.coord.lng
              : ""
          }
        />

        <button disabled={!allValid}>Submit</button>
      </form>
    </div>
  );
};
export default UserForm;
