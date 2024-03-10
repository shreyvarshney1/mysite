import { getErrorMessage, validateEmail, validateString } from "@/lib/utils";

export const sendResponse = async (formData: FormData) => {
  const name = formData.get("name");
  const senderEmail = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  if (!validateEmail(senderEmail)) {
    return {
      error: "Invalid Email Address",
    };
  }
  if (
    !validateString(message, 500) &&
    !validateString(name, 20) &&
    !validateString(subject, 50)
  ) {
    return {
      error: "Invalid Input OR Input too long",
    };
  }
  try {
    const {statusText,status} = await fetch(
      "https://googlesheetsapi.shreyvarshney1.workers.dev/post",
      {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      }
    );
    console.log(statusText,status);
    return {statusText,status};
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
