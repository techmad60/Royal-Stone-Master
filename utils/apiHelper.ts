import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to get accessToken from localStorage
function getAccessToken() {
  return localStorage.getItem("accessToken");
}

// Function to get refreshToken from localStorage
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

// Function to handle session expiration (clears storage and redirects to login)
function handleSessionExpired() {
  toast.error("Session expired, please log in again.");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/auth/login"; // Redirect to login
}

// Function to refresh access token
async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    handleSessionExpired();
    throw new Error("No refresh token available");
  }

  try {
    const res = await fetch(`${API_URL}/auth/access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }), // Send refresh token in body
    });

    if (!res.ok) {
      handleSessionExpired();
      throw new Error("Refresh token expired");
    }

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken); // Save new token
    return data.accessToken;
  } catch (error) {
    handleSessionExpired();
    throw new Error("Session refresh failed");
  }
}

// Generic API Fetch Function
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  console.log("apiFetch called with:", endpoint, options); // Debugging log
  let token = getAccessToken();

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // If token expired, refresh and retry request
  if (res.status === 401) {
    try {
      token = await refreshAccessToken(); // Get new token
      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    } catch {
      throw new Error("Session expired, please log in again.");
    }
  }

  return res;
}
