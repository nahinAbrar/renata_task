"use client";

import React from "react";
import { useCustomers } from "@/utils/useCustomers";
import { useFilters }   from "@/contexts/FilterContext";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel   from "@mui/material/InputLabel";
import Select       from "@mui/material/Select";
import MenuItem     from "@mui/material/MenuItem";
import Slider       from "@mui/material/Slider";
import Typography   from "@mui/material/Typography";

export default function FilterPanel() {
  const customers = useCustomers();
  const {
    division, setDivision,
    gender,   setGender,
    ageRange, setAgeRange,
    incomeRange, setIncomeRange
  } = useFilters();

  // derive divisions dynamically
  const divisions = React.useMemo(() => {
    const s = new Set(customers.map(c => c.division).filter(Boolean));
    return ["", ...Array.from(s)];
  }, [customers]);

  // derive income min/max from data
  const [minIncome, maxIncome] = React.useMemo(() => {
    if (!customers.length) return [0, 100000];
    const vals = customers.map(c => c.income);
    return [Math.min(...vals), Math.max(...vals)];
  }, [customers]);

  // ensure filter bounds respect data range
  React.useEffect(() => {
    setIncomeRange([minIncome, maxIncome]);
  }, [minIncome, maxIncome, setIncomeRange]);

  return (
    <Box
      sx={{
        p: 2,
        mb: 4,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        background: "#fafafa"
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Advanced Filters
      </Typography>

      <FormControl size="small" sx={{ mr: 2, minWidth: 150 }}>
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

      <FormControl size="small" sx={{ mr: 2, minWidth: 120 }}>
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

      <Box sx={{ display: "inline-block", width: 200, mr: 2 }}>
        <Typography variant="body2">Age Range</Typography>
        <Slider
          value={ageRange}
          onChange={(e, v) => setAgeRange(v)}
          valueLabelDisplay="auto"
          min={18}
          max={80}
        />
      </Box>

      <Box sx={{ display: "inline-block", width: 200 }}>
        <Typography variant="body2">Income Range</Typography>
        <Slider
          value={incomeRange}
          onChange={(e, v) => setIncomeRange(v)}
          valueLabelDisplay="auto"
          min={minIncome}
          max={maxIncome}
          valueLabelFormat={v => `$${(v/1000).toFixed(0)}k`}
        />
      </Box>
    </Box>
  );
}
