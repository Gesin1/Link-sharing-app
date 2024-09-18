import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Navbar from "../component/Navbar";
import linked from "../img/link-black.svg";
import colorProfile from "../img/profile-color.svg";
import ButtonComponent from "../component/ButtonComponent";
import mail from "../img/mail.svg";
import mailColor from "../img/mail-white.svg";
import phone from "../img/phone-icon.svg";
import file from "../img/file.svg";
import { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import getUserProfile from "../hook/getUserProfile";
import useSaveLinks from "../hook/savelink";
import facebook from "../img/facebook.svg";
import linkedIn from "../img/linkedin.svg";
import github from "../img/Vector.svg";
import CardButtonComponet from "../component/CardButtonComponet";

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const { userData, Loading: loadingProfile } = getUserProfile();
  const { saveLinks, Loading: loadingData, error } = useSaveLinks();

  if (loadingData || loadingProfile) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Loding: {error.message}</p>;
  }

  const getImageAndBg = (name) => {
    switch (name) {
      case "GitHub":
        return { image: github, bg: "bg-black" };
      case "LinkedIn":
        return { image: linkedIn, bg: "bg-blue-400" };
      case "Facebook":
        return { image: facebook, bg: "bg-blue-800" };
      default:
        return { image: github, bg: "bg-gray-300" };
    }
  };

  useEffect(() => {
    if (userData) {
      formik.setValues({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    }
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebase = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `profilePicture/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

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

    onSubmit: async (value) => {
      try {
        const fileInput = document.getElementById("fileInput").files[0];
        const imageUrl = await uploadImageToFirebase(fileInput);
        const showResult = await setDoc(doc(db, "users", value.email), {
          ...value,
          profilePicture: imageUrl,
        });
        console.log(showResult);
        notification();
      } catch (error) {
        toast.error("Error updating profile", {
          position: "top-left",
          autoClose: 4000,
        });
      }
    },
  });

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
      <div className="flex flex-col lg:flex-row-reverse lg:justify-center lg:w-full lg:py-4 mb-4 lg:mb-0 lg:pb-4">
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
                  onChange={handleImageChange}
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
                        className={`font-normal text-[16px] py-3 outline-none box-border border w-full md:w-[70%] rounded-lg hover:shadow-[1px_1px_10px_1px_#c5baee] ${
                          formik.touched.firstName && formik.errors.firstName
                            ? "border-[#FF3939] hover:shadow-none"
                            : "border-[#633CFF]"
                        }`}
                      />
                    </Form.Control>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="absolute right-2 top-5 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
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
                        className={`font-normal text-[16px] py-3 outline-none box-border border w-full md:w-[70%] rounded-lg hover:shadow-[1px_1px_10px_1px_#c5baee] ${
                          formik.touched.lastName && formik.errors.lastName
                            ? "border-[#FF3939] hover:shadow-none"
                            : "border-[#633CFF]"
                        }`}
                      />
                    </Form.Control>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="absolute right-2 top-5 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
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
                        className={`font-normal text-[16px] py-3 outline-none box-border border w-full md:w-[70%] rounded-lg hover:shadow-[1px_1px_10px_1px_#c5baee] ${
                          formik.touched.email && formik.errors.email
                            ? "border-[#FF3939] hover:shadow-none"
                            : "border-[#633CFF]"
                        }`}
                      />
                    </Form.Control>
                    {formik.errors.email ? (
                      <div className="absolute right-2 top-5 transform -translate-y-1/ font-normal text-xs text-[#FF3939]">
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
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-shrink-0 lg:w-[38%] h-[650px] lg:bg-white mr-8 lg:relative overflow-hidden">
          <img
            src={phone}
            alt="phone image"
            className="w-[280px] h-[600px] object-contain flex-shrink-0 lg:relative"
          />
          <div className="scollable-container flex flex-col gap-[22px] absolute top-[45%] left-1/2 transform -translate-x-1/2  w-[220px] overflow-y-auto h-[calc(100%-350px)] ">
            {saveLinks.map((link, index) => {
              const { image, bg } = getImageAndBg(link.name);
              return (
                <CardButtonComponet
                  key={index}
                  name={link.name}
                  image={image}
                  bg={bg}
                  url={link.link}
                />
              );
            })}
          </div>
          <div className="flex flex-col items-center justify-center absolute top-[15%] ">
            <img
              src={userData?.profilePicture}
              alt=""
              className="w-[100px] h-[100px] rounded-[50%] border-2  mb-1"
            />
            <p className="text-[#333] font-semibold text-[18px]">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className=" text-[#737373] font-normal text-xs">
              {userData?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
