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
import {message} from 'antd'

const ObjectivesDialog = ({ open, onClose, selectedData, setSelectedData }) => {

    useEffect(() => {
        if (open && !selectedData.objectives) {
            setSelectedData({ ...selectedData, objectives: [''] });
        }
    }, [open, selectedData, setSelectedData]);

    const handleAddObjective = () => {
        setSelectedData({
            ...selectedData,
            objectives: [...(selectedData.objectives || []), '']
        });
    };

    const handleObjectiveChange = (index, value) => {
        const newObjectives = [...(selectedData.objectives || [])];
        newObjectives[index] = value;
        setSelectedData({
            ...selectedData,
            objectives: newObjectives
        });
    };

    const handleSubmit = async () => {
        try {
            const data = {
                representative_id: selectedData.id,
                objectives: selectedData.objectives
            }
            const response = await axios.post(apis.saveObjectivesUrl, data,{
                headers: {
                    'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                }
            });
            if (response.data.success) {
                console.log('Success', response.data)
                message.success('Objectives saved Successfully')
                onClose(true);
            } else {
                console.log('Error')
                message.error('Failed to save Objectives')
            }
        } catch (error) {
            console.error('Error saving objectives:', error);
            message.error('An error occured')
        } finally {
            console.log(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Details</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ color: 'black' }}>
                    Objectives Form
                </DialogContentText>

                <TextField
                    margin="dense"
                    label="Representative"
                    type="text"
                    fullWidth
                    variant="standard"
                    // value={selectedData.user.fullname || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                <TextField
                    margin="dense"
                    label="Wilaya"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedData.wilaya || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                {(selectedData.objectives || []).map((objective, index) => (
                    <TextField
                        key={index}
                        margin="dense"
                        label={`Objective ${index + 1}`}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        InputProps={{ style: { color: 'black' } }}
                    />
                ))}

                <div className="flex justify-end mt-2">
                    <IconButton onClick={handleAddObjective} color="primary">
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
};

export default ObjectivesDialog;
