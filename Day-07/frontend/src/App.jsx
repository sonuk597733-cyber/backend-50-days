import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch("http://localhost:3000/users");
   
      if (!response.ok) {
        throw new Error("Users fetch nahi hue");
      }

      const data = await response.json();

      setUsers(data.users);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <nav>
        <button id="click" onClick={getUsers}>
          🪩 Get Users
        </button>
      </nav>

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}

      <div id="message">
        {users.map((user) => (
          <div className="profile" key={user._id || user.email}>
            <div className="userdata">
              <h2>{user.username}</h2>
              <p>{user.email}</p>
              <button
                className="viewprofile"
                onClick={() => alert(user.username)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
