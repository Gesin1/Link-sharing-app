import * as Form from "@radix-ui/react-form";
import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonComponent from "../component/ButtonComponent";
import weblogo from "../img/web-logo.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Can't be empty"),
      password: Yup.string()
        .required("Password is required")
        .required("Please check again"),
    }),
    onSubmit: (value) => {
      console.log(value);
    },
  });
  return (
    <div className="flex justify-center items-center min-h-screen">
      <main className="flex flex-col justify-start items-start gap-8 mx-8 my-8 md:w-[476px] md:justify-center md:items-start ">
        <div className="md:flex flex-col justify-center items-center w-full">
          <img src={weblogo} alt="divlinks" className="block " />
        </div>
        <div className="mb-4 mt-10">
          <h2 className="text-[#333333] text-2xl font-bold mb-2">Login</h2>
          <p className="font-normal text-[#737373] text-[16px]">
            Add your details below to get back into the app
          </p>
        </div>
        <Form.Root onSubmit={formik.handleSubmit} className="mb-1 w-full">
          <Form.Field name="email" className="mb-5">
            <div className="flex flex-col relative">
              <Form.Label className="text-[#333333] font-normal text-[12px]mb-1">
                Email address
              </Form.Label>
              <Form.Control asChild>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. alex@email.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${
                    formik.values.email
                      ? ""
                      : " bg-email bg-email-10px-center bg-email-50px bg-no-repeat "
                  } box-border w-full border border-[#D9D9D9] py-3 px-4 rounded-[8px] /* ${
                    formik.touched.email && formik.errors.email
                      ? "border-[#FF3939]"
                      : ""
                  }`}
                />
              </Form.Control>
              {formik.touched.email && formik.errors.email ? (
                <div className="absolute right-2 top-11 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </Form.Field>

          <Form.Field name="password">
            <div className="flex flex-col relative">
              <Form.Label className="text-[#333333] font-normal text-[12px]mb-1">
                Password
              </Form.Label>
              <Form.Control asChild>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${
                    formik.values.password
                      ? ""
                      : " bg-lock bg-lock-20px-center bg-lock-50px bg-no-repeat "
                  } box-border w-full border border-[#D9D9D9] py-3 px-4 rounded-[8px] /* ${
                    formik.touched.email && formik.errors.email
                      ? "border-[#FF3939]"
                      : ""
                  }`}
                />
              </Form.Control>
              {formik.touched.password && formik.errors.password ? (
                <div className="absolute right-2 top-11 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </Form.Field>
        </Form.Root>
        <Form.Submit asChild>
          <ButtonComponent
            type="submit"
            text="Login"
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || !formik.dirty}
          />
        </Form.Submit>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="font-normal text-[16px] text-[#737373]">
            Don&#39;t have an account?
          </p>
          <Link to={"/createAccount"}>
            <span className="font-normal text-[16px] text-[#633CFF]">
              Create account
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
