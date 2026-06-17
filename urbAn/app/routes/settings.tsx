import { Link } from "react-router";
import { useState } from "react";

import { useUser } from "~/contexts/userContext";

const Settings = () => {
  const { currentUser } = useUser();

  const [primaryArchetypeId, setPrimaryArchetypeId] = useState();
  const [primaryArchetype, setPrimaryArchetype] = useState();
  const [userAge, setUserAge] = useState(0);

  const calculateAge = (dob) => {
    const dobFormatted = dob.toString().replaceAll("-", "");

    const year = Number(dob.substr(0, 4));
    const month = Number(dob.substr(4, 2)) - 1;
    const day = Number(dob.substr(6, 2));

    const today = new Date();

    let age = today.getFullYear() - year;

    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      age--;
    }

    setUserAge(age);
  };

  const removeCurrentUser = () => {
    localStorage.removeItem("currentUser");
  }

  return (
    <>
      <div className="settings">
        <header className="profile__header">
          <div className="settings__navigation">
            <Link to={`/profile`} className="settings__navigation--back">
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
          <h1 className="settings__title">Settings</h1>
        </header>
        <div className="settings__group">
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
            <div className="info__personal">
              <p className="personal__name">{currentUser?.name}</p>
              <Link to={`/editprofile`} className="settings__navigation--edit">
                <button className="personal__edit">
                  <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="24.3649" y="6.85881" width="0.891986" height="0.891986" transform="rotate(-136 24.3649 6.85881)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 18.59 1.2846)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 24.3209 4.33928)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 22.4623 6.26506)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 20.913 7.86663)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 10.6893 18.4565)" fill="black" />
                    <rect x="23.746" y="7.49944" width="0.891986" height="0.891986" transform="rotate(-136 23.746 7.49944)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 17.9708 1.92913)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 23.6796 3.7221)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 21.8207 5.64397)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 20.2714 7.24553)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 10.0477 17.8354)" fill="black" />
                    <rect x="23.1258" y="8.14397" width="0.891986" height="0.891986" transform="rotate(-136 23.1258 8.14397)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 17.3512 2.56975)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 23.0377 3.101)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 21.1791 5.02288)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 19.6298 6.63225)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 9.40612 17.2182)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 5.06847 21.7104)" fill="black" />
                    <rect x="22.506" y="8.7846" width="0.891986" height="0.891986" transform="rotate(-136 22.506 8.7846)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 16.7313 3.21038)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 22.3961 2.48381)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 20.5375 4.40569)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 18.9881 6.00725)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 8.76476 16.5971)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 5.05724 21.0776)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 4.41588 20.4565)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 4.42663 21.0854)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 3.80748 21.7299)" fill="black" />
                    <rect x="21.8866" y="9.42522" width="0.891986" height="0.891986" transform="rotate(-136 21.8866 9.42522)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 16.1114 3.851)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 21.7539 1.85881)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 19.8959 3.7846)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 18.3465 5.39006)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 8.12291 15.9799)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 3.78527 20.4682)" fill="black" />
                    <rect x="21.2662" y="10.0698" width="0.891986" height="0.891986" transform="rotate(-136 21.2662 10.0698)" fill="black" />
                    <rect x="19.3417" y="8.21038" width="0.891986" height="0.891986" transform="rotate(-136 19.3417 8.21038)" fill="black" />
                    <rect x="18.7001" y="7.58928" width="0.891986" height="0.891986" transform="rotate(-136 18.7001 7.58928)" fill="black" />
                    <rect x="18.0582" y="6.9721" width="0.891986" height="0.891986" transform="rotate(-136 18.0582 6.9721)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 15.4918 4.49553)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 21.1129 1.24163)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 19.254 3.16741)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 17.7049 4.76897)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 7.48107 15.3588)" fill="black" />
                    <rect x="20.6473" y="10.7104" width="0.891986" height="0.891986" transform="rotate(-136 20.6473 10.7104)" fill="black" />
                    <rect x="18.7223" y="8.851" width="0.891986" height="0.891986" transform="rotate(-136 18.7223 8.851)" fill="black" />
                    <rect x="18.0809" y="8.22991" width="0.891986" height="0.891986" transform="rotate(-136 18.0809 8.22991)" fill="black" />
                    <rect x="17.4391" y="7.61272" width="0.891986" height="0.891986" transform="rotate(-136 17.4391 7.61272)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 14.8727 5.13616)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 20.4718 0.620533)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 18.6127 2.54631)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 17.0631 4.15178)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(-0.694658 0.71934 0.71934 0.694658 6.83947 14.7377)" fill="black" />
                    <rect x="20.0275" y="11.351" width="0.891986" height="0.891986" transform="rotate(-136 20.0275 11.351)" fill="black" />
                    <rect x="18.1027" y="9.49553" width="0.891986" height="0.891986" transform="rotate(-136 18.1027 9.49553)" fill="black" />
                    <rect x="17.461" y="8.87444" width="0.891986" height="0.891986" transform="rotate(-136 17.461 8.87444)" fill="black" />
                    <rect x="16.8194" y="8.25335" width="0.891986" height="0.891986" transform="rotate(-136 16.8194 8.25335)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 14.253 5.77678)" fill="black" />
                    <rect x="19.4076" y="11.9955" width="0.891986" height="0.891986" transform="rotate(-136 19.4076 11.9955)" fill="black" />
                    <rect x="17.483" y="10.1401" width="0.891986" height="0.891986" transform="rotate(-136 17.483 10.1401)" fill="black" />
                    <rect x="16.8412" y="9.51506" width="0.891986" height="0.891986" transform="rotate(-136 16.8412 9.51506)" fill="black" />
                    <rect x="16.1996" y="8.89788" width="0.891986" height="0.891986" transform="rotate(-136 16.1996 8.89788)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 13.6332 6.41741)" fill="black" />
                    <rect x="18.7882" y="12.6362" width="0.891986" height="0.891986" transform="rotate(-136 18.7882 12.6362)" fill="black" />
                    <rect x="16.8631" y="10.7768" width="0.891986" height="0.891986" transform="rotate(-136 16.8631 10.7768)" fill="black" />
                    <rect x="16.2215" y="10.1596" width="0.891986" height="0.891986" transform="rotate(-136 16.2215 10.1596)" fill="black" />
                    <rect x="15.5799" y="9.5385" width="0.891986" height="0.891986" transform="rotate(-136 15.5799 9.5385)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 13.0129 7.05803)" fill="black" />
                    <rect x="18.1688" y="13.2768" width="0.891986" height="0.891986" transform="rotate(-136 18.1688 13.2768)" fill="black" />
                    <rect x="16.244" y="11.4213" width="0.891986" height="0.891986" transform="rotate(-136 16.244 11.4213)" fill="black" />
                    <rect x="15.6024" y="10.8002" width="0.891986" height="0.891986" transform="rotate(-136 15.6024 10.8002)" fill="black" />
                    <rect x="14.9606" y="10.183" width="0.891986" height="0.891986" transform="rotate(-136 14.9606 10.183)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 12.3942 7.70256)" fill="black" />
                    <rect x="17.5492" y="13.9174" width="0.891986" height="0.891986" transform="rotate(-136 17.5492 13.9174)" fill="black" />
                    <rect x="15.6244" y="12.0619" width="0.891986" height="0.891986" transform="rotate(-136 15.6244 12.0619)" fill="black" />
                    <rect x="14.9825" y="11.4408" width="0.891986" height="0.891986" transform="rotate(-136 14.9825 11.4408)" fill="black" />
                    <rect x="14.3409" y="10.8198" width="0.891986" height="0.891986" transform="rotate(-136 14.3409 10.8198)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 11.7743 8.3471)" fill="black" />
                    <rect x="16.9296" y="14.5619" width="0.891986" height="0.891986" transform="rotate(-136 16.9296 14.5619)" fill="black" />
                    <rect x="15.0045" y="12.7026" width="0.891986" height="0.891986" transform="rotate(-136 15.0045 12.7026)" fill="black" />
                    <rect x="14.3629" y="12.0815" width="0.891986" height="0.891986" transform="rotate(-136 14.3629 12.0815)" fill="black" />
                    <rect x="13.7213" y="11.4643" width="0.891986" height="0.891986" transform="rotate(-136 13.7213 11.4643)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 11.1547 8.98381)" fill="black" />
                    <rect x="16.3097" y="15.2026" width="0.891986" height="0.891986" transform="rotate(-136 16.3097 15.2026)" fill="black" />
                    <rect x="14.3846" y="13.3432" width="0.891986" height="0.891986" transform="rotate(-136 14.3846 13.3432)" fill="black" />
                    <rect x="13.743" y="12.726" width="0.891986" height="0.891986" transform="rotate(-136 13.743 12.726)" fill="black" />
                    <rect x="13.1014" y="12.1049" width="0.891986" height="0.891986" transform="rotate(-136 13.1014 12.1049)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 10.5348 9.62835)" fill="black" />
                    <rect x="15.6898" y="15.8432" width="0.891986" height="0.891986" transform="rotate(-136 15.6898 15.8432)" fill="black" />
                    <rect x="13.765" y="13.9877" width="0.891986" height="0.891986" transform="rotate(-136 13.765 13.9877)" fill="black" />
                    <rect x="13.1234" y="13.3666" width="0.891986" height="0.891986" transform="rotate(-136 13.1234 13.3666)" fill="black" />
                    <rect x="12.4818" y="12.7455" width="0.891986" height="0.891986" transform="rotate(-136 12.4818 12.7455)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 9.91491 10.269)" fill="black" />
                    <rect x="15.0707" y="16.4877" width="0.891986" height="0.891986" transform="rotate(-136 15.0707 16.4877)" fill="black" />
                    <rect x="13.1459" y="14.6244" width="0.891986" height="0.891986" transform="rotate(-136 13.1459 14.6244)" fill="black" />
                    <rect x="12.504" y="14.0073" width="0.891986" height="0.891986" transform="rotate(-136 12.504 14.0073)" fill="black" />
                    <rect x="11.8627" y="13.3862" width="0.891986" height="0.891986" transform="rotate(-136 11.8627 13.3862)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 9.29601 10.9096)" fill="black" />
                    <rect x="14.451" y="17.1283" width="0.891986" height="0.891986" transform="rotate(-136 14.451 17.1283)" fill="black" />
                    <rect x="12.526" y="15.269" width="0.891986" height="0.891986" transform="rotate(-136 12.526 15.269)" fill="black" />
                    <rect x="11.8844" y="14.6479" width="0.891986" height="0.891986" transform="rotate(-136 11.8844 14.6479)" fill="black" />
                    <rect x="11.2428" y="14.0307" width="0.891986" height="0.891986" transform="rotate(-136 11.2428 14.0307)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 8.67614 11.5502)" fill="black" />
                    <rect x="13.8312" y="17.769" width="0.891986" height="0.891986" transform="rotate(-136 13.8312 17.769)" fill="black" />
                    <rect x="11.9064" y="15.9135" width="0.891986" height="0.891986" transform="rotate(-136 11.9064 15.9135)" fill="black" />
                    <rect x="11.2648" y="15.2924" width="0.891986" height="0.891986" transform="rotate(-136 11.2648 15.2924)" fill="black" />
                    <rect x="10.6232" y="14.6713" width="0.891986" height="0.891986" transform="rotate(-136 10.6232 14.6713)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 8.05626 12.1948)" fill="black" />
                    <rect x="13.2115" y="18.4096" width="0.891986" height="0.891986" transform="rotate(-136 13.2115 18.4096)" fill="black" />
                    <rect x="11.2867" y="16.5541" width="0.891986" height="0.891986" transform="rotate(-136 11.2867 16.5541)" fill="black" />
                    <rect x="10.6451" y="15.933" width="0.891986" height="0.891986" transform="rotate(-136 10.6451 15.933)" fill="black" />
                    <rect x="10.0035" y="15.3158" width="0.891986" height="0.891986" transform="rotate(-136 10.0035 15.3158)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 7.43761 12.8315)" fill="black" />
                    <rect x="12.5926" y="19.0541" width="0.891986" height="0.891986" transform="rotate(-136 12.5926 19.0541)" fill="black" />
                    <rect x="10.6676" y="17.1948" width="0.891986" height="0.891986" transform="rotate(-136 10.6676 17.1948)" fill="black" />
                    <rect x="10.0257" y="16.5737" width="0.891986" height="0.891986" transform="rotate(-136 10.0257 16.5737)" fill="black" />
                    <rect x="9.38439" y="15.9565" width="0.891986" height="0.891986" transform="rotate(-136 9.38439 15.9565)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 6.81896 13.4721)" fill="black" />
                    <rect x="11.9728" y="19.6948" width="0.891986" height="0.891986" transform="rotate(-136 11.9728 19.6948)" fill="black" />
                    <rect x="10.0477" y="17.8354" width="0.891986" height="0.891986" transform="rotate(-136 10.0477 17.8354)" fill="black" />
                    <rect x="9.40612" y="17.2182" width="0.891986" height="0.891986" transform="rotate(-136 9.40612 17.2182)" fill="black" />
                    <rect x="8.76476" y="16.5971" width="0.891986" height="0.891986" transform="rotate(-136 8.76476 16.5971)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 6.19787 14.1166)" fill="black" />
                    <rect x="11.3529" y="20.3354" width="0.891986" height="0.891986" transform="rotate(-136 11.3529 20.3354)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 5.57799 14.7612)" fill="black" />
                    <rect x="10.734" y="20.9799" width="0.891986" height="0.891986" transform="rotate(-136 10.734 20.9799)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 4.95836 15.4018)" fill="black" />
                    <rect x="10.1134" y="21.6205" width="0.891986" height="0.891986" transform="rotate(-136 10.1134 21.6205)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 4.33873 16.0424)" fill="black" />
                    <rect x="9.49474" y="22.2612" width="0.891986" height="0.891986" transform="rotate(-136 9.49474 22.2612)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 3.71935 16.683)" fill="black" />
                    <rect x="8.23278" y="22.2846" width="0.891986" height="0.891986" transform="rotate(-136 8.23278 22.2846)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 3.74108 17.9487)" fill="black" />
                    <rect x="7.61315" y="22.9252" width="0.891986" height="0.891986" transform="rotate(-136 7.61315 22.9252)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 3.12145 18.5854)" fill="black" />
                    <rect x="6.35143" y="22.9487" width="0.891986" height="0.891986" transform="rotate(-136 6.35143 22.9487)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 3.14342 19.8471)" fill="black" />
                    <rect x="5.73253" y="23.5893" width="0.891986" height="0.891986" transform="rotate(-136 5.73253 23.5893)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 2.52428 20.4877)" fill="black" />
                    <rect width="0.891986" height="0.891986" transform="matrix(0.71934 0.694658 0.694658 -0.71934 2.54625 21.7533)" fill="black" />
                    <rect x="4.47106" y="23.6088" width="0.891986" height="0.891986" transform="rotate(-136 4.47106 23.6088)" fill="black" />
                    <rect x="3.2091" y="23.6323" width="0.891986" height="0.891986" transform="rotate(-136 3.2091 23.6323)" fill="black" />
                  </svg>
                  Edit Profile</button></Link>
            </div>
          </div>
          <h2 className="group__title">Personal information</h2>
          <div className="group__setting--bio">
            <div className="element__setting">
              <p>Gender</p>
              <p>{currentUser?.gender}</p>
            </div>
            <div className="element__setting">
              <p>Age</p>
              <p>{userAge}</p>
            </div>
            <div className="element__setting">
              <p>Nationality</p>
              <p>{currentUser?.nationality}</p>
            </div>
            <div className="element__setting">
              <p>Archetype</p>
              <p>{currentUser?.archetype}</p>
            </div>
          </div>
        </div>
        <div className="settings__group">
          <h2 className="group__title">Location</h2>
          <div className="group__setting">
            <label htmlFor="">Visibility</label>
            <label className="switch">
              <input className="switch visibility" type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="settings__group">
          <h2 className="group__title">Appearance</h2>
          <div className="group__setting">
            <label htmlFor="">Dark mode</label>
            <label className="switch">
              <input className="switch darkmode" type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="settings__group">
          <h2 className="group__title">Accessibility</h2>
          <div className="group__setting--access">
            <div>
              <label htmlFor="">Screen reader</label>
              <label className="switch">
                <input className="switch screenread" type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div>
              <label htmlFor="">High contrast</label>
              <label className="switch">
                <input className="switch contrast" type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="settings__links">
          <Link className="settings__log login" to={`/`}><button onClick={removeCurrentUser}>LOG OUT</button></Link>
          <Link className="settings__log delete" to={`/`}><button onClick={removeCurrentUser}>DELETE ACCOUNT</button></Link>
        </div>
        <p className="id">My id: {currentUser?.profile_id}</p>
      </div>
    </>
  )
}

export default Settings;