"use client";

import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
});

export default function AuthProvider({ children }) {
  const session = authClient.useSession();

  return (
    <AuthContext.Provider
      value={{
        user: session?.data?.user || null,
        session: session?.data || null,
        loading: session?.isPending ?? true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};