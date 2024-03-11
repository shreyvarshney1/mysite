import { getErrorMessage, validateEmail, validateString } from "@/lib/utils";

export const sendResponse = async (formData: FormData) => {
  const name = formData.get("name");
  const senderEmail = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  if (!validateEmail(senderEmail)) {
    return {
      error: "Invalid Email Address",
      status: 400
    };
  }
  if (validateString(name)) {
    return {
      error: "Invalid Name",
      status: 400
    };
  }
  if (validateString(subject)) {
    return {
      error: "Invalid Subject",
      status: 400
    };
  }
  if (
    validateString(message)
  ){
    return {
      error: "Invalid Input",
      status: 400
    };
  }
  try {
    const response = await fetch(
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
    return {
      error: null,
      success: true,
      ok: true,
      status: response.status
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
      status: 500
    };
  }
};
