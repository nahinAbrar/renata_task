// src/utils/useAuth.js
"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [auth, setAuth] = useState({ username: null, role: null, realRole: null });

  useEffect(() => {
    const realRole = sessionStorage.getItem("realRole");
    const role     = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username");
    setAuth({ username, role, realRole });
  }, []);

  return auth;
}
