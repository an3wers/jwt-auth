import { Box, Tabs, Text } from "@radix-ui/themes";
import { useState } from "react";
import AuthForm from "./AuthForm";

const AuthContainer = () => {
  const [isAuthMode, setIsAuthMode] = useState(true);

  const swithMode = (val) => {
    setIsAuthMode(() => {
      return val === "singin";
    });
  };

  return (
    <div>
      <Tabs.Root defaultValue='singin'>
        <Tabs.List>
          <Tabs.Trigger onClick={() => swithMode("singin")} value='singin'>
            Sign in
          </Tabs.Trigger>
          <Tabs.Trigger onClick={() => swithMode("create")} value='create'>
            Create account
          </Tabs.Trigger>
        </Tabs.List>

        <Box px='4' pt='3' pb='2'>
          <Tabs.Content value='singin'>
            <AuthForm isAuthMode={isAuthMode} />
          </Tabs.Content>

          <Tabs.Content value='create'>
            <AuthForm isAuthMode={isAuthMode} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
};

export default AuthContainer;
