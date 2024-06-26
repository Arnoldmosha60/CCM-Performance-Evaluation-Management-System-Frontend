/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
    IconButton,
} from '@mui/material';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import { apis } from 'api/apis';
import { message } from 'antd'

const IndicatorsDialog = ({ open, onClose, selectedData, setSelectedData }) => {
    useEffect(() => {
        if (open && !selectedData.objectives) {
            setSelectedData({ ...selectedData, indicators: [''] });
        }
    }, [open, selectedData, setSelectedData]);

    const handleAddIndicator = () => {
        setSelectedData({
            ...selectedData,
            indicators: [...(selectedData.objectives || []), '']
        });
    };

    const handleIndicatorChange = (index, value) => {
        const newIndicators = [...(selectedData.indicators || [])];
        newIndicators[index] = value;
        setSelectedData({
            ...selectedData,
            indicators: newIndicators
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Indicators</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ color: 'black' }}>
                    Please enter the indicators for this objective.
                </DialogContentText>

                <TextField
                    margin="dense"
                    label="Objective"
                    type="text"
                    fullWidth
                    variant="standard"
                    // value={selectedData.user.fullname || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                {(selectedData.indicators || []).map((indicator, index) => (
                    <TextField
                        key={index}
                        margin="dense"
                        label={`Indicator ${index + 1}`}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={indicator}
                        onChange={(e) => handleIndicatorChange(index, e.target.value)}
                        InputProps={{ style: { color: 'black' } }}
                    />
                ))}

                <div className="flex justify-end mt-2">
                    <IconButton onClick={handleAddIndicator} color="primary">
                        <MdAdd />
                    </IconButton>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={'handleSubmit'} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default IndicatorsDialog