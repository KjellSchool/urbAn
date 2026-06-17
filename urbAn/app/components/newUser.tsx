import { useState } from "react";
import { useOutletContext } from "react-router";

const NewUser = () => {
  const { setPendingUser } = useOutletContext();
  const [username, setUsername] = useState(null);
  const [description, setDescription] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState(null);

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

  return (
    <>
      <div className="user__new">
        <div className="new__promo">
          <h2 className="new__title">
            <span className="new__title--text">Welcome to</span>
            <span className="new__title--sticker">urbAn</span>
          </h2>
          <div className="user__window intro__window--1">
            <div className="user__window--header">
              <p>Antwerp loading...</p>
            </div>
            <div className="user__window--content">
              <p>
                Find your exploring
                <br />
                archetype & unlock a<br />
                <span className="highlight-pink-200">version of Antwerp</span>
              </p>
            </div>
          </div>
        </div>
        <div className="new__form">
          <label>
            Name
            <input
              type="text"
              name="username"
              placeholder="Cutie Patootie"
              onChange={(e) => {
                const value = e.target.value;

                setUsername(value);
                setPendingUser((prev) => ({
                  ...prev,
                  username: value,
                }));
              }}
            />
          </label>
          <label>
            Tell us about you
            <textarea
              type="text"
              name="description"
              placeholder="Travel lover since 2016!"
              onChange={(e) => {
                const value = e.target.value;

                setDescription(value);
                setPendingUser((prev) => ({
                  ...prev,
                  description: value,
                }));
              }}
            />
          </label>
          <div className="form__info">
            <label>
              Date of birth
              <input
                type="date"
                name="birthday"
                onChange={(e) => {
                  const value = e.target.value;

                  setBirthday(value);
                  setPendingUser((prev) => ({
                    ...prev,
                    birthday: value,
                  }));
                }}
              />
            </label>
            <label>
              Gender
              <select
                name="gender"
                onChange={(e) => {
                  const value = e.target.value;

                  setGender(value);
                  setPendingUser((prev) => ({
                    ...prev,
                    gender: value,
                  }));
                }}>
                <option key={1} value="">- Pick one -</option>
                <option key={2} value="woman">Woman</option>
                <option key={3} value="man">Man</option>
                <option key={4} value="non-binary">Non-Binary</option>
              </select>
            </label>
            <label>
              Country
              <select
                name="country"
                onChange={(e) => {
                  const value = e.target.value;

                  setCountry(value);
                  setPendingUser((prev) => ({
                    ...prev,
                    country: value,
                  }));
                }}>
                {countries?.map((country) => (
                  <option key={country.country} value={country.country}>
                    {country.flag}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
