"use client"

import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [division, setDivision] = useState("");
  const [gender, setGender]     = useState("");
  const [ageRange, setAgeRange] = useState([18, 80]);

  return (
    <FilterContext.Provider
      value={{ division, setDivision, gender, setGender, ageRange, setAgeRange }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
