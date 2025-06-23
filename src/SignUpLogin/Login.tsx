import {
  Button,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconLock, IconMail, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import {
  errorNotification,
  successNotification,
} from "../Services/NotoficationService";
import { setJwt } from "../Slices/JwtSlice";
import { loginUser } from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const form = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res) => {
          successNotification(
            "Login Successful",
            "Redirecting to Home page..."
          );

          dispatch(setJwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({ ...decoded, email: decoded.sub }));
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          errorNotification("Login faliled", err.response.data.errrorMessage);
        });
    }
  };
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "bright-sun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>

        <TextInput
          value={data.email}
          name="email"
          error={formError.email}
          onChange={handleChange}
          leftSection={<IconMail style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your email"
          withAsterisk
        />
        <PasswordInput
          value={data.password}
          name="password"
          error={formError.password}
          onChange={handleChange}
          leftSection={
            <IconLock
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          label="Password"
          placeholder="Password"
          withAsterisk
        />

        <Button onClick={handleSubmit} loading={loading} variant="filled">
          Login
        </Button>
        <div className="mx-auto">
          Don't have an Account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            SignUp
          </span>
        </div>
        <div
          onClick={open}
          className="text-bright-sun-400 hover:underline cursor-pointer text-center"
        >
          Forget password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};
export default Login;
