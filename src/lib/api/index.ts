export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Browser should use relative path
    return "";
  }
  // Server should use absolute URL
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export function objectToFormData(obj: Record<string, string>): FormData {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

export const formDataToJson = (formData: FormData) => {
  return Object.fromEntries(formData.entries());
};

export const makeAPIPostCall = (endpoint: string, formData: FormData) => {
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
export const makeAPIPatchCall = (endpoint: string, formData: FormData) => {
  const jsonBody = formDataToJson(formData);
  const url = `${getBaseUrl()}${endpoint}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(jsonBody),
  });
};
export const makeAPIGetCall = (endpoint: string) => {
  const url = `${getBaseUrl()}${endpoint}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
export const makeAPIDeleteCall = (endpoint: string) => {
  const url = `${getBaseUrl()}${endpoint}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
