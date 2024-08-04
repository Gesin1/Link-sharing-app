import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../component/Navbar";
import linked from "../img/link-black.svg";
import colorProfile from "../img/profile-color.svg";
import ButtonComponent from "../component/ButtonComponent";
import mail from "../img/mail.svg";
import mailColor from "../img/mail-white.svg";
import phone from "../img/phone-icon.svg";
import file from "../img/file.svg";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";

const ProfilePage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name can't be empty"),
      lastName: Yup.string().required("Last name can't be empty"),
      email: Yup.string().email("Invalid email address"),
    }),
    onSubmit: (value) => {
      console.log(value);
    },
  });

  const [image, setImage] = useState(null);

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        notification();
      };
      reader.readAsDataURL(file);
    }
  };

  const notification = () => {
    toast.success(
      <div className="flex items-center gap-2">
        <img src={file} alt="icon" />
        <span className="text-[16px] font-bold text-slate-900 ">
          Your changes have been successfully saved!
        </span>
      </div>,
      {
        position: "bottom-center",
        autoClose: 4000,
      }
    );
  };

  return (
    <div>
      <Navbar
        image={linked}
        className="py-[11px] flex flex-row justify-center items-center px-[27px]"
        classNameTwo="bg-[#EFEBFF] py-[11px] flex flex-row justify-center items-center px-[27px] rounded-lg"
        src={colorProfile}
        textLink="text-[#737373] hidden md:block font-semibold text-[16px]"
        textProfile="text-[#633CFF] hover:none hidden md:block font-semibold text-[16px]"
      />
      <div className="flex flex-col lg:flex-row-reverse lg:justify-center lg:w-full py-4 mb-4 lg:mb-0 lg:pb-4">
        <main className="flex flex-col gap-4 items-center justify-center pt-8 mx-4 my-8 bg-white rounded-lg lg:w-[58%] lg:mt-0 lg:mx-0 lg:pb-0 lg:mb-0 lg:pt-0 ">
          <div className="flex flex-col justify-start items-start gap-2 px-8 mb-10 w-full lg:mb-4 lg:px-10 lg:pt-4">
            <h2 className="font-bold text-2xl text-[#333333]">
              Profile Details
            </h2>
            <p className="font-normal text-[16px] text-[#737373] md:w-[721px] lg:w-full">
              Add your details to create a personal touch to your profile.
            </p>
          </div>
          <div className="w-full px-8 lg:px-10">
            <div className="bg-[#FAFAFA] flex flex-col justify-start items-start gap-6 rounded-lg p-4 w-full md:flex-row md:items-center md:justify-between">
              <label className="text-[16px] font-normal text-[#737373] md:w-[250px]">
                Profile picture
              </label>
              <div
                className="relative w-[60%] h-56 mb-4 lg:h-40 md:w-[30%] md:mb-0 bg-[#EFEBFF] rounded-lg flex justify-center items-center cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
                style={{
                  backgroundImage: image ? `url(${image})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!image && (
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <img src={mail} alt="icon" />
                    <span className="text-center text-[#633CFF] text-[16px] font-bold">
                      + Upload Image
                    </span>
                  </div>
                )}
                {image && (
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <div className="flex flex-col gap-4 justify-center items-center text-white">
                      <img src={mailColor} alt="icon" />
                      <span className="text-center text-[16px] font-bold">
                        Change Image
                      </span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id="fileInput"
                  className="p-12 bg-[#EFEBFF] rounded-lg"
                  accept="image/*"
                  onChange={imageChange}
                  hidden
                />
              </div>
              <p className="text-xs font-normal text-[#737373] md:w-[127px]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>
          <div className="w-full px-8 lg:px-10">
            <div className="bg-[#FAFAFA] flex flex-col justify-start items-start rounded-lg p-4 w-full">
              <Form.Root onSubmit={formik.handleSubmit} className="w-full my-4">
                <Form.Field name="firstName" className="mb-4">
                  <div className="flex flex-col relative md:flex-row md:justify-between md:items-center">
                    <Form.Label className="text-[#333333] font-normal text-[12px] mb-1">
                      First name*
                    </Form.Label>
                    <Form.Control asChild>
                      <input
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Ben"
                        className={`${
                          formik.touched.firstName && formik.errors.firstName
                            ? ""
                            : "border-[#FF3939] hover:shadow-none outline none"
                        }font-normal text-[16px] py-3 outline-none w-full md:w-[70%] rounded-lg`}
                      />
                    </Form.Control>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="absolute right-2 top-8 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                </Form.Field>
                <Form.Field name="lastName" className="mb-4">
                  <div className="flex flex-col relative md:flex-row md:justify-between md:items-center">
                    <Form.Label className="text-[#333333] font-normal text-[12px] mb-1">
                      Last name*
                    </Form.Label>
                    <Form.Control asChild>
                      <input
                        type="text"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Wright"
                        className={`${
                          formik.touched.lastName && formik.errors.lastName
                            ? ""
                            : "border-[#FF3939] hover:shadow-none outline none"
                        }font-normal text-[16px] py-3 outline-none w-full md:w-[70%] rounded-lg`}
                      />
                    </Form.Control>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="absolute right-2 top-8 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </Form.Field>
                <Form.Field name="email">
                  <div className="flex flex-col relative md:flex-row md:justify-between md:items-center">
                    <Form.Label className="text-[#333333] font-normal text-[12px] mb-1">
                      Email
                    </Form.Label>
                    <Form.Control asChild>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ben@example.com"
                        className={`${
                          formik.touched.email && formik.errors.email
                            ? ""
                            : "border-[#FF3939] hover:shadow-none outline none"
                        }font-normal text-[16px] py-3 outline-none w-full md:w-[70%] rounded-lg`}
                      />
                    </Form.Control>
                    {formik.errors.email ? (
                      <div className="absolute right-2 top-8 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                </Form.Field>
              </Form.Root>
            </div>
          </div>
          <div className="w-full h-[1px] border mt-8 mb-3"></div>
          <div className="w-full flex justify-center md:justify-end md:pr-4">
            <Form.Submit asChild>
              <ButtonComponent
                type="submit"
                text="Save"
                spacing="mb-3 w-[90%] md:w-[15%] md:mr-6 outline-none"
                onClick={formik.handleSubmit}
                disabled={!formik.isValid || !formik.dirty}
              />
            </Form.Submit>
          </div>
        </main>
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-shrink-0 lg:w-[38%] h-[720px] lg:bg-white mr-8 ">
          <img
            src={phone}
            alt="phone image"
            className="w-[280px] h-[500px] object-contain flex-shrink-0 lg:relative"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
