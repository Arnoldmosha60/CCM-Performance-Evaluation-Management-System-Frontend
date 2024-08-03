import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apis } from 'api/apis';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
} from '@mui/material';
import { format } from 'date-fns';

const TruncatedTableCell = ({ text }) => (
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

const Achievements = () => {
    const token = localStorage.getItem('refresh_token');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apis.saveIndicatorsUrl, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.data.success) {
                setData(response.data.data);
                console.log(response.data.data);
            } else {
                console.log('Error fetching targets');
            }
        };
        fetchData();
    }, [token]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell>Indicator Code</TableCell>
                        <TableCell>Indicator</TableCell>
                        <TableCell>Created By</TableCell>
                        <TableCell>Created On</TableCell>
                        <TableCell>Achievement</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((indicator, index) => (
                        <TableRow key={indicator.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>#{indicator.indicator_code}</TableCell>
                            <TruncatedTableCell text={indicator.indicator} />
                            <TableCell>{indicator.created_by.fullname}</TableCell>
                            <TableCell>{format(new Date(indicator.created_on), 'dd MMM yyyy')}</TableCell>
                            <TableCell>{indicator.achievement_percentage}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Achievements;
