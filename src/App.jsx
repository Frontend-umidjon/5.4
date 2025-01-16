import React from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>User Cards</h1>
        <button className="add-user-btn">
          Add New User
        </button>
      </header>
      <main className="card-container">
        <div className="user-card">
          <div className="card-header">
            <img src="https://via.placeholder.com/80" alt="Profile" className="profile-img" />
          </div>
          <div className="card-body">
            <h3 className="name">First Name</h3>
            <h4 className="surname">Last Name</h4>
            <p className="profession">Profession</p>
            <p className="age">Age: 30</p>
            <p className="gender">Gender: Male</p>
            <p className="bio">Bio</p>
          </div>
          
        </div>
      </main>
      <div className="popup">
        <div className="popup-content">
          <h2>Add New User</h2>
          <form>
            <input type="text" name="fname" placeholder="First Name" required />
            <input type="text" name="lname" placeholder="Last Name" required />
            <input type="number" name="age" placeholder="Age" />
            <input type="text" name="profession" placeholder="Profession" />
            <input type="text" name="gender" placeholder="Gender" />
            <textarea name="bio" placeholder="Bio"></textarea>
            <button type="submit">Add User</button>
            <button type="button">
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;