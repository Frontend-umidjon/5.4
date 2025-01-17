import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const UserCard = ({ id, fname, lname, age, profession, gender, bio, onEdit, onDelete }) => {
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
        <button className="card-button" onClick={() => onEdit(id)}>Edit</button>
        <button className="card-button delete-button" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([
    { id: uuidv4(), fname: "John", lname: "Doe", age: 30, profession: "Engineer", gender: "Male", bio: "Loves coding and hiking." }
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
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (editId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
      setEditId(null);
    } else {
      setUsers([...users, { id: uuidv4(), ...newUser }]);
    }
    setNewUser({ fname: "", lname: "", age: "", profession: "", gender: "", bio: "" });
    setShowPopup(false);
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditId(id);
    setNewUser(userToEdit);
    setShowPopup(true);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            {...user}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
      <button className="add-user-button" onClick={() => setShowPopup(true)}>
        Add User
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{editId !== null ? "Edit User" : "Add New User"}</h2>
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
              {editId !== null ? "Save Changes" : "Add"}
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
