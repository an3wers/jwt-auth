/* eslint-disable react/prop-types */
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

const AuthForm = ({ isAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <Flex direction='column' gap='3' style={{ maxWidth: 400 }}>
          <Text>{isAuthMode ? "Sign in" : "Create account"}</Text>
          <TextField.Input size='2' type='email' placeholder='Email' />
          <TextField.Input size='2' type='password' placeholder='Password' />
          <Button size='2' type='submit' variant='soft'>
            Submit
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default AuthForm;
