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

const TargetsDialog = ({ open, onClose, selectedData, setSelectedData }) => {
    useEffect(() => {
        if (open && !selectedData.targets) {
            setSelectedData({ ...selectedData, targets: [''] });
        }
    }, [open, selectedData, setSelectedData]);

    const handleAddTarget = () => {
        setSelectedData({
            ...selectedData,
            targets: [...(selectedData.targets || []), '']
        });
    };

    const handleTargetChange = (index, value) => {
        const newTargets = [...(selectedData.targets || [])];
        newTargets[index] = value;
        setSelectedData({
            ...selectedData,
            targets: newTargets
        });
    };

    const handleSubmit = async () => {
        try {
            const data = {
                objective_id: selectedData.id,
                targets: selectedData.targets
            }
            const response = await axios.post(apis.saveTargetsUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            if (response.data.success) {
                console.log('Success', response.data)
                message.success('Targets saved Successfully')
                onClose(true);
            } else {
                console.log('Error')
                message.error('Failed to save Targets')
            }
        } catch (error) {
            console.error('Error saving Targets:', error);
            message.error('An error occured')
        } finally {
            console.log(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Targets</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ color: 'black' }}>
                    Please enter the Targets for Objective #{selectedData.objective_code || ''}.
                </DialogContentText>

                <TextField
                    margin="dense"
                    label="Objective Code"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedData.objective_code || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                <TextField
                    margin="dense"
                    label="Objective"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedData.objective || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                {(selectedData.targets || []).map((target, index) => (
                    <TextField
                        key={index}
                        margin="dense"
                        label={`Target ${index + 1}`}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={target}
                        onChange={(e) => handleTargetChange(index, e.target.value)}
                        InputProps={{ style: { color: 'black' } }}
                    />
                ))}

                <div className="flex justify-end mt-2">
                    <IconButton onClick={handleAddTarget} color="primary">
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
    );
}

export default TargetsDialog;
