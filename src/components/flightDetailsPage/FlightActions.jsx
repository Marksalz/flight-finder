import { useState } from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function FlightActions({ onEdit, onDelete, onClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    event.stopPropagation();
    onClick && onClick();
    setAnchorEl(event.currentTarget);
  };

  const handleMouseDown = (event) => {
    event.stopPropagation();
  };

  const handleClose = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    onEdit && onEdit();
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    onDelete && onDelete();
  };

  return (
    <>
      <IconButton onMouseDown={handleMouseDown} onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(event) => event.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}
