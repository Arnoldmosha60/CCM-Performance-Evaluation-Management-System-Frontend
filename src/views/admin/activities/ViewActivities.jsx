/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apis } from 'api/apis';
import { format } from 'date-fns';
import { Container, Typography, Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';

const ViewActivities = () => {
  const { indicatorId } = useParams();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${apis.getIndicatorActivitiesUrl}/${indicatorId}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('refresh_token')}`
          }
        });
        if (response.data.success) {
          setActivities(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false)
      }
    };
    fetchActivities();
  }, [indicatorId]);

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

return (
  <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        Activities for Indicator
      </Typography>

      {loading ? (
        <CircularProgress style={{ display: 'block', margin: '2rem auto' }} />
      ) : (
        <Card>
          <CardHeader
            title="List of Activities"
            subheader={`Indicator ID: ${indicatorId}`}
            style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
          />
          <CardContent>
            <List>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={activity.activity}
                        secondary={`Activity Code: ${activity.activity_code}\nCreated At: ${formatDate(activity.created_on)}`}
                      />
                    </ListItem>
                    {index < activities.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  No Activities found.
                </Typography>
              )}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
)
}

export default ViewActivities