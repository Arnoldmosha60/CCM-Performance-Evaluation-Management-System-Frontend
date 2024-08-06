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
    if (open && (!selectedData.activities || !selectedData.activityValues)) {
      setSelectedData({
        ...selectedData,
        activities: selectedData.activities || [''],
        activityValues: selectedData.activityValues || [''],
      });
    }
  }, [open, selectedData, setSelectedData]);

  const handleAddActivity = () => {
    setSelectedData({
      ...selectedData,
      activities: [...(selectedData.activities || []), ''],
      activityValues: [...(selectedData.activityValues || []), '']
    });
  };

  const handleActivityChange = (index, field, value) => {
    const newActivities = [...(selectedData.activities || [])];
    newActivities[index] = value;
    setSelectedData({
      ...selectedData,
      activities: newActivities
    });
  };

  const handleActivityValuesChange = (index, value) => {
    const newActivityValues = [...(selectedData.activityValues || [])];
    newActivityValues[index] = value;
    setSelectedData({
      ...selectedData,
      activityValues: newActivityValues
    });
  }

  const handleSubmit = async () => {
    try {
      const data = {
        indicator_id: selectedData.id,
        activities: selectedData.activities,
        activityValues: selectedData.activityValues,
      };
      console.log(data);
      const response = await axios.post(apis.saveActivitiesUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('refresh_token')}`
        }
      });
      if (response.data.success) {
        console.log('Success', response.data);
        message.success('Activities saved successfully');
        onClose(true);
      } else {
        console.log('Error');
        message.error('Failed to save activities');
      }
    } catch (error) {
      console.error('Error saving indicators:', error);
      message.error('An error occurred');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Activities</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: 'black' }}>
          Please enter the activity and its corresponding value for Indicator #{selectedData.indicator_code || ''}.
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

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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

          <TextField
            margin="dense"
            label="Indicator value"
            type="text"
            fullWidth
            variant="standard"
            value={selectedData.indicator_value || ''}
            disabled
            InputProps={{ style: { color: 'black' } }}
          />
        </div>

        {(selectedData.activities || []).map((activityData, index) => (
          <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <TextField
              margin="dense"
              label={`Activity ${index + 1}`}
              type="text"
              fullWidth
              variant="standard"
              value={activityData}
              onChange={(e) => handleActivityChange(index, 'activity', e.target.value)}
              InputProps={{ style: { color: 'black' } }}
            />
            <TextField
              margin="dense"
              label={`Value ${index + 1}`}
              type="text"
              fullWidth
              variant="standard"
              value={selectedData.activityValues[index] || ''}
              onChange={(e) => handleActivityValuesChange(index, e.target.value)}
              InputProps={{ style: { color: 'black' } }}
            />
          </div>
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
  );
};

export default ActivitiesDialog;
