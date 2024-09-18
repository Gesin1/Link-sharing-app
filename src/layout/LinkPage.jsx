import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

import Navbar from "../component/Navbar";
import illustration from "../img/illust-icon.svg";
import facebook from "../img/facebook.svg";
import linkedIn from "../img/linkedin.svg";
import github from "../img/Vector.svg";
import ButtonComponent from "../component/ButtonComponent";
import CardInput from "../component/CardInput";
import phone from "../img/phone-icon.svg";
import CardButtonComponet from "../component/CardButtonComponet";
import getUserProfile from "../hook/getUserProfile";
import useSaveLinks from "../hook/savelink";

const LinkPage = () => {
  const [showCard, setShowCard] = useState([]);
  const [inputs, setInputs] = useState([]);
  const { userData, loading } = getUserProfile();
  const { saveLinks, loading: linksLoading, error, fetchLink } = useSaveLinks();

  // function to handle adding a new form input
  const handleClick = () => {
    setShowCard([...showCard, {}]);
    setInputs([...inputs, { name: "", link: "" }]);
  };

  // function to remove a link card
  const handleRemoveLink = (index) => {
    setShowCard(showCard.filter((_, i) => i !== index));
    setInputs(inputs.filter((_, i) => i !== index));
  };

  // function to update input dynamically
  const handleInputWithButton = (index, value, type) => {
    const updateInputButton = [...inputs];
    if (!updateInputButton[index]) {
      updateInputButton[index] = { name: "", link: "" };
    }
    updateInputButton[index][type] = value;
    setInputs(updateInputButton);
  };

  // function to save the links to firebase
  const handleSave = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error("User not authenticated");

      const userId = user.uid;
      const linksCollectionRef = collection(db, "links");
      console.log(userId);

      // Get exixting Links for the user
      const querySnapshot = await getDocs(linksCollectionRef);
      let docId = null;
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          docId = doc.id;
        }
      });

      if (docId) {
        // updatimg existing document
        const docRef = doc(db, "links", docId);
        await updateDoc(docRef, { links: inputs });
      } else {
        // Add new document
        const docRef = await addDoc(linksCollectionRef, {
          userId,
          links: inputs,
        });
        console.log(docRef.id);
        toast.success("The Link is save", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      fetchLink();
    } catch (e) {
      toast.error(" Internet connection failed, try again", {
        position: "top-right",
        autoClose: 4000,
      });

      console.error("Something as went wrong", e);
    }
  };

  const saveButton =
    showCard.length === 0 ||
    inputs.some(
      (input) =>
        (input.link || "").trim() === "" || (input.name || "").trim() === ""
    );

  // function to choose image and bg based on platform name
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row-reverse lg:justify-center lg:w-full py-4 mb-4">
        <main className="bg-white flex flex-col mt-4 mx-4 py-4 rounded-lg justify-center items-center lg:w-[58%] lg:mt-0 lg:mx-0 lg:pb-0">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="flex flex-col justify-start items-start gap-2 mb-10 mx-4 w-[90%]">
                <h2 className="font-bold text-2xl text-[#333333]">
                  Customize your links
                </h2>
                <p className="font-normal text-[16px] text-[#737373] md:w-[721px] lg:w-full">
                  Add/edit/remove links below and then share all your profiles
                  with the world!
                </p>
              </div>
              <ButtonComponent
                text="+ Add new link"
                textColor="text-[#633CFF]"
                type="submit"
                spacing="w-[90%]"
                bg="bg-white"
                border="border border-[#633CFF]"
                onClick={handleClick}
              />
              {showCard.length === 0 ? (
                <div className="bg-[#FAFAFA] flex flex-col gap-2 justify-center items-center w-[90%] px-4 py-6 mt-6 rounded-xl">
                  <img
                    src={illustration}
                    alt="illustration"
                    className="block"
                  />
                  <h3 className="font-bold text-2xl text-[#333333]">
                    Let&#39;s get you started
                  </h3>
                  <p className="font-normal text-[16px] text-[#737373] md:max-w-[488px] md:text-center">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We&#39;re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              ) : (
                showCard.map((_, index) => (
                  <CardInput
                    key={index}
                    index={index}
                    onRemove={handleRemoveLink}
                    onPlatformChange={(value) =>
                      handleInputWithButton(index, value, "name")
                    }
                    onLinkChange={(value) =>
                      handleInputWithButton(index, value, "link")
                    }
                  />
                ))
              )}
              <div className="w-full h-[1px] border mt-8 mb-3"></div>
              <div className="w-full flex justify-center md:justify-end md:pr-4">
                <ButtonComponent
                  type="submit"
                  text="Save"
                  spacing="mb-3 w-[90%] md:w-[15%] md:mr-6 outline-none"
                  onClick={handleSave}
                  disabled={saveButton}
                />
              </div>
            </>
          )}
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

export default LinkPage;
