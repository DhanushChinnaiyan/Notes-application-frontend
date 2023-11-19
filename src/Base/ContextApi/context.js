import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const commonContext = createContext();
export const useCommonContext = () => useContext(commonContext);

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const commonApi = "http://localhost:5000/api";

  const [commonStates, setCommonStates] = useState({
    sideBarClicked: true,
    userToken: "",
    categories: [],
    notes: [],
    sideBarNotes:[]
  });

  const getNotes = async () => {
    try {
      const response = await axios.get(`${commonApi}/notes`, {
        headers: {
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });

      const data = await response.data;
      setCommonStates((prev) => ({
        ...prev,
        notes: data,
        sideBarNotes:data
      }));
    } catch (error) {
      console.log("Error getting catagory ", error.response.data);
    }
  };

  const getCatgories = async () => {
    try {
      const response = await axios.get(`${commonApi}/filter/categories`, {
        headers: {
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });

      const data = await response.data;

      setCommonStates((prev) => ({
        ...prev,
        categories: data,
      }));
    } catch (error) {
      console.log("Error getting catagory ", error.response.data);
    }
  };

  const getselectedCategory = async (category) => {
    try {
      const response = await axios.get(
        `${commonApi}/filter/category/notes?category=${category}`,
        {
          headers: {
            "x-auth-user": localStorage.getItem("userToken"),
          },
        }
      );

      const data = await response.data;
      console.log(data);
      setCommonStates((prev) => ({
        ...prev,
        notes: data,
      }));
    } catch (error) {
      console.log("Error getting catagory ", error.response.data);
    }
  };

  const getSearchedNotesTitle = async (title) => {
    try {
      const response = await axios.get(
        `${commonApi}/filter/search?title=${title}`,
        {
          headers: {
            "x-auth-user": localStorage.getItem("userToken"),
          },
        }
      );

      const data = await response.data;
      console.log(data);
      setCommonStates((prev) => ({
        ...prev,
        notes: data,
      }));
    } catch (error) {
      console.log("Error getting catagory ", error.response.data);
    }
  };

  const addNotes = async (formData, setLoading) => {
    try {
      const response = await axios.post(`${commonApi}/notes/add`, formData, {
        headers: {
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });

      await response.data;
      const updatedNotes = [formData, ...commonStates.notes]; // Assuming the response contains the updated notes

      // Update the state with the new array
      setCommonStates((prev) => ({
        ...prev,
        notes: updatedNotes,
      }));

      navigate("/");
    } catch (error) {
      console.log("Error getting catagory ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const updateNotes = async (formData, id, setLoading) => {
    try {
      const response = await axios.put(
        `${commonApi}/notes/update/${id}`,
        formData,
        {
          headers: {
            "x-auth-user": localStorage.getItem("userToken"),
          },
        }
      );

      const index = commonStates.notes.findIndex((item) => item._id === id);

      const updatedNotes = [...commonStates.notes];

      updatedNotes[index] = {
        ...updatedNotes[index],
        title: formData.title,
        category: formData.category,
        notes: formData.notes,
      };

      setCommonStates((prev) => ({
        ...prev,
        notes: updatedNotes,
      }));

      navigate("/");
    } catch (error) {
      console.log("Error getting catagory ", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const toggleSideBar = () => {
    setCommonStates((prev) => ({
      ...prev,
      sideBarClicked: !commonStates.sideBarClicked,
    }));
  };

  const [dummy, setDummy] = useState(true);

  const dummyFunction = () => {
    setDummy(!dummy);
  };

  const value = {
    commonStates,
    setCommonStates,
    toggleSideBar,
    commonApi,
    getCatgories,
    getNotes,
    getselectedCategory,
    getSearchedNotesTitle,
    addNotes,
    updateNotes,
    dummyFunction,
    dummy,
  };

  return (
    <commonContext.Provider value={value}>{children}</commonContext.Provider>
  );
};

export default ContextProvider;
