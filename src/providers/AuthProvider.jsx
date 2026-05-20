"use client";

import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const session = authClient.useSession();

  return (
    <AuthContext.Provider
      value={{
        user: session.data?.user || null,
        session: session.data,
        loading: session.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);