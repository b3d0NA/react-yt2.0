import React, { useCallback, useContext, useEffect, useState } from "react";
import youtube from "./youtube";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("sunnah");
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const fetchVideosForHome = useCallback(async () => {
    setIsLoading(true);
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 50,
        q: searchTerm,
        key: "AIzaSyCjhZ5-QEBerGFttIJqKl7cS15u3h00bmE",
      },
    });
    setIsLoading(false);
    setVideos(response.data.items);
  }, [searchTerm]);

  useEffect(() => {
    fetchVideosForHome();
  }, [searchTerm, fetchVideosForHome]);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        videos,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
