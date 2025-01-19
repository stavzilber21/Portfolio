
//API requests to the server with a corresponding link for each request

const BASE_URL = "https://example.com/api";

//Fetch all packages from the server.
const fetchPackages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/packages`, {
        method: 'GET'
      });
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch packages:", error.message);
    throw error; 
  }
};

//Fetch available representatives for chat.
const fetchRepresentatives = async () => {
    try {
      const response = await fetch(`${BASE_URL}/representatives`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch representatives:", error.message);
      throw error;
    }
  };



//Fetch frequently asked questions (FAQs).
const fetchFAQs = async () => {
try {
    const response = await fetch(`${BASE_URL}/faqs`, {
    method: "GET",
    });
    if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
} catch (error) {
    console.error("Failed to fetch FAQs:", error.message);
    throw error;
}
};


//Fetch user details.
export const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch user details:", error.message);
      throw error;
    }
  };

  module.exports = {fetchPackages,fetchRepresentatives,fetchFAQs,fetchUserDetails}