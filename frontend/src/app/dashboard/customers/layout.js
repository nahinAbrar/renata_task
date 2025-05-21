import React from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export function CustomerFilters({ division, setDivision, gender, setGender, ageRange, setAgeRange }) {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center" }}>
      <FormControl variant="outlined" size="small">
        <InputLabel>Division</InputLabel>
        <Select
          value={division}
          onChange={e => setDivision(e.target.value)}
          label="Division"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Dhaka">Dhaka</MenuItem>
          <MenuItem value="Chittagong">Chittagong</MenuItem>

        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small">
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          onChange={e => setGender(e.target.value)}
          label="Gender"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ width: 200 }}>
        <Typography variant="body2">Age Range</Typography>
        <Slider
          value={ageRange}
          onChange={(e, newVal) => setAgeRange(newVal)}
          valueLabelDisplay="auto"
          min={18}
          max={80}
        />
      </Box>
    </Box>
  );
}
