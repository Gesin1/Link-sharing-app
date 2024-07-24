import * as Form from "@radix-ui/react-form";
import * as Yup from "yup";
import { useFormik } from "formik";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import ButtonComponent from "../component/ButtonComponent";
import weblogo from "../img/web-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      setSubmitting(true);
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/linkPage");
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error(" Incorrect email or password. Please try again.", {
          position: "top-right",
          autoClose: 4000,
        });
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });
  return (
    <div className="flex justify-center items-center md:min-h-screen">
      <main className="flex flex-col justify-start items-start gap-8 mx-8 my-8  [476px] md:justify-center md:items-start ">
        <div className="md:flex flex-col justify-center items-center w-full">
          <img src={weblogo} alt="divlinks" className="block " />
        </div>
        <div className="md:bg-white md:p-8 md:rounded-xl ">
          <div className="mb-7 mt-5">
            <h2 className="text-[#333333] text-2xl font-bold mb-2">Login</h2>
            <p className="font-normal text-[#737373] text-[16px] md:w-[476px]">
              Add your details below to get back into the app
            </p>
          </div>
          <Form.Root onSubmit={formik.handleSubmit} className="mb-1 w-full">
            <Form.Field name="email" className="mb-5">
              <div className="flex flex-col relative">
                <Form.Label className="text-[#333333] font-normal text-[12px] mb-1">
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
                    } box-border w-full border outline-none py-3 px-4 rounded-[8px]  font-normal text-[16px] hover:shadow-[1px_1px_10px_1px_#c5baee] ${
                      formik.touched.email && formik.errors.email
                        ? "border-[#FF3939] hover:shadow-none"
                        : "border-[#633CFF]"
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
                <Form.Label className="text-[#333333] font-normal text-[12px] mb-1">
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
                    } box-border w-full border  py-3 px-4 rounded-[8px] mb-6 outline-none font-normal text-[16px] hover:shadow-[1px_1px_10px_1px_#c5baee] ${
                      formik.touched.password && formik.errors.password
                        ? " border-[#FF3939] hover:shadow-none"
                        : "border-[#633CFF]"
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
              spacing="w-full"
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || !formik.dirty}
            />
          </Form.Submit>
          <div className="flex flex-col justify-center items-center w-full md:flex-row md: mt-4 gap-1">
            <p className="font-normal text-[16px] text-[#737373]">
              Don&#39;t have an account?
            </p>
            <Link to={"/createAccount"}>
              <span className="font-normal text-[16px] text-[#633CFF]">
                Create account
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
