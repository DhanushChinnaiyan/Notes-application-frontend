import React from "react";
import "./sidebar.css";
import { useCommonContext } from "../ContextApi/context";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {

  const { commonStates,toggleSideBar } = useCommonContext();
  const navigate = useNavigate()
  const sidebarClassName = commonStates.sideBarClicked ? "sidebar" : "sidebar hidden";
 
 const handleClicked = () => {
  toggleSideBar()
  navigate("/add/notes")

 }

 const handleHomeBtnClicked = () => {
  toggleSideBar()
  navigate("/")
  
 }
 const handleLogout = () => {
  localStorage.removeItem("userToken")
  navigate("/login",{replace:true})
  
 }
 
  return (
    <div className={sidebarClassName}>

      <Button onClick={handleClicked} variant="outlined" sx={{border:"1px solid gray"}}><CreateNewFolderIcon sx={{fontSize:"calc(25px + 2vw)",color:"rgb(250, 140, 195)"}}/></Button>

       <div className="titles">
       {
        commonStates.sideBarNotes.map((item,idx)=>{

          const handleTitleClicked = () => {
            toggleSideBar()
            navigate(`/update/notes/${item._id}`)
          }

          return(
            <Button key={idx} onClick={handleTitleClicked} variant="outlined" sx={{border:"1px solid gray",}}>{item.title}</Button>
          )
        })
       }
       </div>
       <abbr title = "HOME" className="homeBtn"><Button onClick={handleHomeBtnClicked}><HomeIcon/></Button></abbr>
       <abbr title = "LOGOUT" className="logoutBtn"><Button onClick={handleLogout}><LogoutIcon/></Button></abbr>
    </div>
  );
};

export default Sidebar;
