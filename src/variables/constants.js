import { TableCell } from "@mui/material";
import { Tooltip } from "antd";
import React from 'react';
import { Tooltip as Tool } from "react-tooltip";

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


export const TruncateTableCell = ({ text, userInfo }) => (
  <div>
    <span data-tip data-for={`tooltip-${userInfo.id}`}>
      {text}
    </span>
    <Tool id={`tooltip-${userInfo.id}`} place="top" effect="solid">
      <div>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
        {/* Add more user info as needed */}
      </div>
    </Tool>
  </div>
);

export default TruncatedTableCell;
