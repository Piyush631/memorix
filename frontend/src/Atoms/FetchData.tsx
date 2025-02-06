// utils/fetchData.ts

import axios from "axios";

import { toast } from "react-toastify";



export const FetchData = async (
  type: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage!");
      return;
    }

    const url =
      type === "all"
      ? "http://localhost:3000/api/v1/content"
      : `http://localhost:3000/api/v1/refresh?type=${type}`;

    // Replacing fetch with axios for API request
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      console.error("Failed to fetch content. Response data:", response.data);
      throw new Error(`Failed to fetch content: ${response.data.message}`);
    }

    const data = response.data;
    setContents(data.content); // Set the fetched content
    // console.log(data.content);
  } catch (error: any) {
    console.error("Error fetching content:", error.message);
    if (error.response?.data?.message?.includes("invalid token")) {
      toast.error("Session expired. Please login again.");
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/signup");
      }, 2000); // Redirect after 2 seconds
    }
    
  }
};