// src/utils/useAuth.js
"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState({ username: null, role: null });

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username"); // set this on login if you haven’t already
    setUser({ username, role });
  }, []);

  return user;
}
