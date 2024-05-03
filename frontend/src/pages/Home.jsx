import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from "../components/homepage/Hero";
import Banner from "../components/homepage/Banner";
import Earth from "../components/homepage/Earth";
import MarsSection from "../components/homepage/MarsSection";
import { ScrollToTop } from "../components/common/ScrollToTop";
const Home = () => {
  const [userFirstName, setUserFirstName] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserFirstName(userData.firstName);
    }

    if (!localStorage.getItem("authToken")) {
      window.location = "/";
    }
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Banner />
      <Earth />
      <MarsSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
