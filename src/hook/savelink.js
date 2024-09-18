import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const useSaveLinks = () => {
  const [saveLinks, setSaveLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLink = async () => {
    try {
      const querySnapshort = await getDocs(collection(db, "links"));
      const linksArray = [];
      querySnapshort.forEach((doc) => {
        linksArray.push(...doc.data().links);
      });
      setSaveLinks(linksArray);
    } catch (error) {
      setError(error);
      console.log("Error in Fetching link:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLink();
  }, []);

  return { saveLinks, loading, error, fetchLink };
};

export default useSaveLinks;
