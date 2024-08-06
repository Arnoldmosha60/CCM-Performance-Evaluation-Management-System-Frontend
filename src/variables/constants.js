import { TableCell } from "@mui/material";
import { Tooltip } from "antd";
import React from 'react';
// import { Tooltip as ReactTooltip } from "react-tooltip";

export const TruncatedTableCell = ({ text }) => (
    <Tooltip title={text}>
      <TableCell
        sx={{
          maxWidth: '150px', // Adjust this value as needed
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text}
      </TableCell>
    </Tooltip>
  );



