import { createContext, useContext, ReactNode } from "react";
import { useAdminMe, useAdminLogin, useAdminLogout, getAdminMeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface AuthContextType {
  user: ReturnType<typeof useAdminMe>["data"];
  isLoading: boolean;
  login: ReturnType<typeof useAdminLogin>;
  logout: ReturnType<typeof useAdminLogout>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useAdminMe({
    query: {
      retry: false,
      queryKey: getAdminMeQueryKey(),
    },
  });

  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const loginMutation = useAdminLogin({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminMeQueryKey() });
        setLocation("/dashboard");
      },
    },
  });

  const logoutMutation = useAdminLogout({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminMeQueryKey() });
        setLocation("/login");
      },
    },
  });

  return (
    <AuthContext.Provider value={{ user, isLoading, login: loginMutation, logout: logoutMutation }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
