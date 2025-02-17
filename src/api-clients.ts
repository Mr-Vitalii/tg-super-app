import { ErrorResponse } from "./common/types/auth";




const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: any): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register-telegram`, {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), 
  });

  const responseBody: ErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};