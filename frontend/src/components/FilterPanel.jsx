"use client";

import React from "react";
import { useFilters } from "@/contexts/FilterContext";
import { useAuth } from "@/utils/useAuth";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography
} from "@mui/material";

export default function FilterPanel() {
  const { division, setDivision, gender, setGender, ageRange, setAgeRange, incomeRange, setIncomeRange } = useFilters();
  const { role } = useAuth();

  // SalesReps can only filter by Division:
  const hideDetailed = role === "SalesRep";

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

      {/* Division always enabled */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Division</InputLabel>
        <Select
          label="Division"
          value={division}
          onChange={e => setDivision(e.target.value)}
        >
          {/* …your division list… */}
        </Select>
      </FormControl>

      {/* Hide gender & age & income for SalesReps */}
      {!hideDetailed && (
        <>
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

          <Typography variant="body2" gutterBottom>
            Age Range
          </Typography>
          <Slider
            value={ageRange}
            onChange={(e, v) => setAgeRange(v)}
            valueLabelDisplay="auto"
            min={18}
            max={80}
            sx={{ mb: 2, width: "50%" }}
          />

          <Typography variant="body2" gutterBottom>
            Income Range
          </Typography>
          <Slider
            value={incomeRange}
            onChange={(e, v) => setIncomeRange(v)}
            valueLabelDisplay="auto"
            min={0}
            max={200000}
            sx={{ mb: 2, width: "50%" }}
          />
        </>
      )}
    </Box>
  );
}
