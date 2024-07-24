import * as Form from "@radix-ui/react-form";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import ButtonComponent from "../component/ButtonComponent";
import weblogo from "../img/web-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Can't be empty"),
      password: Yup.string()
        .required("Password is required")
        .required("Please check again"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please check again"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      setSubmitting(true);
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        navigate("/linkPage");
        toast.success("Account created successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        setErrors({ submit: error.message });
        toast.error("Account already exit. Please try again.", {
          position: "top-right",
          autoClose: 4000,
        });
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
            <h2 className="text-[#333333] text-2xl font-bold mb-2">
              Create account
            </h2>
            <p className="font-normal text-[#737373] text-[16px] w-[340px] md:w-[476px]">
              Let&#39;s get you started sharing your links!
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
                    } box-border w-full border py-3 px-4 rounded-[8px] outline-none font-normal text-[16px] hover:shadow-[1px_1px_10px_1px_#c5baee]  ${
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
                  Create password
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="password"
                    name="password"
                    placeholder="At least 8 characters"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${
                      formik.values.password
                        ? ""
                        : " bg-lock bg-lock-20px-center bg-lock-50px bg-no-repeat "
                    } box-border w-full border py-3 px-4 rounded-[8px] outline-none font-normal text-[16px] hover:shadow-[1px_1px_10px_1px_#c5baee] mb-6 ${
                      formik.touched.password && formik.errors.password
                        ? "border-[#FF3939] hover:shadow-none"
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

            <Form.Field name="confirmPassword">
              <div className="flex flex-col relative">
                <Form.Label className="text-[#333333] font-normal text-[12px] mb-1">
                  Confirm password
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="At least 8 characters"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${
                      formik.values.confirmPassword
                        ? ""
                        : " bg-lock bg-lock-20px-center bg-lock-50px bg-no-repeat "
                    } box-border w-full border py-3 px-4 rounded-[8px] outline-none font-normal text-[16px] hover:shadow-[1px_1px_10px_1px_#c5baee] mb-4 ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-[#FF3939] hover:shadow-none"
                        : "border-[#633CFF]"
                    }`}
                  />
                </Form.Control>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="absolute right-2 top-11 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </Form.Field>
          </Form.Root>
          <div className="mb-4">
            <p className="font-normal text-xs text-[#737373]">
              Password must contain at least 8 characters
            </p>
          </div>
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
              Already have an account?
            </p>
            <Link to={"/"}>
              <span className="font-normal text-[16px] text-[#633CFF]">
                Login
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAccount;
