export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  return typeof value === "string" && value.length <= maxLength;
};

export const validateEmail = (value: unknown): value is string => {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return typeof value === "string" && emailRegex.test(value);
};


export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};