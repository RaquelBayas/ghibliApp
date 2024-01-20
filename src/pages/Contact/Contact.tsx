import "./Contact.css";
import { useForm, ValidationError } from "@formspree/react";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import portfolio from "../../assets/portfolio.png";

function Contact() {
  const [state, handleSubmit] = useForm("xbjnlddr");
  if (state.succeeded) {
    return <div className="contact_container">
        <h1 className="title_contact">Thanks for your email!</h1>
        <div className="wrapper">
        <p>Connect with me:</p>
        <div className="btns_contact">
          <div className="icon">
            <a href="https://www.linkedin.com/in/raquelbayas/" target="_blank">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>

          <div className="icon">
            <a href="https://github.com/RaquelBayas" target="_blank">
              <img src={github} alt="Github" />
            </a>
          </div>

          <div className="icon" id="icon_portfolio">
            <a href="https://raquelbayas.netlify.app/" target="_blank">
              <img src={portfolio} alt="Portfolio" />
            </a>
          </div>
        </div>
      </div>
    </div>;
  }

  return (
    <div className="contact_container">
      <div className="contact_form">
        <h1 className="title_contact">Contact</h1>
        <form onSubmit={handleSubmit}>
          <input id="email" type="email" name="email" placeholder="Introduce your email..." />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <textarea id="message" name="message" placeholder="Introduce your message..."/>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </form>
      </div>
      <div className="wrapper">
        <p>Connect with me:</p>
        <div className="btns_contact">
          <div className="icon">
            <a href="https://www.linkedin.com/in/raquelbayas/" target="_blank">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>

          <div className="icon">
            <a href="https://github.com/RaquelBayas" target="_blank">
              <img src={github} alt="Github" />
            </a>
          </div>

          <div className="icon" id="icon_portfolio">
            <a href="https://raquelbayas.netlify.app/" target="_blank">
              <img src={portfolio} alt="Portfolio" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
