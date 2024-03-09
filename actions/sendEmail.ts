"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage, validateEmail } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const token = process.env.PIPEDREAM_API_KEY;

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("name");
  const senderEmail = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  if (!validateEmail(senderEmail)) {
    return {
      error: "Invalid Email Address",
    };
  }
  if (!validateString(message, 5000) && !validateString(name, 500) && !validateString(subject, 500)){
    return {
      error: "Invalid Input",
    };
  }
  const response = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };
  try {
    fetch(`https://${token}.m.pipedream.net`, {
      method: "POST",
      body: JSON.stringify(response),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
  return {
    data: "Email sent successfully!",
  };
  // let data;
  // try {
  //   data = await resend.emails.send({
  //     from: "Contact Form <onboarding@resend.dev>",
  //     to: "bytegrad@gmail.com",
  //     subject: "Message from contact form",
  //     reply_to: senderEmail,
  // react: React.createElement(ContactFormEmail, {
  //   message: message,
  //   senderEmail: senderEmail,
  // }),
  //   });
  // } catch (error: unknown) {
  //   return {
  //     error: getErrorMessage(error),
  //   };
  // }

  // return {
  //   data,
  // };
};
