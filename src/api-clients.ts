import { ErrorResponse, RegisterData } from "./common/types/server-requests";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (testData: RegisterData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testData),
  });

  const responseBody: ErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};