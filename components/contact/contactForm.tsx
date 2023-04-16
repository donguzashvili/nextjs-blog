import { FormEventHandler, useEffect, useState } from "react";
import classes from "./contactForm.module.css";
import Notification from "../UI/notification";

async function sendContactData(contactDetails: { email: string; name: string; message: string }) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactDetails),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Something went wrong!");
}

function ContactForm() {
  const [enteredData, setEnteredData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [requestStatus, setRequestStatus] = useState<"pending" | "success" | "error" | undefined>(undefined);
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(undefined);
        setRequestError(undefined);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  const sendMessageHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData(enteredData);
      setRequestStatus("success");
      setEnteredData({
        email: "",
        name: "",
        message: "",
      });
    } catch (err: any) {
      setRequestError(err.message);
      setRequestStatus("error");
    }
  };

  let notificationData;

  if (requestStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  } else if (requestStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  } else if (requestStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: requestError || "Something went wrong!",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can i help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required value={enteredData.email} onChange={(e) => setEnteredData({ ...enteredData, email: e.target.value })} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required value={enteredData.name} onChange={(e) => setEnteredData({ ...enteredData, name: e.target.value })} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea required id="message" rows={5} value={enteredData.message} onChange={(e) => setEnteredData({ ...enteredData, message: e.target.value })}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && <Notification status={notificationData.status} message={notificationData.message} title={notificationData.title} />}
    </section>
  );
}

export default ContactForm;
