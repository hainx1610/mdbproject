import React, { useState, useContext, createContext } from "react";

const SearchContextType = {
  queryWord: "",
  inputQuery: null,
};

const SearchContext = createContext(SearchContextType);

export function SearchProvider({ children }) {
  const [queryWord, setQueryWord] = useState("");
  let inputQuery = (newQuery) => {
    setQueryWord(newQuery);
  };

  let value = { queryWord, inputQuery };
  console.log(value);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
