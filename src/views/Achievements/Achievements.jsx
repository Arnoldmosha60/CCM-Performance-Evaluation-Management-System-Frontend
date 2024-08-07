/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
} from '@mui/material';
import { format } from 'date-fns';
import { TruncatedTableCell } from 'variables/constants';

const Achievements = () => {
    const token = localStorage.getItem('refresh_token');
    const [data, setData] = useState([]);
    const [achievements, setAchievements] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        const response = await axios.get(apis.saveIndicatorsUrl, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        if (response.data.success) {
            setData(response.data.data);
            // console.log(response.data.data);
        } else {
            console.log('Error fetching targets');
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCalcalculateAchievement = async () => {
        const response = await axios.get(apis.achievementUrl, {
            headers: {
                'Authorization' : `Token ${token}`
            }
        });
        if (response.data.success) {
            setAchievements(response.data);
        }
        console.log('An error occurred');
    }

    useEffect(() => {
        fetchData();
        getCalcalculateAchievement();
    }, []);

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
