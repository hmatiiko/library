import { Link, useNavigate } from "react-router-dom";
import Input from "../components/form-elements/Input";
import Label from "../components/form-elements/Label";
import Button from "../components/shared/Button";
import { login } from "../store/features/authSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSendLoginRequestMutation } from "../services/authApi";
import { setCookie } from "../helpers/setCookie";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [sendLoginRequest, { data, error }] = useSendLoginRequestMutation();

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
    console.log("form data login", formData);
    sendLoginRequest(formData);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your library
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email" label="Email address" />
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputConfig={register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <span className="text-red-600">This field is required</span>
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
                  autoComplete="current-password"
                  inputConfig={register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            <div>
              <Button type="submit" additionalClasses="mt-4 w-full">
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Click here if you want to create new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
