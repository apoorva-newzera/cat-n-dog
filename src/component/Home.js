import React, { useState, useEffect } from "react";
import "../css/Home.css";
import Contact from "../component/Contact";

import { useQuery, gql } from "@apollo/client";
const GET_DATA = gql`
  query {
    getData {
      heading
      subheading
    }
  }
`;
const imageSliderImages = [
  require("../assets/sliderImg22x.png"),
  require("../assets/sliderImg12x.png"),
];

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const [imageNumber, setImageNumber] = useState(0);
  const [headingText, setHeadingText] = useState("Heading Lorem Ipsum .");
  const [subheadingText, setSubheadingText] = useState(
    "Subheading Lorem Ipsum has been the industry's standard dummy text eversince the 1500s, when an unknown printer took a galley of typeand scrambled it to make a type specimen book."
  );

  useEffect(() => {
    const imageSliderInterval = setInterval(() => {
      setImageNumber(
        (imageNumber) => (imageNumber + 1) % imageSliderImages.length
      );
    }, 2500);
    return () => {
      clearInterval(imageSliderInterval);
    };
  }, []);

  function WebsiteInformation() {
    const { loading, error, data } = useQuery(GET_DATA);
    //if (loading) return <p>Loading...</p>;
    //if (error) return <p>Error :</p>;
    if (data) {
      setHeadingText(data.getData.heading);
      setSubheadingText(data.getData.subheading);
    }
    return (
      <div id="websiteInformation">
        <div id="heading">{headingText}</div>
        <div id="subHeading">{subheadingText}</div>
        <div id="installLinkContainer">
          <img
            alt="AppStoreBadge"
            height="45px"
            className="appLinksAppStore"
            src={require("../assets/AppStoreBadge.png")}
          />
          <img
            alt="GooglePlayBadge"
            className="appLinksPlayStore"
            src={require("../assets/google-play-badge.png")}
          />
        </div>
      </div>
    );
  }
  function Header() {
    return (
      <header>
        <div id="headerInfo">
          <img
            src={require("../assets/header_logo2x.png")}
            alt="logo"
            id="logo"
          />
        </div>
        <nav id="navBar">
          <button className="navLinks">About</button>
          <button className="navLinks">Blog</button>
          <button className="navLinks">Careers</button>
          <button className="navLinks" onClick={() => setShowContact(true)}>
            Contact
          </button>
        </nav>
      </header>
    );
  }

  return (
    <div>
      <Contact showContact={showContact} setShowContact={setShowContact} />
      <div id="home" style={showContact ? { filter: "brightness(0.4)" } : null}>
        <Header />
        <section id="webpage">
          <article id="websiteInformationContainer">
            <WebsiteInformation />
          </article>
          <article
            id="imageSlider"
            style={{
              backgroundImage: `url(${imageSliderImages[imageNumber]})`,
            }}
          >
            <div id="imageInfoContainer">
              <div id="imageInfo">
                <div id="imageHeading">Type Text</div>
                <div id="imageSubHeading">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
                <div id="imageSliderDotsContainer">
                {
                  imageSliderImages.map((item,idx) => (
                    <p key={idx} className="imageSliderDots" style={idx === imageNumber ? {backgroundColor : '#ffe8df'} : null} onClick={() => setImageNumber(idx)} ></p>
                  ))
                }
                </div>
              </div>
              <div id="socialMediaIconsContainer">
                <img
                  alt="FacebookIcon"
                  className="socialMediaIcons"
                  src={require("../assets/FB-icon-black@2x.png")}
                />
                <img
                  alt="LinkedinIcon"
                  className="socialMediaIcons"
                  src={require("../assets/linkedin-icon-black@2x.png")}
                />
                <img
                  alt="TwitterIcon"
                  className="socialMediaIcons"
                  src={require("../assets/Twitter-icon-black@2x.png")}
                />
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
