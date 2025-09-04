import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function IconBtn({
  title = "click here",
  color = "primary",
  children,
  handleClick,
}) {
  return (
    <Tooltip title={title}>
      <IconButton size="small" color={color} onClick={handleClick}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
