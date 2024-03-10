import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [users, setusers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userForShow, setUserForShow] = useState(null);

  const deleteUser = (url, id) => {
    if (loading) return loading;
    if (error) console.log(error);
    if (userForShow !== null) {
      if (id === userForShow.id) {
        setUserForShow(null);
      }
    }

    axios
      .delete(url + `/${id}`)
      .then((response) => {
        console.log("This user has been deleted", response.data);
        setusers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitUser = (url, postdata) => {
    if (loading) return loading;
    if (error) console.log(error);
    axios
      .post(url, postdata)
      .then((response) => {
        console.log("This has been posted", response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log(false);
      });
  };

  const showUser = (idOfUserToShow) => {
    users.map((user) => {
      if (user.id === idOfUserToShow) {
        return setUserForShow(user);
      }
    });
  };

  const hideUser = () => setUserForShow(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setusers(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, ["http://localhost:3001/users"]);

  return (
    <>
      <h1>My Users' Database</h1>
      <SubmitUsers submitUser={submitUser} />
      <Users users={users} userToDelete={deleteUser} userToShow={showUser} />
      <UserDetails userForShow={userForShow} hideUser={hideUser} />
    </>
  );
}

function SubmitUsers({ submitUser }) {
  const [userToSubmit, setUserToSubmit] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setUserToSubmit({ ...userToSubmit, [e.target.name]: e.target.value });
  };

  return (
    <fieldset>
      <legend> Add Users </legend>
      <form
        onSubmit={() => submitUser("http://localhost:3001/users", userToSubmit)}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userToSubmit.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          email:
          <input
            type="text"
            name="email"
            value={userToSubmit.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit" className="addusers">
          Add User
        </button>
      </form>
    </fieldset>
  );
}

function Users({ users, userToDelete, userToShow }) {
  return (
    <fieldset>
      <legend>Users</legend>
      <ol>
        {users
          ? users.map((user) => (
              <RenderUsers
                user={user}
                userToDelete={userToDelete}
                userToShow={userToShow}
              />
            ))
          : "undefined"}
      </ol>
    </fieldset>
  );
}

function RenderUsers({ user, userToDelete, userToShow }) {
  return (
    <li key={user.id}>
      <p>Username: {user ? user.name : "undefined"}</p>
      <button
        type="submit"
        onClick={() => userToDelete("http://localhost:3001/users", user.id)}
      >
        Delete User
      </button>
      <button type="submit" onClick={() => userToShow(user.id)}>
        Show User Details
      </button>
    </li>
  );
}

function UserDetails({ userForShow, hideUser }) {
  return (
    <>
      <fieldset className="UserDetails">
        <legend> User Details</legend>
        {userForShow ? (
          <RenderUserDetails userForShow={userForShow} hideUser={hideUser} />
        ) : (
          () => {}
        )}
      </fieldset>
    </>
  );
}

function RenderUserDetails({ userForShow, hideUser }) {
  return (
    <>
      <ul>
        <li>
          <b>User's ID:</b> {userForShow.id}
        </li>
        <li>
          <b>User's name:</b> {userForShow.name}
        </li>
        <li>
          <b>User's email:</b> {userForShow.email}
        </li>
      </ul>
      <button className="hide" type="submit" onClick={hideUser}>
        {" "}
        Hide{" "}
      </button>
    </>
  );
}






