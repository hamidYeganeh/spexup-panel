import { IconButton } from "@mui/material";
import { useState } from "react";
import { LuMoreVertical } from "react-icons/lu";
import MenuPopover from "../MenuPopover";
  
  export const TableMoreAction = (props) => {
    const { children } = props;

    const [anchorEl, setAnchorEl] = useState(null)

    function handleOpenMenu(event){
        setAnchorEl(event.currentTarget)
    }
    function handleCloseMenu(){
        setAnchorEl(null)
    }
    return (
        <>
        <IconButton onClick={handleOpenMenu} sx={{position: 'relative'}}>
            <LuMoreVertical />
        </IconButton>

        <MenuPopover anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            {children}
        </MenuPopover>
        </>
    );
  };
  