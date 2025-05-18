import { useEffect, useState } from "react";
import { loadCsvFromFile } from "./loadCsv";

export function useCustomers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadCsvFromFile("/data/task2.csv").then(raw => {
      setData(
        raw.map(r => ({
          id: r.ID,
          name: r["Customer Name"],
          division: r.Division,
          gender: r.Gender,
          married: r.MaritalStatus === "Married",
          age: Number(r.Age),
          income: Number(r.Income)
        }))
      );
    });
  }, []);
  return data;
}
