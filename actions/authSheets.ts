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
interface payload {
  name: string;
  email: string;
  subject: string;
  message: string;
}
export async function addRow(payload: payload) {
  const accessToken = await getGoogleSheetsAccessToken();
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
              payload.name,
              payload.email,
              payload.subject,
              payload.message,
              new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
              new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
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
