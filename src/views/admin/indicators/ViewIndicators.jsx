/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apis } from 'api/apis';
import { format } from 'date-fns';
import { Container, Typography, Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';

const ViewIndicators = () => {
  const {targetId} = useParams();
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await axios.get(`${apis.getTargetIndicatorsUrl}/${targetId}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('refresh_token')}`
          }
        });
        if (response.data.success) {
          setIndicators(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false)
      }
    };
    fetchIndicators();
  }, [targetId]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        Indicators for Target
      </Typography>

      {loading ? (
        <CircularProgress style={{ display: 'block', margin: '2rem auto' }} />
      ) : (
        <Card>
          <CardHeader
            title="List of Indicators"
            subheader={`Target ID: ${targetId}`}
            style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
          />
          <CardContent>
            <List>
              {indicators.length > 0 ? (
                indicators.map((indicator, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={indicator.indicator}
                        secondary={`Indicator Code: ${indicator.indicator_code} |\nPercentage: ${indicator.achievement_percentage}% |\nCreated At: ${formatDate(indicator.created_on)}`}
                      />
                    </ListItem>
                    {index < indicators.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  No Indicators found.
                </Typography>
              )}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

export default ViewIndicators