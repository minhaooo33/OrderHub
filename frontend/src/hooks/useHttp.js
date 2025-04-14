import { useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendRequest({
    url,
    method = "GET",
    body = null,
    headers = {},
  }) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    sendRequest,
    isLoading,
    error,
  };
}

export default useHttp;
