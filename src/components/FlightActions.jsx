import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useState } from "react";

export default function FlightActions({ onEdit, onDelete, onClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    e.stopPropagation();
    onClick && onClick();
    setAnchorEl(e.currentTarget);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
    onEdit && onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
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
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}
