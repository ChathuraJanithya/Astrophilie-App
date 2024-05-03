import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authentication";
import { Controller, useForm } from "react-hook-form";
import { Typography } from "../components/common/Typography";
import { Input, Button } from "@nextui-org/react";
import { ScrollToTop } from "../components/common/ScrollToTop";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoading(true);
      setTimeout(() => {
        window.location = "/home";
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });

  const [checkError, setCheckError] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.result));
      window.location = "/home";
      reset();
    },
    onError: (error) => {
      setCheckError(error);
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    mutation.mutate({
      email: data.email,
      password: data.password,
    });

    setLoading(false);
  };

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Astrophile"];
  const toRotate2 = ["Get Start"];
  const period = 700;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
      tick2();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  });

  const tick2 = () => {
    let i = loopNum % toRotate2.length;
    let fullText = toRotate2[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText2(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
      setDelta(500);
    }
  };
  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
      setDelta(500);
    }
  };

  const handleScroll = () => {
    setIsLoginVisible(true);
    document.getElementById("login").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className={"banner grid grid-cols-1 gap-3 md:grid-cols-2  "}
        id="home"
      >
        <Container>
          <div className="flex flex-col items-center justify-center h-full">
            <div>
              <h1 className="text-5xl font-bold text-black">
                Hello <span className="text-primary"> Astrophile </span>
              </h1>
              <h2 className="text-2xl font-bold text-black">
                welcome to {text}
                <span className="cursor"></span>
              </h2>
            </div>
            <Button
              className="w-[240px] mt-4 self-start md:self-center text-white text-[20px] bg-slate-900  font-bold animate-bounce"
              variant="filled"
              color="primary"
              radius="lg"
              onClick={handleScroll}
              isLoading={isLoading}
            >
              {text2}
            </Button>
          </div>
        </Container>
        <Container>
          <div className="aligh-items-center">
            <div>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__zoomIn" : ""
                    }
                  >
                    <img src={"/homepage/header-img.svg"} alt="Header Img" />
                  </div>
                )}
              </TrackVisibility>
            </div>
          </div>
        </Container>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 2,
            type: "tween",
            ease: "backOut",
          },
          y: 0,
        }}
        viewport={{ once: true }}
        className="grid w-full grid-cols-1 gap-4 h-lvh md:grid-cols-2 md:gap-0"
        id="login"
      >
        <div className="flex flex-col items-center justify-center bg-black ">
          <Typography
            variant="title"
            displayAs="h2"
            className="text-center text-white "
          >
            Get Started
          </Typography>
          <Typography
            variant="body"
            displayAs="p"
            className="mt-4 text-center text-white max-w-[300px]"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            iste hic odio repellendus animi nobis reprehenderit, totam,
            recusandae ad distinctio facilis aspernatur ipsam blanditiis.
            Doloremque, molestias? Voluptatem, cumque dignissimos! Sit.
          </Typography>
        </div>
        <div className="flex flex-col items-center justify-center w-full mb-8 bg-white ">
          <Typography
            variant="title"
            displayAs="h2"
            className="font-medium text-center"
          >
            Login to your account
          </Typography>
          <Typography
            variant="body"
            displayAs="p"
            className="mt-4 text-center  max-w-[300px]"
          >
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold ">
              Sign up
            </Link>
          </Typography>
          <form className="w-full max-w-[350px] mt-8 ">
            <div className="flex flex-col w-full gap-2 ">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    isInvalid={errors.email ? true : false}
                    placeholder="Enter email"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    type="email"
                    label="Email"
                    autocomplete="false"
                    variant="bordered"
                  />
                )}
              />

              <p className="text-xs text-red-400">
                {errors.email &&
                  errors.email.type === "required" &&
                  "Email is required"}
              </p>

              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    variant="bordered"
                    placeholder="Enter password"
                    onChange={onChange}
                    onBlur={onBlur}
                    isInvalid={errors.password ? true : false}
                    value={value}
                    type="password"
                    label="Password"
                    autocomplete="false"
                  />
                )}
              />

              <p className="text-xs text-red-400">
                {errors.password &&
                  errors.password.type === "required" &&
                  "Password is required"}
              </p>
            </div>
            <p className="text-sm font-semibold text-red-400">{checkError}</p>
            <Button
              className="w-full mt-4 text-white bg-black"
              variant="filled"
              color="primary"
              radius="sm"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              Login
            </Button>
          </form>
        </div>
      </motion.div>

      <ScrollToTop />
    </>
  );
};

export default Login;
