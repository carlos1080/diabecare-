import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
