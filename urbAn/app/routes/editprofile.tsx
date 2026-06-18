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
                    <div className="form__group form__group--gender">
                        <label className="form__label" htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={currentUser?.gender}>
                            <option value="">- Pick one -</option>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                            <option value="non-binary">Non-Binary</option>
                        </select>
                    </div>
                    <div className="form__group form__group--descrip">
                        <label className="form__label" htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder={currentUser?.description} />
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
                                defaultValue={currentUser?.date_of_birth}
                            />
                            <svg className="date-input__icon" xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
                                <rect y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="2.22192" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="4.44385" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="6.66577" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="8.88745" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="11.1094" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="13.3313" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="15.5532" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="17.7751" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="19.9968" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="22.2188" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="24.4407" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="27.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="25.5508" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="23.3281" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="21.1055" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="18.8828" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="16.6602" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="14.4414" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="12.2188" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="7.77344" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="5.55078" width="2.22189" height="2.22189" fill="black" />
                                <rect x="25.8108" y="4.44141" width="2.22189" height="2.22189" fill="black" />
                                <rect x="23.5889" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="21.3669" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="19.1453" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="16.9233" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="14.7014" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="12.4795" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="10.2576" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="8.03564" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="5.81396" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="5.81396" width="2.22189" height="2.22189" fill="black" />
                                <rect x="19.9968" width="2.22189" height="2.22189" fill="black" />
                                <rect x="5.81396" y="4.44141" width="2.22189" height="2.22189" fill="black" />
                                <rect x="2.22192" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="4.44385" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="6.66577" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="8.88745" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="11.1094" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="13.3313" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="15.5532" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="17.7751" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="19.9968" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="22.2188" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="24.4407" y="9.99609" width="2.22189" height="2.22189" fill="black" />
                                <rect x="18.5527" y="16.3672" width="2.22189" height="2.22189" fill="black" />
                                <rect x="6.9248" y="16.3672" width="2.22189" height="2.22189" fill="black" />
                                <rect x="6.9248" y="22.2188" width="2.22189" height="2.22189" fill="black" />
                                <rect x="12.7388" y="22.2188" width="2.22189" height="2.22189" fill="black" />
                                <rect x="18.5527" y="22.2188" width="2.22189" height="2.22189" fill="black" />
                                <rect x="12.7388" y="16.3672" width="2.22189" height="2.22189" fill="black" />
                                <rect x="19.9968" y="4.44141" width="2.22189" height="2.22189" fill="black" />
                                <rect x="3.59204" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect x="2.22192" y="2.22266" width="2.22189" height="2.22189" fill="black" />
                                <rect y="4.44141" width="2.22189" height="2.22189" fill="black" />
                                <rect y="6.66406" width="2.22189" height="2.22189" fill="black" />
                                <rect y="8.88672" width="2.22189" height="2.22189" fill="black" />
                                <rect y="11.1094" width="2.22189" height="2.22189" fill="black" />
                                <rect y="13.332" width="2.22189" height="2.22189" fill="black" />
                                <rect y="15.5547" width="2.22189" height="2.22189" fill="black" />
                                <rect y="17.7734" width="2.22189" height="2.22189" fill="black" />
                                <rect y="19.9961" width="2.22189" height="2.22189" fill="black" />
                                <rect y="22.2188" width="2.22189" height="2.22189" fill="black" />
                                <rect y="24.4375" width="2.22189" height="2.22189" fill="black" />
                                <rect y="26.6641" width="2.22189" height="2.22189" fill="black" />
                            </svg>
                        </div>
                    </div>

                    <div className="form__group">
                        <label className="form__label" htmlFor="nationality">Nationality</label>
                        <input type="text" id="nationality" name="nationality" placeholder={currentUser?.nationality} />
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="john.doe@example.com" />
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