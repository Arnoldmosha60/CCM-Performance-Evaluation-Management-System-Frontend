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

const Indicators = () => {
    const token = localStorage.getItem('refresh_token');
    const [data, setData] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedData, setSelectedData] = useState({});

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
                console.log('**************')
                console.log(response.data.data)
                setData(response.data.data);
            } else {
                console.log('Error fetching representatives');
            }
        };
        fetchData();
    }, [token]);

    const handleAddIndicators = (objective) => {
        setSelectedData(objective);
        setOpenAddDialog(true);
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
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((objective, index) => (
                            <TableRow key={objective.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell></TableCell>
                                <TableCell>#</TableCell>
                                <TableCell>#{objective.objective_code}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => handleAddIndicators(objective)}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        // onClick={() => handleViewObjectives(representative)}
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