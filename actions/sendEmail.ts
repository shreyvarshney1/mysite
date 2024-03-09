"use client";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage, validateEmail } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

// const token = process.env.PIPEDREAM_API_KEY;

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("email");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateEmail(senderEmail)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }
  console.log(formData);
  const response = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }
  try{
  fetch(`https://eopj2alhn8fc6au.m.pipedream.net`, {
            method: 'POST',
            body: JSON.stringify(response),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
      } catch(error: unknown) {
          return {
            error: getErrorMessage(error),
          };
      }
  return {
    "data": "Email sent successfully!",
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
