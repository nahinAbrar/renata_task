"use client";

import React from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { useFilters } from "@/contexts/FilterContext";
import { useCustomers } from "@/utils/useCustomers";

export default function FilterPanel() {
  const { division, setDivision, gender, setGender, ageRange, setAgeRange } = useFilters();
  const customers = useCustomers();

  // Derive unique divisions from the customer list
  const divisions = React.useMemo(() => {
    const set = new Set(customers.map(c => c.division).filter(Boolean));
    return ["", ...Array.from(set)];
  }, [customers]);

  return (
    <Box sx={{ p: 2 }}>
      {/* Division selector */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Division</InputLabel>
        <Select
          label="Division"
          value={division}
          onChange={e => setDivision(e.target.value)}
        >
          {divisions.map(d => (
            <MenuItem key={d} value={d}>
              {d || "All Divisions"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Gender selector */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          label="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
        </Select>
      </FormControl>

      {/* Age range slider */}
      <Typography variant="subtitle2" gutterBottom>
        Age Range
      </Typography>
      <Slider
        value={ageRange}
        onChange={(e, newVal) => setAgeRange(newVal)}
        valueLabelDisplay="auto"
        min={18}
        max={80}
      />
    </Box>
  );
}
