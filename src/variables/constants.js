import { TableCell } from "@mui/material";
import { Tooltip } from "antd";

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