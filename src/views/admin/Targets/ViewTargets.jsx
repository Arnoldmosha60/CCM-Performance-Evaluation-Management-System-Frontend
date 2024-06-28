/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apis } from 'api/apis';
import { format } from 'date-fns';
import { Container, Typography, Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';


const ViewTargets = () => {
  const { objectiveId } = useParams();
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const response = await axios.get(`${apis.getObjectiveTargetsUrl}/${objectiveId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('refresh_token')}`
          }
        });
        if (response.data.success) {
          setTargets(response.data.data)
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTargets();
  }, [objectiveId]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        Targets for Objective
      </Typography>
      {loading ? (
        <CircularProgress style={{ display: 'block', margin: '2rem auto' }} />
      ) : (
        <Card>
          <CardHeader
            title="List of Targets"
            subheader={`Objective ID: ${objectiveId}`}
            style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
          />
          <CardContent>
            <List>
              {targets.length > 0 ? (
                targets.map((target, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={target.target}
                        secondary={`Target Code: ${target.target_code}\nCreated At: ${formatDate(target.created_on)}`}
                      />
                    </ListItem>
                    {index < targets.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  No Targets found.
                </Typography>
              )}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

export default ViewTargets