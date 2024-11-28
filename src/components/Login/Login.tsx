"use client";

import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "../spinner/Spinner";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login({
  setIsCreateAccount,
  setOpen,
}: {
  setIsCreateAccount: any;
  setOpen: any;
}) {
  const [loading, setLoading] = React.useState(false);

  //** auth */
  const auth = useAuth();
  return (
    <div className="flex flex-col justify-center">
      <div className="mx-auto w-full">
        <div>
          <h2 className="text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
          <div className="mt-2 text-sm leading-6 flex gap-2">
            Not a member?{" "}
            <div
              className="font-semibold text-primary hover:text-primary/90 cursor-pointer"
              onClick={() => setIsCreateAccount(true)}
            >
              Create Account Now
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <Formik
              initialValues={{
                email: "",
                password: "",
                check: false,
              }}
              validationSchema={schema}
              onSubmit={(values, { setErrors }) => {
                setLoading(true);
                const { email, password } = values;

                auth.login(
                  { email, password },
                  (data: any) => {
                    setErrors({ password: data });
                  },
                  () => setLoading(false),
                  () => setOpen(false)
                );
              }}
            >
              {() => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter Email"
                        className="block w-full rounded-md border  px-2 py-2 text-sm  border-[#2A2D3C] bg-[#1B1C24] text-white"
                      />
                      <ErrorMessage
                        component="a"
                        name="email"
                        className="text-xs text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border  px-2 py-2 text-sm  border-[#2A2D3C] bg-[#1B1C24] text-white"
                      />
                      <ErrorMessage
                        component="a"
                        name="password"
                        className="text-xs text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-end justify-end">
                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-primary hover:text-primary"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full justify-center rounded-full bg-primary px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:bg-opacity-55"
                    >
                      {loading ? (
                        <Spinner size={"sm"} color="white" />
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
