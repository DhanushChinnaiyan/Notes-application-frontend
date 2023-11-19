import { Button } from "@mui/material";
import React from "react";
import { useCommonContext } from "../../Base/ContextApi/context";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const { commonStates, setCommonStates } = useCommonContext();
  return (
    <div className="notesTitle">
      {commonStates.notes.map((item, idx) => {
        const handleTitleClicked = () => {
          setCommonStates((prev) => ({
            ...prev,
            sideBarClicked: false,
          }));
          navigate(`/update/notes/${item._id}`);
        };
        return (
          <Button
            key={idx}
            variant="contained"
            onClick={handleTitleClicked}
            sx={{
              backgroundColor: "rgb(52, 52, 82)",
              color: "rgb(250, 140, 195)",
              display: "flex",
              flexDirection: "column",
              width:"calc(118px + 20vw)"
            }}
          >
            <div>
              <span style={{ color: "rgb(252, 234, 212)" }}>Title - </span>{" "}
              <span>{item.title}</span>
            </div>
            <div>
              <span style={{ color: "rgb(252, 234, 212)" }}>Category </span>{" "}
              <span>- {item.category}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default Notes;
