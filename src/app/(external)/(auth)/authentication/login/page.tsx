import LoginForm from "@/components/LoginForm";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="flex h-screen w-screen flex-row">
        <div className="lg:flex w-[47%] hidden  bg-orange-300 "></div>

        <section className="flex flex-1 h-full px-6 pt-4  items-center justify-center">
          <div className="justify-center  flex flex-col ">
            <div className="text-9 h-[31px] lg:hidden  font-bold mb-8 "></div>

            <div className="flex gap-2 items-center mb-8  text-center justify-center flex-col">
              <h1 className="font-semibold text-center text-orange-600 text-2xl leading-9 ">
                Sign in to your Account
              </h1>
              <p className="text-sm leading-[100%] font-normal">
                Welcome back, it&apos;s been a minute. Glad you&apos;re here😁
              </p>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
