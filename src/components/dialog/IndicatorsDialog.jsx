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
import { message } from 'antd';

const IndicatorsDialog = ({ open, onClose, selectedData, setSelectedData }) => {
    useEffect(() => {
        if (open && !selectedData.indicators) {
            setSelectedData({ ...selectedData, indicators: [''] });
        }
    }, [open, selectedData, setSelectedData]);

    const handleSubmit = async () => {
        try {
            const data = {
                target_id: selectedData.id,
                indicators: selectedData.indicators,
            }
            const response = await axios.post(apis.saveIndicatorsUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            if (response.data.success) {
                console.log('Success', response.data)
                message.success('Indicators saved Successfully')
                onClose(true);
            } else {
                console.log('Error')
                message.error('Failed to save Indicators')
            }
        } catch (error) {
            console.error('Error saving Indicators:', error);
            message.error('An error occured')
        } finally {
            console.log(false);
        }
    }

    const handleAddIndicator = () => {
        setSelectedData({
            ...selectedData,
            indicators: [...(selectedData.indicators || []), '']
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
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Indicators</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ color: 'black' }}>
                    Please enter the Indicator for Target #{selectedData.target_code || ''}.
                </DialogContentText>

                <TextField
                    margin="dense"
                    label="Target Code"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedData.target_code || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                <TextField
                    margin="dense"
                    label="Target"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedData.target || ''}
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
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default IndicatorsDialog