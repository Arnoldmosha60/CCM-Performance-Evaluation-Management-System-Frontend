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

const ActivitiesDialog = ({ open, onClose, selectedData, setSelectedData }) => {
  useEffect(() => {
    if (open && !selectedData.activities) {
      setSelectedData({ ...selectedData, activities: [''] });
    }
  }, [open, selectedData, setSelectedData]);

  const handleAddActivity = () => {
    setSelectedData({
      ...selectedData,
      activities: [...(selectedData.activities || []), '']
    });
  };

  const handleActivityChange = (index, value) => {
    const newActivities = [...(selectedData.activities || [])];
    newActivities[index] = value;
    setSelectedData({
      ...selectedData,
      activities: newActivities
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        indicator_id: selectedData.id,
        activities: selectedData.activities
      }
      const response = await axios.post(apis.saveActivitiesUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('refresh_token')}`
        }
      });
      if (response.data.success) {
        console.log('Success', response.data)
        message.success('Activities saved Successfully')
        onClose(true);
      } else {
        console.log('Error')
        message.error('Failed to save Activities')
      }
    } catch (error) {
      console.error('Error saving Indicators:', error);
      message.error('An error occured')
    } finally {
      console.log(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Activities</DialogTitle>
            <DialogContent>
                <DialogContentText style={{ color: 'black' }}>
                    Please enter the Activity for Indicator #{selectedData.indicator_code || ''}.
                </DialogContentText>

                <TextField
                    margin="dense"
                    label="Indicator Code"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedData.indicator_code || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                <TextField
                    margin="dense"
                    label="Indicator"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedData.indicator || ''}
                    disabled
                    InputProps={{ style: { color: 'black' } }}
                />

                {(selectedData.activities || []).map((activity, index) => (
                    <TextField
                        key={index}
                        margin="dense"
                        label={`Activity ${index + 1}`}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={activity}
                        onChange={(e) => handleActivityChange(index, e.target.value)}
                        InputProps={{ style: { color: 'black' } }}
                    />
                ))}
                <div className="flex justify-end mt-2">
                    <IconButton onClick={handleAddActivity} color="primary">
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

export default ActivitiesDialog