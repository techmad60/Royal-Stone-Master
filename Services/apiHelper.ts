import { toast } from "react-toastify";

let accessToken: string | null = null; // Store token in memory


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log(API_URL)

// Function to refresh access token
async function refreshAccessToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // Ensures cookies are sent
  });

  if (!res.ok) {
    toast.error("Session expired, please log in again.");
  }

  const data = await res.json();
  accessToken = data.accessToken; // Store in memory
  return accessToken;
}

// Wrapper for API calls
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let token = accessToken;

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  // If token expired, try refreshing it
  if (res.status === 401) {
    try {
      token = await refreshAccessToken();
      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    } catch {
      throw new Error("Session expired, please log in again.");
    }
  }

  return res.json();
}
