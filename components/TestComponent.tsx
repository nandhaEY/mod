"use client";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useEffect } from "react";

const TestComponent = () => {
  const { data: session } = useSession();
  console.log("session:", session);
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      console.log(res);
      if (!session) {
        if (res && res.cylogin) {
          signIn(res.cylogin.id);
        }
      }
    };
    setAuthProviders();
  }, []);
  return (
    <div>
      <h1>TEST COMPONENT</h1>
    </div>
  );
};

export default TestComponent;
