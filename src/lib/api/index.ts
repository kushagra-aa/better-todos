export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Browser should use relative path
    return "";
  }
  // Server should use absolute URL
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const formDataToJson = (formData: FormData) => {
  return Object.fromEntries(formData.entries());
};

export const makeAPICall = (endpoint: string, formData: FormData) => {
  const jsonBody = formDataToJson(formData);
  const url = `${getBaseUrl()}${endpoint}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(jsonBody),
  });
};
