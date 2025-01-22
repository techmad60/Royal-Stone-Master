import { useRouter } from "next/navigation";
export async function makeInvestment(productID: string, slot: number, router?: ReturnType<typeof useRouter>) {
  const endpoint = "https://api-royal-stone.softwebdigital.com/api/investment";

  try {
    // Retrieve the accessToken from localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      if (router) {
        router.push("/auth/login"); // Redirect to login if router is provided
      } else {
        console.error("Router not provided for redirection.");
      }
      return; // Exit early if no token is found
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
      body: JSON.stringify({ productID, slot }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to make investment");
    }

    const data = await response.json();
    return data; // Return the entire response object
  } catch (error) {
    console.error("Investment error:", error);
    throw error;
  }
}
