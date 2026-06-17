import { Link, Form } from "react-router";
import { useState } from "react";

import { useUser } from "~/contexts/userContext";

const Settings = () => {
    const { currentUser } = useUser();

    const [primaryArchetypeId, setPrimaryArchetypeId] = useState();
    const [primaryArchetype, setPrimaryArchetype] = useState();

    const removeCurrentUser = () => {
        localStorage.removeItem("currentUser");
    }

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
                            </svg></Link>
                    </div>
                    <h1 className="editprofile__title">Edit Profile</h1>
                </header>
                <div className="editprofile__group">
                    <div className="profile__info">
                        <div className="info__avatar">
                            <svg
                                width="833"
                                height="833"
                                viewBox="0 0 833 833"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    x="169.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="117.5"
                                    y="781"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 117.5 781)"
                                    fill="black"
                                />
                                <rect
                                    x="91.5"
                                    y="755"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 91.5 755)"
                                    fill="black"
                                />
                                <rect
                                    x="65.5"
                                    y="729"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 65.5 729)"
                                    fill="black"
                                />
                                <rect
                                    x="13.5"
                                    y="677"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 13.5 677)"
                                    fill="black"
                                />
                                <rect
                                    x="13.5"
                                    y="625"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 13.5 625)"
                                    fill="black"
                                />
                                <rect
                                    x="13.5"
                                    y="573"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 13.5 573)"
                                    fill="black"
                                />
                                <rect
                                    x="13.5"
                                    y="521"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 13.5 521)"
                                    fill="black"
                                />
                                <rect
                                    x="13.5"
                                    y="469"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 13.5 469)"
                                    fill="black"
                                />
                                <rect
                                    x="65.5"
                                    y="417"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 65.5 417)"
                                    fill="black"
                                />
                                <rect
                                    x="117.5"
                                    y="442"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 117.5 442)"
                                    fill="black"
                                />
                                <rect
                                    x="169.5"
                                    y="442"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 442)"
                                    fill="black"
                                />
                                <rect
                                    x="221.5"
                                    y="442"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 221.5 442)"
                                    fill="black"
                                />
                                <rect
                                    x="169.5"
                                    y="520"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 520)"
                                    fill="black"
                                />
                                <rect
                                    x="117.5"
                                    y="520"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 117.5 520)"
                                    fill="black"
                                />
                                <rect
                                    x="91.5"
                                    y="572"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 91.5 572)"
                                    fill="black"
                                />
                                <rect
                                    x="91.5"
                                    y="623"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 91.5 623)"
                                    fill="black"
                                />
                                <rect
                                    x="117.5"
                                    y="675"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 117.5 675)"
                                    fill="black"
                                />
                                <rect
                                    x="169.5"
                                    y="701"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 701)"
                                    fill="black"
                                />
                                <rect
                                    x="221.5"
                                    y="727"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 221.5 727)"
                                    fill="black"
                                />
                                <rect
                                    x="273.5"
                                    y="727"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 273.5 727)"
                                    fill="black"
                                />
                                <rect
                                    x="325.5"
                                    y="727"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 325.5 727)"
                                    fill="black"
                                />
                                <rect
                                    x="377.5"
                                    y="701"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 377.5 701)"
                                    fill="black"
                                />
                                <rect
                                    x="403.5"
                                    y="649"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 403.5 649)"
                                    fill="black"
                                />
                                <rect
                                    x="403.5"
                                    y="597"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 403.5 597)"
                                    fill="black"
                                />
                                <rect
                                    x="403.5"
                                    y="545"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 403.5 545)"
                                    fill="black"
                                />
                                <rect
                                    x="221.5"
                                    y="520"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 221.5 520)"
                                    fill="black"
                                />
                                <rect
                                    x="273.5"
                                    y="520"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 273.5 520)"
                                    fill="black"
                                />
                                <rect
                                    x="325.5"
                                    y="520"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 325.5 520)"
                                    fill="black"
                                />
                                <rect
                                    x="377.5"
                                    y="520"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 377.5 520)"
                                    fill="black"
                                />
                                <rect
                                    x="195.5"
                                    y="416"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 195.5 416)"
                                    fill="black"
                                />
                                <rect
                                    x="169.5"
                                    y="364"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 364)"
                                    fill="black"
                                />
                                <rect
                                    x="169.5"
                                    y="312"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 312)"
                                    fill="black"
                                />
                                <rect
                                    x="169.5"
                                    y="260"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 260)"
                                    fill="black"
                                />
                                <rect
                                    x="169.5"
                                    y="208"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 169.5 208)"
                                    fill="black"
                                />
                                <rect
                                    x="195.5"
                                    y="156"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 195.5 156)"
                                    fill="black"
                                />
                                <rect
                                    x="247.5"
                                    y="104"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 247.5 104)"
                                    fill="black"
                                />
                                <rect
                                    x="273.5"
                                    y="104"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 273.5 104)"
                                    fill="black"
                                />
                                <rect
                                    x="299.5"
                                    y="52"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 299.5 52)"
                                    fill="black"
                                />
                                <rect
                                    x="351.5"
                                    y="52"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 351.5 52)"
                                    fill="black"
                                />
                                <rect
                                    x="403.5"
                                    y="52"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 403.5 52)"
                                    fill="black"
                                />
                                <rect
                                    x="455.5"
                                    y="52"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 455.5 52)"
                                    fill="black"
                                />
                                <rect
                                    x="507.5"
                                    y="52"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 507.5 52)"
                                    fill="black"
                                />
                                <rect
                                    x="559.5"
                                    y="104"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 559.5 104)"
                                    fill="black"
                                />
                                <rect
                                    x="585.5"
                                    y="130"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 585.5 130)"
                                    fill="black"
                                />
                                <rect
                                    x="611.5"
                                    y="156"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 611.5 156)"
                                    fill="black"
                                />
                                <rect
                                    x="637.5"
                                    y="208"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 637.5 208)"
                                    fill="black"
                                />
                                <rect
                                    x="637.5"
                                    y="260"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 637.5 260)"
                                    fill="black"
                                />
                                <rect
                                    x="585.5"
                                    y="286"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 585.5 286)"
                                    fill="black"
                                />
                                <rect
                                    x="637.5"
                                    y="286"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 637.5 286)"
                                    fill="black"
                                />
                                <rect
                                    x="689.5"
                                    y="286"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 689.5 286)"
                                    fill="black"
                                />
                                <rect
                                    x="741.5"
                                    y="312"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 741.5 312)"
                                    fill="black"
                                />
                                <rect
                                    x="767.5"
                                    y="338"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 767.5 338)"
                                    fill="black"
                                />
                                <rect
                                    x="741.5"
                                    y="390"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 741.5 390)"
                                    fill="black"
                                />
                                <rect
                                    x="689.5"
                                    y="416"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 689.5 416)"
                                    fill="black"
                                />
                                <rect
                                    x="637.5"
                                    y="416"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 637.5 416)"
                                    fill="black"
                                />
                                <rect
                                    x="585.5"
                                    y="416"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 585.5 416)"
                                    fill="black"
                                />
                                <rect
                                    x="585.5"
                                    y="442"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 585.5 442)"
                                    fill="black"
                                />
                                <rect
                                    x="637.5"
                                    y="468"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 637.5 468)"
                                    fill="black"
                                />
                                <rect
                                    x="689.5"
                                    y="520"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 689.5 520)"
                                    fill="black"
                                />
                                <rect
                                    x="741.5"
                                    y="572"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 741.5 572)"
                                    fill="black"
                                />
                                <rect
                                    x="741.5"
                                    y="624"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 741.5 624)"
                                    fill="black"
                                />
                                <rect
                                    x="741.5"
                                    y="676"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 741.5 676)"
                                    fill="black"
                                />
                                <rect
                                    x="741.5"
                                    y="728"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 741.5 728)"
                                    fill="black"
                                />
                                <rect
                                    x="689.5"
                                    y="780"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 689.5 780)"
                                    fill="black"
                                />
                                <rect
                                    x="533.5"
                                    y="416"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 533.5 416)"
                                    fill="black"
                                />
                                <rect
                                    x="481.5"
                                    y="364"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 481.5 364)"
                                    fill="black"
                                />
                                <rect
                                    x="405.5"
                                    y="260"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 405.5 260)"
                                    fill="black"
                                />
                                <rect
                                    x="379.5"
                                    y="260"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 379.5 260)"
                                    fill="black"
                                />
                                <rect
                                    x="379.5"
                                    y="234"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 379.5 234)"
                                    fill="black"
                                />
                                <rect
                                    x="405.5"
                                    y="234"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 405.5 234)"
                                    fill="black"
                                />
                                <path d="M431.5 234H405.5V208H431.5V234Z" fill="black" />
                                <rect
                                    x="221.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 221.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="273.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 273.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="325.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 325.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="377.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 377.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="429.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 429.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="481.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 481.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="533.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 533.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="585.5"
                                    y="833"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 585.5 833)"
                                    fill="black"
                                />
                                <rect
                                    x="637.5"
                                    y="806"
                                    width="52"
                                    height="52"
                                    transform="rotate(-90 637.5 806)"
                                    fill="black"
                                />
                            </svg>
                        </div>
                    </div>
                    <Link className="retake__quiz" to={`/`}><button>RETAKE QUIZ</button></Link>
                </div>
                <Form className="profile__form">
                    <div className="form__group">
                        <label className="form__label" htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder={currentUser?.name} />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="gender">Gender</label>
                        <select id="gender" name="gender">
                            <option value="">Select gender</option>
                            <option value="man">Man</option>
                            <option value="woman">Woman</option>
                            <option value="non-binary">Non-binary</option>
                        </select>
                    </div>
                    <div className="form__group form__group--descrip">
                        <label className="form__label" htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder={currentUser?.description} />
                        <p>Max. 50 words</p>
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="dateOfBirth">Date of birth</label>
                        <input type="date" id="dateOfBirth" name="dateOfBirth" placeholder={currentUser?.dateOfBirth} />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="nationality">Nationality</label>
                        <input type="text" id="nationality" name="nationality" placeholder={currentUser?.nationality} />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder={currentUser?.email} />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <Link className="save__profile" to={`/`}><button type="button">SAVE CHANGES</button></Link>
                </Form>
            </div>
        </>
    )
}

export default Settings;