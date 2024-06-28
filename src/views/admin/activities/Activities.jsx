/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import axios from 'axios';
import { apis } from 'api/apis';
import ActivitiesDialog from 'components/dialog/ActivitiesDialog';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Activities = () => {
    const token = localStorage.getItem('refresh_token');
    const [data, setData] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apis.saveActivitiesUrl, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.data.success) {
                setData(response.data.data);
            } else {
                console.log('Error fetching targets');
            }
        };
        fetchData();
    }, [token]);

    const handleClose = () => {
        setOpenAddDialog(false);
        setOpenViewDialog(false);
    };

    const handleAddActivities = (indicator) => {
        setSelectedData(indicator);
        setOpenAddDialog(true);
    }

    const handleViewActivities = (indicator) => {
        navigate(`/admin/view_activities/${indicator.id}/`);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Indicator Code</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((indicator, index) => (
                            <TableRow key={indicator.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>#{indicator.indicator_code}</TableCell>
                                <TableCell>{indicator.created_by.fullname}</TableCell>
                                <TableCell>{format(new Date(indicator.created_on), 'dd MMM yyyy')}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => handleAddActivities(indicator)}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleViewActivities(indicator)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ActivitiesDialog
                open={openAddDialog}
                onClose={handleClose}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                activities={[]}
            />
        </>
    )
}

export default Activities