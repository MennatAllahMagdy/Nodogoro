import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [clickedMarker, setClickedMarker] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const token = await getAccessTokenSilently();
      const response = await fetch("/api/users", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);
  return (
    <MapContainer
      center={[30.043489, 31.235291]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {users.length !== 0 &&
        users.map((patient) => (
          <Marker
            key={patient._id}
            position={[
              patient.location.coordinates[0],
              patient.location.coordinates[1],
            ]}
            eventHandlers={{
              click: (e) => {
                setClickedMarker(patient);
              },
            }}
          />
        ))}

      {clickedMarker && (
        <Popup
          position={[
            clickedMarker.location.coordinates[0],
            clickedMarker.location.coordinates[1],
          ]}
        >
          <div>
            <h2>Patient Age:{clickedMarker.age}</h2>
            <h2>Temperature: {clickedMarker.temperarture}</h2>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};
export default Dashboard;
