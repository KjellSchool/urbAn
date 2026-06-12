import { useState } from "react";
import { useOutletContext } from "react-router";

const NewUser = () => {
  const { setPendingUser } = useOutletContext();
  const [username, setUsername] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [description, setDescription] = useState(null);

  return (
    <>
      <div>
        <p>give us info</p>
        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={(e) => {
              const value = e.target.value;

              setUsername(value);
              setPendingUser((prev) => ({
                ...prev,
                username: value,
              }))
            }}
          />
        </label>
        <label>
          Birthday
          <input
            type="date"
            name="birthday"
            onChange={(e) => {
              const value = e.target.value;

              setBirthday(value);
              setPendingUser((prev) => ({
                ...prev,
                birthday: value
              }))
            }}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            onChange={(e) => {
              const value = e.target.value;

              setDescription(value);
              setPendingUser((prev) => ({
                ...prev,
                description: value
              }))
            }}
          />
        </label>
      </div>
    </>
  );
};

export default NewUser;
