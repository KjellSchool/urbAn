import { Link } from "react-router";

const Settings = () => {
  const removeCurrentUser = () => {
    localStorage.removeItem("currentUser");
  }

  return (
    <>
      <div className="settings">
        <h1 className="settings__title">Settings</h1>
        <div className="settings__navigation">
          <Link to={`/profile`}>Back</Link>
        </div>
        <div className="settings__group">
          <h2 className="group__title">General</h2>
          <div className="group__setting">
            <label htmlFor="">Visibility</label>
            <input type="checkbox" />
          </div>
          <div className="group__setting">
            <label htmlFor="">Units of measurement</label>
            <input type="checkbox" />
          </div>
        </div>
        <div className="settings__group">
          <h2 className="group__title">Appearance</h2>
          <div className="group__setting">
            <label htmlFor="">Dark mode</label>
            <input type="checkbox" />
          </div>
        </div>
        <div className="settings__group">
          <h2 className="group__title">Accessibility</h2>
          <div className="group__setting">
            <label htmlFor="">Screen reader</label>
            <input type="checkbox" />
          </div>
          <div className="group__setting">
            <label htmlFor="">High contrast</label>
            <input type="checkbox" />
          </div>
        </div>
        <div className="settings__links">
          <Link to={``}>Retake the archetype quiz</Link>
          <Link className="settings__log" to={`/`}><button onClick={removeCurrentUser}>Log out</button></Link>
        </div>
      </div>
    </>
  )
}

export default Settings;