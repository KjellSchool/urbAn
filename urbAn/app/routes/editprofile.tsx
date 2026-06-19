import { Link, Form, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import { useUser } from "~/contexts/userContext";

import read_sign from "../assets/icons/read_sign.png";

// import { supabase } from "../database/supabase.js";
import { updateProfile } from "../database/profiles.js";

const Editprofile = () => {
  const { currentUser, setCurrentUser } = useUser();

  const [primaryArchetypeId, setPrimaryArchetypeId] = useState();
  const [primaryArchetype, setPrimaryArchetype] = useState();

  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar);

  //   const removeCurrentUser = () => {
  //     localStorage.removeItem("currentUser");
  //   };

  const countries = [
    { country: "Afghanistan", flag: "🇦🇫" },
    { country: "Albania", flag: "🇦🇱" },
    { country: "Algeria", flag: "🇩🇿" },
    { country: "Andorra", flag: "🇦🇩" },
    { country: "Angola", flag: "🇦🇴" },
    { country: "Argentina", flag: "🇦🇷" },
    { country: "Armenia", flag: "🇦🇲" },
    { country: "Australia", flag: "🇦🇺" },
    { country: "Austria", flag: "🇦🇹" },
    { country: "Azerbaijan", flag: "🇦🇿" },
    { country: "Bahamas", flag: "🇧🇸" },
    { country: "Bahrain", flag: "🇧🇭" },
    { country: "Bangladesh", flag: "🇧🇩" },
    { country: "Belarus", flag: "🇧🇾" },
    { country: "Belgium", flag: "🇧🇪" },
    { country: "Belize", flag: "🇧🇿" },
    { country: "Benin", flag: "🇧🇯" },
    { country: "Bhutan", flag: "🇧🇹" },
    { country: "Bolivia", flag: "🇧🇴" },
    { country: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { country: "Botswana", flag: "🇧🇼" },
    { country: "Brazil", flag: "🇧🇷" },
    { country: "Brunei", flag: "🇧🇳" },
    { country: "Bulgaria", flag: "🇧🇬" },
    { country: "Burkina Faso", flag: "🇧🇫" },
    { country: "Burundi", flag: "🇧🇮" },
    { country: "Cambodia", flag: "🇰🇭" },
    { country: "Cameroon", flag: "🇨🇲" },
    { country: "Canada", flag: "🇨🇦" },
    { country: "Cape Verde", flag: "🇨🇻" },
    { country: "Central African Republic", flag: "🇨🇫" },
    { country: "Chad", flag: "🇹🇩" },
    { country: "Chile", flag: "🇨🇱" },
    { country: "China", flag: "🇨🇳" },
    { country: "Colombia", flag: "🇨🇴" },
    { country: "Comoros", flag: "🇰🇲" },
    { country: "Congo", flag: "🇨🇬" },
    { country: "Costa Rica", flag: "🇨🇷" },
    { country: "Croatia", flag: "🇭🇷" },
    { country: "Cuba", flag: "🇨🇺" },
    { country: "Cyprus", flag: "🇨🇾" },
    { country: "Czech Republic", flag: "🇨🇿" },
    { country: "Denmark", flag: "🇩🇰" },
    { country: "Djibouti", flag: "🇩🇯" },
    { country: "Dominican Republic", flag: "🇩🇴" },
    { country: "Ecuador", flag: "🇪🇨" },
    { country: "Egypt", flag: "🇪🇬" },
    { country: "El Salvador", flag: "🇸🇻" },
    { country: "Estonia", flag: "🇪🇪" },
    { country: "Eswatini", flag: "🇸🇿" },
    { country: "Ethiopia", flag: "🇪🇹" },
    { country: "Finland", flag: "🇫🇮" },
    { country: "France", flag: "🇫🇷" },
    { country: "Germany", flag: "🇩🇪" },
    { country: "Ghana", flag: "🇬🇭" },
    { country: "Greece", flag: "🇬🇷" },
    { country: "Hungary", flag: "🇭🇺" },
    { country: "Iceland", flag: "🇮🇸" },
    { country: "India", flag: "🇮🇳" },
    { country: "Indonesia", flag: "🇮🇩" },
    { country: "Iran", flag: "🇮🇷" },
    { country: "Iraq", flag: "🇮🇶" },
    { country: "Ireland", flag: "🇮🇪" },
    { country: "Israel", flag: "🇮🇱" },
    { country: "Italy", flag: "🇮🇹" },
    { country: "Jamaica", flag: "🇯🇲" },
    { country: "Japan", flag: "🇯🇵" },
    { country: "Jordan", flag: "🇯🇴" },
    { country: "Kazakhstan", flag: "🇰🇿" },
    { country: "Kenya", flag: "🇰🇪" },
    { country: "Kuwait", flag: "🇰🇼" },
    { country: "Latvia", flag: "🇱🇻" },
    { country: "Lebanon", flag: "🇱🇧" },
    { country: "Libya", flag: "🇱🇾" },
    { country: "Lithuania", flag: "🇱🇹" },
    { country: "Luxembourg", flag: "🇱🇺" },
    { country: "Madagascar", flag: "🇲🇬" },
    { country: "Malaysia", flag: "🇲🇾" },
    { country: "Mexico", flag: "🇲🇽" },
    { country: "Mongolia", flag: "🇲🇳" },
    { country: "Morocco", flag: "🇲🇦" },
    { country: "Netherlands", flag: "🇳🇱" },
    { country: "New Zealand", flag: "🇳🇿" },
    { country: "Nigeria", flag: "🇳🇬" },
    { country: "North Korea", flag: "🇰🇵" },
    { country: "Norway", flag: "🇳🇴" },
    { country: "Pakistan", flag: "🇵🇰" },
    { country: "Panama", flag: "🇵🇦" },
    { country: "Peru", flag: "🇵🇪" },
    { country: "Philippines", flag: "🇵🇭" },
    { country: "Poland", flag: "🇵🇱" },
    { country: "Portugal", flag: "🇵🇹" },
    { country: "Qatar", flag: "🇶🇦" },
    { country: "Romania", flag: "🇷🇴" },
    { country: "Russia", flag: "🇷🇺" },
    { country: "Saudi Arabia", flag: "🇸🇦" },
    { country: "Serbia", flag: "🇷🇸" },
    { country: "Singapore", flag: "🇸🇬" },
    { country: "Slovakia", flag: "🇸🇰" },
    { country: "Slovenia", flag: "🇸🇮" },
    { country: "South Africa", flag: "🇿🇦" },
    { country: "South Korea", flag: "🇰🇷" },
    { country: "Spain", flag: "🇪🇸" },
    { country: "Sri Lanka", flag: "🇱🇰" },
    { country: "Sweden", flag: "🇸🇪" },
    { country: "Switzerland", flag: "🇨🇭" },
    { country: "Thailand", flag: "🇹🇭" },
    { country: "Tunisia", flag: "🇹🇳" },
    { country: "Turkey", flag: "🇹🇷" },
    { country: "Ukraine", flag: "🇺🇦" },
    { country: "United Arab Emirates", flag: "🇦🇪" },
    { country: "United Kingdom", flag: "🇬🇧" },
    { country: "United States", flag: "🇺🇸" },
    { country: "Uruguay", flag: "🇺🇾" },
    { country: "Venezuela", flag: "🇻🇪" },
    { country: "Vietnam", flag: "🇻🇳" },
    { country: "Zimbabwe", flag: "🇿🇼" },
  ];

  const avatars = [
    {
      src: "https://oyzvqqbanissrvkjdgek.supabase.co/storage/v1/object/sign/avatars/avatar-alien.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80N2Y1MDEwYy0xNjM2LTRiMGMtYTdmZS05OTU1ZGE0YWJjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci1hbGllbi5zdmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNzE2MDQ1LCJleHAiOjE4MTMyNTIwNDV9.NeHR95v1VBOxONtCwhtYV7LE_nQFjCVqeKKimHrAyME",
      color: "46a2ff",
    },
    {
      src: "https://oyzvqqbanissrvkjdgek.supabase.co/storage/v1/object/sign/avatars/avatar-apple.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80N2Y1MDEwYy0xNjM2LTRiMGMtYTdmZS05OTU1ZGE0YWJjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci1hcHBsZS5zdmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNzE2MDU2LCJleHAiOjE4MTMyNTIwNTZ9.6Jr257xWqJSNTcjl7UnceoxC77ftTQ-4gMder4FXrrE",
      color: "ff85e4",
    },
    {
      src: "https://oyzvqqbanissrvkjdgek.supabase.co/storage/v1/object/sign/avatars/avatar-cat.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80N2Y1MDEwYy0xNjM2LTRiMGMtYTdmZS05OTU1ZGE0YWJjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci1jYXQuc3ZnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTcxNjA2OSwiZXhwIjoxODEzMjUyMDY5fQ.iRAyXPKfJQunHREMPKx9U2CwJPiqYrHBa8k5XTuLQYU",
      color: "ff8029",
    },
    {
      src: "https://oyzvqqbanissrvkjdgek.supabase.co/storage/v1/object/sign/avatars/avatar-duck.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80N2Y1MDEwYy0xNjM2LTRiMGMtYTdmZS05OTU1ZGE0YWJjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci1kdWNrLnN2ZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE3MTYwODYsImV4cCI6MTgxMzI1MjA4Nn0.oRS1YVUjhvGkvk0If15LqfhZtstrN-k_7VJ87OZjIdM",
      color: "cdff10",
    },
    {
      src: "https://oyzvqqbanissrvkjdgek.supabase.co/storage/v1/object/sign/avatars/avatar-potato.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80N2Y1MDEwYy0xNjM2LTRiMGMtYTdmZS05OTU1ZGE0YWJjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci1wb3RhdG8uc3ZnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTcxNjA5NiwiZXhwIjoxODEzMjUyMDk2fQ.qKefA72ak0c7Jm8-t2Q1IQS8HHbSk9iG9r5IiwBbaMg",
      color: "00e081",
    },
    {
      src: "https://oyzvqqbanissrvkjdgek.supabase.co/storage/v1/object/sign/avatars/avatar-robot.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80N2Y1MDEwYy0xNjM2LTRiMGMtYTdmZS05OTU1ZGE0YWJjNzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci1yb2JvdC5zdmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNzE2MTAzLCJleHAiOjE4MTMyNTIxMDN9.i7bJ1RX5WlYSD8Mdj4W6CkfS-1a9mF7rhjGZ_6_lePM",
      color: "B085FF",
    },
  ];

  const navigate = useNavigate();

  const [pendingUser, setPendingUser] = useState({
    avatar: "",
    name: "",
    description: "",
    dob: "",
    gender: "",
    nationality: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setPendingUser({
      name: currentUser?.name || "",
      gender: currentUser?.gender || "",
      description: currentUser?.description || "",
      dob: currentUser?.date_of_birth || "",
      nationality: currentUser?.nationality || "",
      avatar: currentUser?.avatar || "",
    });

    setSelectedAvatar(currentUser.avatar);
  }, [currentUser]);

  const handleSaveProfile = async () => {
    console.log("run");
    if (!currentUser?.profile_id) return;
    console.log(currentUser);

    const { data: freshProfile, error } = await updateProfile(
      currentUser?.profile_id,
      pendingUser,
    );

    if (error) {
      console.log(error);
    }

    console.log(freshProfile);
    setCurrentUser(freshProfile);
    navigate("/profile");
  };

  return (
    <>
      <div className="editprofile">
        <header className="editprofile__header">
          <div className="editprofile__navigation">
            <Link to={`/settings`} className="editprofile__navigation--back">
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.7188 16.1562C11.8958 16.3333 11.9844 16.5469 11.9844 16.7969C11.9844 17.0365 11.8958 17.2448 11.7188 17.4219L10.2344 18.9062C10.0573 19.0833 9.84375 19.1719 9.59375 19.1719C9.35417 19.1719 9.14583 19.0833 8.96875 18.9062L0.28125 10.2188C0.09375 10.0312 0 9.81771 0 9.57812C0 9.32812 0.09375 9.11979 0.28125 8.95312L8.96875 0.265625C9.14583 0.0885417 9.35417 0 9.59375 0C9.84375 0 10.0573 0.0885417 10.2344 0.265625L11.7188 1.75C11.8958 1.92708 11.9844 2.14062 11.9844 2.39062C11.9844 2.63021 11.8958 2.83854 11.7188 3.01562L5.14062 9.57812L11.7188 16.1562Z"
                  fill="black"
                />
              </svg>
            </Link>
          </div>
          <h1 className="editprofile__title">Edit Profile</h1>
        </header>
        <div className="editprofile__group">
          <div className="select__avatar">
            <img className="read__check" src={read_sign} />
            <div
              className="selected__avatar"
              style={{ backgroundColor: `#${selectedAvatar?.color}` }}>
              <img
                src={selectedAvatar?.src || currentUser?.avatar}
                alt="avatar"
              />
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="avatar"
                  style={{ backgroundColor: `#${avatar.color}` }}
                  onClick={() => {
                    setSelectedAvatar(avatar);

                    setPendingUser((prev) => ({
                      ...prev,
                      avatar: avatar.src,
                    }));
                  }}>
                  <img src={avatar.src} alt={`Avatar ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <Link className="retake__quiz" to={`/`}>
            <button>Retake Quiz</button>
          </Link>
        </div>
        <Form onSubmit={handleSaveProfile} className="profile__form">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={pendingUser.name}
              onChange={(e) =>
                setPendingUser((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />{" "}
          </div>
          <div className="form__group form__group--gender">
            <label className="form__label" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={pendingUser.gender}
              onChange={(e) =>
                setPendingUser((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }>
              <option value="">- Pick one -</option>
              <option value="woman">Woman</option>
              <option value="man">Man</option>
              <option value="non-binary">Non-Binary</option>
            </select>
          </div>
          <div className="form__group form__group--descrip">
            <label className="form__label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={pendingUser.description}
              onChange={(e) =>
                setPendingUser((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <p>Max. 50 words</p>
          </div>

          <div className="form__group form__group--date">
            <label className="form__label" htmlFor="dateOfBirth">
              Date of birth
            </label>
            <div className="date-input">
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={pendingUser.dob}
                onChange={(e) =>
                  setPendingUser((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
              />
              <svg
                className="date-input__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none">
                <rect
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="2.22192"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="4.44385"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="6.66577"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="8.88745"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="11.1094"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="13.3313"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="15.5532"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="17.7751"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="19.9968"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="22.2188"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="24.4407"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="27.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="25.5508"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="23.3281"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="21.1055"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="18.8828"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="16.6602"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="14.4414"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="12.2188"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="7.77344"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="5.55078"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="25.8108"
                  y="4.44141"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="23.5889"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="21.3669"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="19.1453"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="16.9233"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="14.7014"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="12.4795"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="10.2576"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="8.03564"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="5.81396"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="5.81396"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="19.9968"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="5.81396"
                  y="4.44141"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="2.22192"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="4.44385"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="6.66577"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="8.88745"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="11.1094"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="13.3313"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="15.5532"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="17.7751"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="19.9968"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="22.2188"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="24.4407"
                  y="9.99609"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="18.5527"
                  y="16.3672"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="6.9248"
                  y="16.3672"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="6.9248"
                  y="22.2188"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="12.7388"
                  y="22.2188"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="18.5527"
                  y="22.2188"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="12.7388"
                  y="16.3672"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="19.9968"
                  y="4.44141"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="3.59204"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  x="2.22192"
                  y="2.22266"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="4.44141"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="6.66406"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="8.88672"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="11.1094"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="13.332"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="15.5547"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="17.7734"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="19.9961"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="22.2188"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="24.4375"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
                <rect
                  y="26.6641"
                  width="2.22189"
                  height="2.22189"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          <div className="form__group form__group--nationality">
            <label className="form__label" htmlFor="nationality">
              Nationality
            </label>
            <select
              id="nationality"
              name="nationality"
              value={pendingUser.nationality}
              onChange={(e) =>
                setPendingUser((prev) => ({
                  ...prev,
                  nationality: e.target.value,
                }))
              }>
              {countries?.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country} {country.flag}
                </option>
              ))}
            </select>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" name="password" />
          </div>
          <button
            className="save__profile"
            type="submit"
            onClick={() => console.log("clicked")}>
            Save Changes
          </button>
        </Form>
      </div>
    </>
  );
};

export default Editprofile;
