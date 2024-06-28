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
import TargetsDialog from 'components/dialog/TargetsDialog';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Targets = () => {
    const token = localStorage.getItem('refresh_token');
    const [data, setData] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenAddDialog(false);
        setOpenViewDialog(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(apis.saveObjectivesUrl, {
                headers: {
                    'Authorization': `Token ${token}`
                },
            });

            if (response.data.success) {
                setData(response.data.data);
                console.log(response.data.data)
            } else {
                console.log('Error fetching objectives');
            }
        };
        fetchData();
    }, [token]);

    const handleAddTargets = (objective) => {
        setSelectedData(objective);
        setOpenAddDialog(true);
    }

    const handleViewTargets = (objective) => {
        navigate(`/admin/view_targets/${objective.id}/`);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Representative</TableCell>
                            <TableCell>District Code</TableCell>
                            <TableCell>Objective Code</TableCell>
                            <TableCell>Created On</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((objective, index) => (
                            <TableRow key={objective.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{objective.representative.representative}</TableCell>
                                <TableCell>#{objective.representative.wilaya_code}</TableCell>
                                <TableCell>#{objective.objective_code}</TableCell>
                                <TableCell>{format(new Date(objective.created_at), 'dd MMM yyyy')}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => handleAddTargets(objective)}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleViewTargets(objective)}
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

            <TargetsDialog
                open={openAddDialog}
                onClose={handleClose}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                targets={[]}
            />
        </>
    )
}

export default Targets