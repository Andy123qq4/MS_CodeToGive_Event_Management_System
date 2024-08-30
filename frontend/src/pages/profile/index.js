import Navbar from "@/components/clients/ClientNav";
import styles from "@/components/css/Client_Volunteer_Welcome.module.css";
import AchievementsSection from "@/components/profile/Achievement";
import React, { useState } from "react";
import Image from "next/image";

import { Person, History, Star, Lock } from "@mui/icons-material";

const ProfilePage = ({ username }) => {
  const [tab, setTab] = useState("profileSection"); // profileSection | pastEvents | achievements | lockedAchievements

  return (
    <>
      <Navbar />
      <WelcomeAndBadges username={username} />
      <div className="flex flex-row ">
        <ProfileTabs tab={tab} setTab={setTab} />
        {tab == "profileSection" && <ProfileSection />}
        {tab == "achievements" && <AchievementsSection />}
      </div>
    </>
  );
};

const WelcomeAndBadges = ({ username = "Furgy" }) => {
  return (
    <div className={styles["welcome-back-container"]}>
      <h2 className={styles["welcome-back-title"]}>
        Welcome Back, {username}!
      </h2>
      <p className={styles["welcome-back-text"]}>
        Here's a collection of your featured badges! Join more events for more!
      </p>
      <div className="badge-container">
        <Image
          src="/images/Badges1.png"
          alt="My Image"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};

const ProfileTabs = ({ tab, setTab }) => {
  return (
    <div>
      <div
        style={tab == "profileSection" ? { color: "#c22c21" } : {}}
        className="m-16 cursor-pointer"
        onClick={() => setTab("profileSection")}
      >
        <Person />
        <span className="ml-3">Profile Section</span>
      </div>
      <div
        style={tab == "pastEvents" ? { color: "#c22c21" } : {}}
        className="m-16 cursor-pointer"
        onClick={() => setTab("pastEvents")}
      >
        <History />
        <span className="ml-3">Past Events</span>
      </div>
      <div
        style={tab == "achievements" ? { color: "#c22c21" } : {}}
        className="m-16 cursor-pointer"
        onClick={() => setTab("achievements")}
      >
        <Star />
        <span className="ml-3">Achievements</span>
      </div>
      <div
        style={tab == "lockedAchievements" ? { color: "#c22c21" } : {}}
        className="m-16 cursor-pointer"
        onClick={() => setTab("lockedAchievements")}
      >
        <Lock />
        <span className="ml-3 whitespace-nowrap">Locked Achievements</span>
      </div>
    </div>
  );
};

const ProfileSection = () => {
  return (
    <div className="flex flex-col items-center flex-1">
      <h3 className="text-xl font-bold p-8">Profile Section</h3>
      <form className="flex flex-row flex-wrap justify-between w-3/5">
        <div
          style={{ width: "45%" }}
          className="flex flex-col justify-center mb-8 mr-4"
        >
          <h4>First Name</h4>
          <input
            style={{
              border: "1px solid #aaa",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px",
              height: "40px",
            }}
            name="firstName"
          />
        </div>
        <div
          style={{ width: "45%" }}
          className="flex flex-col justify-center mb-8 ml-4"
        >
          <h4>Last Name</h4>
          <input
            style={{
              border: "1px solid #aaa",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px",
              height: "40px",
            }}
            name="lastName"
          />
        </div>
        <div
          style={{ width: "45%" }}
          className="flex flex-col justify-center mb-8 mr-4"
        >
          <h4>Contact Number</h4>
          <input
            style={{
              border: "1px solid #aaa",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px",
              height: "40px",
            }}
            name="contactNumber"
          />
        </div>
        <div
          style={{ width: "45%" }}
          className="flex flex-col justify-center mb-8 ml-4"
        >
          <h4>Gender</h4>
          <select
            style={{
              border: "1px solid #aaa",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px",
              height: "40px",
            }}
            name="gender"
            defaultValue="default"
          >
            <option value="default" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>
        </div>
        <div
          style={{ width: "45%" }}
          className="flex flex-col justify-center mb-8 mr-4"
        >
          <h4>Email</h4>
          <input
            style={{
              border: "1px solid #aaa",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px",
              height: "40px",
            }}
            name="email"
          />
        </div>
        <div
          style={{ width: "45%" }}
          className="flex flex-col justify-center mb-8 ml-4"
        >
          <h4>Ethinicity</h4>
          <input
            style={{
              border: "1px solid #aaa",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px",
              height: "40px",
            }}
            name="ethinicity"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 p-4 rounded-xl mb-8"
        >
          Update information
        </button>
      </form>
    </div>
  );
};
export default ProfilePage;
