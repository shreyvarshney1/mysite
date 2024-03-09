"use server";

import jwt from "jsonwebtoken";
import { envVariables } from "./envVariables";
import { validateString, getErrorMessage, validateEmail } from "@/lib/utils";

async function getGoogleSheetsAccessToken() {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const jwtToken = jwt.sign(
    {
      iss: envVariables.GOOGLE_SHEETS_SERVICE_ACCOUNT,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://accounts.google.com/o/oauth2/token",
      exp,
      iat,
    },
    envVariables.GOOGLE_SHEETS_PRIVATE_KEY,
    { algorithm: "RS256" }
  );
  const { access_token } = await fetch(
    "https://accounts.google.com/o/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwtToken,
      }),
    }
  ).then((response) => response.json());
  return access_token;
}
export async function addRow(formData: FormData) {
  const accessToken = await getGoogleSheetsAccessToken();
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
  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${envVariables.GOOGLE_SHEETS_SUBSCRIBERS_ID}/values/${envVariables.GOOGLE_SHEETS_SUBSCRIBERS_PAGE}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          "range": envVariables.GOOGLE_SHEETS_SUBSCRIBERS_PAGE,
          "majorDimension": "ROWS",
          "values": [
            // Row 1
            [
              // Column 1
              formData.get("name"),

              // Column 2
              formData.get("email"),

              // Column 3
              formData.get("subject"),

              // Column 4
              formData.get("message"),

              // Column 5
              new Date().toISOString(),
            ],
          ],
        }),
      }
    );
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
  return {
    data: "",
  };
}
