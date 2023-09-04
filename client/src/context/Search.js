

import React, { useState, useContext, createContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState({
    keyword: '',
    result: [],
  });

  return (
    <SearchContext.Provider value={[searchState, setSearchState]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
