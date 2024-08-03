import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apis } from 'api/apis';
import { format } from 'date-fns';
import { Container, Typography, Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';

const ViewObjectives = () => {
    const { representativeId } = useParams();
    const [objectives, setObjectives] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchObjectives = async () => {
            try {
                const response = await axios.get(`${apis.getUserObjectivesUrl}/${representativeId}/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                    }
                });
                if (response.data.success) {
                    setObjectives(response.data.data);
                } else {
                    console.log('Error: ', response.error);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchObjectives();
    }, [representativeId]);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy');
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                Objectives for Representative
            </Typography>
            {loading ? (
                <CircularProgress style={{ display: 'block', margin: '2rem auto' }} />
            ) : (
                <Card>
                    <CardHeader
                        title="List of Objectives"
                        subheader={`Representative ID: ${representativeId}`}
                        style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
                    />
                    <CardContent>
                        <List>
                            {objectives.length > 0 ? (
                                objectives.map((objective, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemText
                                                primary={objective.objective}
                                                secondary={`Objective Code: ${objective.objective_code} |\nCreated At: ${formatDate(objective.created_at)}`}
                                            />
                                        </ListItem>
                                        {index < objectives.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))
                            ) : (
                                <Typography variant="body1" align="center">
                                    No objectives found.
                                </Typography>
                            )}
                        </List>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default ViewObjectives;
