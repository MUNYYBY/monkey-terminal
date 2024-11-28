"use client";

import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/spinner/Spinner";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
});

export default function CreateAccount({
  setIsCreateAccount,
  setOpen,
}: {
  setIsCreateAccount: any;
  setOpen: any;
}) {
  const [loading, setLoading] = React.useState(false);

  //** auth  */
  const auth = useAuth();

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">
              Create A New Account
            </h2>
            <div className="mt-2 text-sm leading-6 flex gap-2">
              Already a member?{" "}
              <div
                className="font-semibold text-primary hover:text-primary/90 cursor-pointer"
                onClick={() => setIsCreateAccount(false)}
              >
                Login
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                }}
                validationSchema={schema}
                onSubmit={(values, { setErrors }) => {
                  setLoading(true);
                  const { email, password, name, phone } = values;
                  auth.register(
                    { email, password, name, phone },
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
                        Name
                      </label>
                      <div className="mt-2">
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter Name"
                          className="block w-full rounded-md border border-[#EBEBEE] bg-[#F6F6F9] px-2 py-2 text-sm text-black dark:border-[#2A2D3C] dark:bg-[#1B1C24] dark:text-white"
                        />
                        <ErrorMessage
                          component="a"
                          name="name"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>
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
                          className="block w-full rounded-md border border-[#EBEBEE] bg-[#F6F6F9] px-2 py-2 text-sm text-black dark:border-[#2A2D3C] dark:bg-[#1B1C24] dark:text-white"
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
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6"
                      >
                        Phone number
                      </label>
                      <div className="mt-2">
                        <Field
                          id="phone"
                          name="phone"
                          type="text"
                          autoComplete="phone"
                          placeholder="Enter phone number"
                          className="block w-full rounded-md border border-[#EBEBEE] bg-[#F6F6F9] px-2 py-2 text-sm text-black dark:border-[#2A2D3C] dark:bg-[#1B1C24] dark:text-white"
                        />
                        <ErrorMessage
                          component="a"
                          name="phone"
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
                          className="block w-full rounded-md border border-[#EBEBEE] bg-[#F6F6F9] px-2 py-2 text-sm text-black dark:border-[#2A2D3C] dark:bg-[#1B1C24] dark:text-white"
                        />
                        <ErrorMessage
                          component="a"
                          name="password"
                          className="text-xs text-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex w-full items-center justify-end">
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
                          "Create Account"
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
    </>
  );
}
