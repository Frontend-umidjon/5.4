import React, { useState } from "react";
import "./App.css";

const UserCard = ({ fname, lname, age, profession, gender, bio, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <div className="card-header"></div>
      <div className="card-avatar">
        <div className="avatar-circle">
          <span>{fname[0]}{lname[0]}</span>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-name">{fname} {lname}</h2>
        <h4 className="card-profession">{profession}</h4>
        <p className="card-info">
          Age: {age} | Gender: {gender}
        </p>
        <p className="card-bio">{bio}</p>
        <button className="card-button" onClick={onEdit}>Edit</button>
        <button className="card-button delete-button" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([
    { fname: "John", lname: "Doe", age: 30, profession: "Engineer", gender: "Male", bio: "Loves coding and hiking." }
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    age: "",
    profession: "",
    gender: "",
    bio: ""
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = newUser;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, newUser]);
    }
    setNewUser({ fname: "", lname: "", age: "", profession: "", gender: "", bio: "" });
    setShowPopup(false);
  };

  const handleEditUser = (index) => {
    setEditIndex(index);
    setNewUser(users[index]);
    setShowPopup(true);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div className="user-list">
        {users.map((user, index) => (
          <UserCard
            key={index}
            {...user}
            onEdit={() => handleEditUser(index)}
            onDelete={() => handleDeleteUser(index)}
          />
        ))}
      </div>
      <button className="add-user-button" onClick={() => setShowPopup(true)}>
        Add User
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{editIndex !== null ? "Edit User" : "Add New User"}</h2>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={newUser.fname}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={newUser.lname}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newUser.age}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="profession"
              placeholder="Profession"
              value={newUser.profession}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={newUser.gender}
              onChange={handleInputChange}
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={newUser.bio}
              onChange={handleInputChange}
            ></textarea>
            <button className="popup-button" onClick={handleAddUser}>
              {editIndex !== null ? "Save Changes" : "Add"}
            </button>
            <button className="popup-button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
