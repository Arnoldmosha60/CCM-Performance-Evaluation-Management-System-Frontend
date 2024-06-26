/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
import ObjectivesDialog from 'components/dialog/ObjectivesDialog';
import axios from 'axios';
import { apis } from 'api/apis';
import {useNavigate} from 'react-router-dom'

const Objectives = () => {
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
      const response = await axios.get(apis.getWilayaRepresentativesUrl, {
        headers: {
          'Authorization': `Token ${token}`
        },
      });

      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.log('Error fetching representatives');
      }
    };
    fetchData();
  }, [token]);

  const handleAddObjective = (representative) => {
    setSelectedData(representative);
    setOpenAddDialog(true);
  };

  const handleViewObjectives = (representative) => {
    console.log(representative.id)
    navigate(`/admin/view_objectives/${representative.id}/`);  // Assuming 'id' is the representative's identifier
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Representative</TableCell>
              <TableCell>CCM Number</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>District</TableCell>
              <TableCell>District Code</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((representative, index) => (
              <TableRow key={representative.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{representative.user.fullname}</TableCell>
                <TableCell>{representative.user.ccm_number}</TableCell>
                <TableCell>{representative.user.contact}</TableCell>
                <TableCell>{representative.wilaya}</TableCell>
                <TableCell>#{representative.wilaya_code}</TableCell>
                <TableCell>{representative.mkoa}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => handleAddObjective(representative)}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleViewObjectives(representative)}
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

      <ObjectivesDialog
        open={openAddDialog}
        onClose={handleClose}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        objectives={[]}
      />

      {/* <ViewObjectivesDialog
        open={openViewDialog}
        onClose={handleClose}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        readOnly={true}
      /> */}
    </>
  );
};

export default Objectives;
