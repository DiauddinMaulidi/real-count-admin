"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";

export default function ForceLogout() {
  const { signOut } = useClerk();

  useEffect(() => {
    signOut({
      redirectUrl: "/en/signin",
    });
  }, [signOut]);

  return <p>Logging out...</p>;
}
