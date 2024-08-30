import { Button, Paper, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Fragment, useState } from "react";
import Link from "next/link";
import Password from "./Password";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("client");
  const router = useRouter();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleUser = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email && !password && !userType) return;
    const userData = {
      usertype: userType,
      email: email,
      password: password,
    };

    console.log(userData);

    try {
      const response = await fetch("/api/users/sign-in", {
        // mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const user = await response.json();

        // Store the user data in localStorage or any preferred storage
        localStorage.setItem("user", JSON.stringify(user.data));

        // Redirect based on user type
        if (userType === "client") router.push("/client");
        else if (userType === "volunteer") router.push("/volunteer");
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <Paper elevation={4} className="md:w-4/5 lg:w-3/5 xl:w-2/5 rounded-lg">
        <div className="text-4xl mt-16 ml-12">Sign in</div>
        <form className="flex flex-col p-10 pt-4" onSubmit={handleSubmit}>
          <FormControl className="m-2">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              required={true}
              value={userType}
              onChange={handleUser}
            >
              <FormControlLabel
                value="client"
                control={<Radio color="secondary" size="medium" />}
                label="Client"
                className="mr-20"
              />
              <FormControlLabel
                value="volunteer"
                control={<Radio color="secondary" size="medium" />}
                label="Volunteer"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            id="email"
            label="Email"
            required={true}
            color="secondary"
            className="m-2"
            value={email}
            onChange={handleEmail}
          />
          <Password
            placeHolder="Password"
            value={password}
            onChange={handlePassword}
          />
          <div className="text-secondary font-bold p-2 cursor-pointer">
            Forget Password?
          </div>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disableElevation
            className="rounded-full m-4 font-bold mt-10 p-4"
            onSubmit={handleSubmit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
      <div className="flex justify-center mt-8">
        <div>No account yet?</div>
        <Link href="/register" className="text-secondary font-bold ml-4">
          Register now
        </Link>
      </div>
    </Fragment>
  );
}
