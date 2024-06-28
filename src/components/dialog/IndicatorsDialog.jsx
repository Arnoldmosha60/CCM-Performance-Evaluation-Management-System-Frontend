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

    const handleAddTarget = () => {
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
    <div>IndicatorsDialog</div>
  )
}

export default IndicatorsDialog