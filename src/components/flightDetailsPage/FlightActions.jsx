import { useState } from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function FlightActions({ onEdit, onDelete, onClick }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const open = Boolean(anchorElement);

  const handleOpen = (event) => {
    event.stopPropagation();
    onClick && onClick();
    setAnchorElement(event.currentTarget);
  };

  const handleMouseDown = (event) => {
    event.stopPropagation();
  };

  const handleClose = (event) => {
    event?.stopPropagation();
    setAnchorElement(null);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setAnchorElement(null);
    onEdit && onEdit();
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setAnchorElement(null);
    onDelete && onDelete();
  };

  return (
    <>
      <IconButton onMouseDown={handleMouseDown} onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorElement={anchorElement}
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
