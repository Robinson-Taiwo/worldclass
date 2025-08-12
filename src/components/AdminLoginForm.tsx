"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "./ui/button";

import { LoginSchema } from "@/schema/auth";
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
import { loginWithEmail } from "@/lib/authHelpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/UserSlice";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import Link from "next/link";

const AdminLoginForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  type LoginData = z.infer<typeof LoginSchema>;

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = async (values: LoginData) => {
    try {
      setIsLoading(true);
      // Set persistence based on rememberMe
      await setPersistence(
        auth,
        values.rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const { user } = await loginWithEmail(values.email, values.password);

      dispatch(
        setUser({
          id: user.uid,
          email: user.email!,
          username: user.displayName || "",
          isLoggedIn: true,
          role: "admin",
          photoURL: user.photoURL || null,
          phoneNumber: user.phoneNumber || null,
        })
      );
      console.log(user);

      toast("Login successful!");
      router.push("/admin/admin-dashboard"); // Or wherever you want to send them after login
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        typeof (err as { code?: unknown }).code === "string"
      ) {
        const code = (err as { code: string }).code;
        if (code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else if (code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (code === "auth/network-request-failed") {
          toast.error("Login failed. check your network connection");
        } else {
          toast.error("Login failed.");
        }
      } else {
        toast.error("Login failed.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
                    placeholder="shadcn"
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
                  <div className="flex border border-border rounded-sm pr-3 w-full items-center flex-row">
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

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center h-full justify-between flex-row">
                  <div className="flex-row items-center gap-1 flex">
                    <span className="">
                      <FormControl>
                        <Input
                          name="rememberMe"
                          className="remember text-sm"
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </span>
                    <span>
                      <FormLabel className="font-normal leading-[100%] text-sm">
                        Remember me
                      </FormLabel>
                    </span>
                  </div>

                  <Link
                    className="text-sm font-normal"
                    href="/auth/forgot-password"
                  >
                    {" "}
                    Forgot Password{" "}
                  </Link>
                </div>
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
              "Log in"
            )}
          </Button>
        </form>
      </Form>

      {/* third party sign in */}

      <div className="flex w-full text-sm p-2 font-normal items-center justify-center">
        <span> Don&apos;t have an account? </span>
        <span className="text-orange-600 px-2 ">
          <Link className="text-sm font-normal" href="/admin/admin-signup">
            {" "}
            Sign up{" "}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AdminLoginForm;
