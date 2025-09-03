import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function IconBtn() {

  return (
    <Tooltip title="Click to see loading">
      <IconButton >
        <ShoppingCartIcon />
      </IconButton>
    </Tooltip>
  );
}
