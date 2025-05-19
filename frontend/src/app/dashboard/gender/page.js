"use client";

import React from "react";
import { useCustomers } from "@/utils/useCustomers";
import { useFilters }   from "@/contexts/FilterContext";
import PieChart         from "@/components/PieChart";
import {
  Box,
  CircularProgress,
  Paper,
  Typography
} from "@mui/material";

export default function GenderSplitPage() {
  const customers = useCustomers();
  const { division, gender, ageRange } = useFilters();

  // 1) loading
  if (!customers.length) {
    return <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress/></Box>;
  }

  // 2) apply same filters
  const filtered = customers.filter(c =>
    (division ? c.division === division : true) &&
    (gender   ? c.gender   === gender   : true) &&
    c.age >= ageRange[0] &&
    c.age <= ageRange[1]
  );

  // 3) compute counts
  const counts = filtered.reduce(
    (acc, c) => {
      if (c.gender === "M") acc.M += 1;
      else if (c.gender === "F") acc.F += 1;
      return acc;
    },
    { M: 0, F: 0 }
  );

  const data = [
    { name: "Male",   value: counts.M },
    { name: "Female", value: counts.F },
  ];

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Gender Split
      </Typography>
      {counts.M + counts.F > 0 ? (
        <PieChart data={data} title="Gender Split" />
      ) : (
        <Typography>No data to display.</Typography>
      )}
    </Paper>
  );
}
