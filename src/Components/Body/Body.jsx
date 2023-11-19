import React, { useEffect } from "react";
import Category from "./Category";
import Notes from "./Notes";
import "./Body.css";
import { useCommonContext } from "../../Base/ContextApi/context";
import Base from "../../Base/Base";

const Body = () => {
  const {getNotes} = useCommonContext()
  useEffect(()=>{
    getNotes()
  },[])
  return (
    <Base>
      <div className="body">
        <Category />
        <Notes />
      </div>
    </Base>
  );
};

export default Body;
