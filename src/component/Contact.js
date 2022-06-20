import React, { useState } from "react";
import "../css/Contact.css";
import { gql, useMutation } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation ($name: String!, $email: String!, $message: String!) {
    sendMessage(name: $name, email: $email, message: $message) {
      email
      name
      message
    }
  }
`;

export default function Contact({ showContact, setShowContact }) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [mutateFunction, { data, loading, error }] = useMutation(SEND_MESSAGE);

  function Footer() {
    return (
      <div id="footer">
        <span id="email"> Need more info? hello@newzera.com</span>
        <span id="socialMediaLinks">
          <img
            alt="Facebook"
            className="socialMediaIcons"
            src={require("../assets/FB-icon-black@2x.png")}
          />
          <img
            alt="Linkedin"
            className="socialMediaIcons"
            src={require("../assets/linkedin-icon-black@2x.png")}
          />
          <img
            alt="Twitter"
            className="socialMediaIcons"
            src={require("../assets/Twitter-icon-black@2x.png")}
          />
        </span>
      </div>
    );
  }
  function Form() {
    return (
      <form
        id="contactForm"
        onSubmit={() => {
          mutateFunction({
            variables: {
              name: contact.name,
              email: contact.email,
              message: contact.message,
            },
          });
        }}
      >
        <div className="formList">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            id="Name"
            placeholder="Enter your name here"
            value={contact.name}
            onChange={(text) => {
              setContact((details) => ({
                ...details,
                name: text.target.value,
              }));
            }}
          />
        </div>
        <div className="formList">
          <label>E-mail</label>
          <input
            type="email"
            name="Email"
            id="Email"
            placeholder="Enter your e-mail address here"
            value={contact.email}
            onChange={(text) => {
              setContact((details) => ({
                ...details,
                email: text.target.value,
              }));
            }}
          />
        </div>
        <div className="formList">
          <label>Message</label>
          <input
            type="text"
            name="Name"
            id="Name"
            placeholder="Wanna share something with us?"
            value={contact.message}
            onChange={(text) => {
              setContact((details) => ({
                ...details,
                message: text.target.value,
              }));
            }}
          />
        </div>
        <div id="submitButtonContainer">
          <button type="submit" id="submitButton" style={{ cursor: "pointer" }}>
            Submit
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      id="contact"
      style={showContact === false ? { display: "none" } : null}
    >
      <button id="closeButton" onClick={() => setShowContact(false)}>
        X
      </button>
      <p id="title">Contact</p>
      <p id="description">Lorem Ipsum is simply dummy text of the printing</p>
      <Form />
      <Footer />
    </div>
  );
}
