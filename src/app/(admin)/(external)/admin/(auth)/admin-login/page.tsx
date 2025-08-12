import AdminLoginForm from "@/components/AdminLoginForm";
import React from "react";

const AdminLogin = () => {
  return (
    <>
      <div className="flex h-screen w-screen flex-row">
        <div className="lg:flex w-full hidden  bg-orange-300 ">
          <section className="flex flex-1 h-full  px-6 pt-4  items-center justify-center">
            <div className="justify-center bg-white md:p-6 rounded-lg  flex flex-col ">
              <div className="text-9 h-[31px] lg:hidden  font-bold mb-8 "></div>

              <div className="flex gap-2 items-center  mb-8  text-center justify-center flex-col">
                <h1 className="font-semibold text-center text-orange-600 text-2xl leading-9 ">
                  Log in to Admin Account
                </h1>
                <p className="text-sm leading-[100%] font-normal">
                  Welcome! Access your admin account
                </p>
              </div>

              <AdminLoginForm />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
