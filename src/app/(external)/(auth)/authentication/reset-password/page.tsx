import ResetPasswordForm from "@/components/ResetPasswordForm";
import React from "react";

const ResetPassword = () => {
  return (
    <>
      <div className="flex h-screen w-screen flex-row">
        <div className="lg:flex w-[47%] hidden  bg-orange-300 "></div>

        <section className="flex flex-1 h-screen  px-6 pt-4  items-center justify-center">
          <div className="justify-center  flex flex-col ">
            <div className="text-9 h-[31px] lg:hidden  font-bold mb-8 ">
            </div>
            <div className="flex gap-2  mb-8  text-start  flex-col">
              <h1 className="font-semibold text-orange-600  text-2xl leading-9 ">
                Reset Password
              </h1>
              <p className="text-sm leading-[100%] font-normal">
                Choose a new password for your account to continue{" "}
              </p>
            </div>

            <ResetPasswordForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
