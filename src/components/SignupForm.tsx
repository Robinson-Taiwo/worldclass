"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import google from "@/components/icons/google.svg";
import github from "@/components/icons/github.svg";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "@/schema/auth";
import { useDispatch } from "react-redux";
// import { setUser } from "@/store/slices/UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  signInWithGoogle,
  signInWithGithub,
  registerWithEmail,
} from "@/lib/authHelpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();

  type signupData = z.infer<typeof registerSchema>;

  const form = useForm<signupData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: signupData) => {
    try {
      await registerWithEmail(values.email, values.password);
      setIsLoading(true);

      form.reset();
      toast("You have successfully signed up.");
      router.push("/authentication/login");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: string }).code ===
          "auth/account-exists-with-different-credential"
      ) {
        toast.error(
          "Looks like you've signed up with a different method. Try logging in with email or Google."
        );
      }
      console.error("Google auth failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();

      router.push("/authentication/login");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: string }).code ===
          "auth/account-exists-with-different-credential"
      ) {
        toast.error(
          "Looks like you've signed up with a different method. Try logging in with email or Google."
        );
      }
      console.error("Google auth failed:", err);
    }
  };

  const handleGithubSignup = async () => {
    try {
      await signInWithGithub();

      toast("You have successfully signed up with Github.");
      router.push("/authentication/login");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: string }).code ===
          "auth/account-exists-with-different-credential"
      ) {
        toast.error(
          "Looks like you've signed up with a different method. Try logging in with email or Google."
        );
      }
      console.error("Google auth failed:", err);
    }
  };

  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <div className="flex gap-6 flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex gap-4 flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm placeholder:text-sm placeholder:text-[#667085] shadow-none  "
                    placeholder="janedoe@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-sm placeholder:text-sm placeholder:text-[#667085] shadow-none  "
                    placeholder="@Oluwarotimi_"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex border border-border focus-visible:border-orange-500  focus-visible:ring-[0.2px]  rounded-sm pr-3 w-full items-center flex-row">
                    <Input
                      {...field}
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      name="password"
                      className="rounded-sm placeholder:text-sm placeholder:text-[#667085] outline-none focus:outline-none focus:border-none border-none focus:ring-0   focus-visible:ring-[0px] shadow-none  "
                    />

                    <p className="" onClick={() => setShow(!show)}>
                      {show ? (
                        <Eye className="font-extralight h-4 w-4 text-[#667085] " />
                      ) : (
                        <EyeOffIcon className="font-extralight h-4 w-4 text-[#667085] " />
                      )}
                    </p>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="mt-4 bg-orange-400 hover:bg-orange-500 flex items-center justify-center gap-2"
            disabled={isLoading} // Optional: disables the button while loading
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>

      {/* third party sign in */}
      <div className="flex space-y-[10px] flex-col ">
        <Button
          onClick={handleGoogleSignup}
          className=" rounded-[8px] bg-transparent border hover:bg-orange-100 flex flex-row shadow-none text-black   "
        >
          <span>
            {" "}
            <Image
              src={google}
              height={24}
              width={24}
              alt="google icon"
              className="h-6 w-6"
            />{" "}
          </span>
          <span>Sign up with Google</span>
        </Button>

        <Button
          onClick={handleGithubSignup}
          className=" rounded-[8px] bg-transparent hover:bg-orange-100 border flex flex-row shadow-none text-black   "
        >
          <span>
            {" "}
            <Image
              src={github}
              height={24}
              width={24}
              alt="google icon"
              className="h-6 w-6"
            />{" "}
          </span>
          <span>Sign up with Github</span>
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
