import { Link, useNavigate } from "react-router-dom";
import Input from "../components/form-elements/Input";
import Label from "../components/form-elements/Label";
import Button from "../components/shared/Button";
import { login } from "../store/features/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSendRegisterRequestMutation } from "../services/authApi";
import { setCookie } from "../helpers/setCookie";

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the password field value
  const password = watch("password", "");

  const [sendRegisterRequest, { data, error }] =
    useSendRegisterRequestMutation();

  useEffect(() => {
    if (data) {
      setCookie("token", data.token);

      if (data.token) {
        dispatch(login({ ...data, isGetToken: true }));
        navigate("/");
      } else {
        dispatch(login({ ...data, isGetToken: false }));
      }

      console.log("data inside use effect", data);
    }
  }, [data, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      console.error(`Error is ${error}`);
    }
  }, [error]);

  const onSubmit = async (formData) => {
    console.log("form data register", formData);
    sendRegisterRequest(formData);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registration to your library
          </h2>
        </div>

        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email" label="Email address" />
              </div>

              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputConfig={register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" label="Password" />
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  inputConfig={register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmPassword" label="Confirm password" />
              </div>
              <div className="mt-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="off"
                  inputConfig={register("confirmPassword", {
                    required: "Password is required",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div>
              <Button type="submit" additionalClasses="mt-4 w-full">
                Register
              </Button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Go to login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
