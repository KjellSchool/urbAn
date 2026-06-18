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
          <div className="user__check">
            <p>made for You</p>
            <svg
              width="36"
              height="22"
              viewBox="0 0 36 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.27448 14.2458L8.26433 13.9611L8.54899 17.951L4.55913 18.2357L4.27448 14.2458Z"
                fill="#46A2FF"
              />
              <path
                d="M12.2543 13.6766L16.2441 13.3919L16.5288 17.3818L12.5389 17.6664L12.2543 13.6766Z"
                fill="#46A2FF"
              />
              <path
                d="M8.54899 17.951L12.5389 17.6664L12.8232 21.6565L8.83336 21.9411L8.54899 17.951Z"
                fill="#46A2FF"
              />
              <path
                d="M16.5288 17.3818L20.5183 17.0974L20.803 21.0872L16.8131 21.3719L16.5288 17.3818Z"
                fill="#91C8FF"
              />
              <path
                d="M20.234 13.1073L24.2239 12.8227L24.5085 16.8125L20.5183 17.0974L20.234 13.1073Z"
                fill="#91C8FF"
              />
              <path
                d="M15.9592 9.40273L19.949 9.11808L20.234 13.1073L16.2441 13.3919L15.9592 9.40273Z"
                fill="#46A2FF"
              />
              <path
                d="M23.9389 8.83349L27.9288 8.54884L28.2134 12.5387L24.2239 12.8227L23.9389 8.83349Z"
                fill="#91C8FF"
              />
              <path
                d="M19.6647 5.12803L23.6546 4.84337L23.9389 8.83349L19.949 9.11808L19.6647 5.12803Z"
                fill="#46A2FF"
              />
              <path
                d="M27.6445 4.55878L31.6343 4.27413L31.919 8.26398L27.9288 8.54884L27.6445 4.55878Z"
                fill="#91C8FF"
              />
              <path
                d="M23.3698 0.853233L27.3596 0.568578L27.6445 4.55878L23.6546 4.84337L23.3698 0.853233Z"
                fill="#46A2FF"
              />
              <path
                d="M31.3495 0.283984L35.3394 -0.000671413L35.6241 3.98919L31.6343 4.27413L31.3495 0.283984Z"
                fill="#91C8FF"
              />
              <path
                d="M9.59942e-05 10.5413L3.98995 10.2566L4.27448 14.2458L0.284751 14.5312L9.59942e-05 10.5413Z"
                fill="#46A2FF"
              />
              <path
                d="M7.97939 9.97198L11.9692 9.68732L12.2543 13.6766L8.26433 13.9611L7.97939 9.97198Z"
                fill="#91C8FF"
              />
            </svg>
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
                <option key={1} value="">
                  - Pick one -
                </option>
                <option key={2} value="woman">
                  Woman
                </option>
                <option key={3} value="man">
                  Man
                </option>
                <option key={4} value="non-binary">
                  Non-Binary
                </option>
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
