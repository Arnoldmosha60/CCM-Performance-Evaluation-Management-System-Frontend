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
import IndicatorsDialog from 'components/dialog/IndicatorsDialog';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Indicators = () => {
    const token = localStorage.getItem('refresh_token');
    const [data, setData] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apis.saveTargetsUrl, {
                headers: {
                    Authorization: `Token ${token}`
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

    const handleAddIndicators = (target) => {
        setSelectedData(target);
        setOpenAddDialog(true);
    }

    const handleViewIndicators = (target) => {
        navigate(`/admin/view_indicators/${target.id}/`);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Target Code</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((target, index) => (
                            <TableRow key={target.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{target.target_code}</TableCell>
                                <TableCell>{target.created_by.fullname}</TableCell>
                                <TableCell>{format(new Date(target.created_on), 'dd MMM yyyy')}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => handleAddIndicators(target)}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleViewIndicators(target)}
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

            <IndicatorsDialog
                open={openAddDialog}
                onClose={handleClose}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                indicators={[]}
            />
        </>
    )
}

export default Indicators