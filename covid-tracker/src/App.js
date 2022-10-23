import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import MainHeader from "./components/MainHeader";
import Dashboard from "./components/dashboard";
import CoronaSummary from "./components/CoronaSummary";

function App() {
  const { isLoading, error } = useAuth0();
  if (!error && isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) return <p>Authentication Error</p>;

  return (
    <div>
      <MainHeader />
      <Routes>
        <Route path="/" element={<CoronaSummary />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
