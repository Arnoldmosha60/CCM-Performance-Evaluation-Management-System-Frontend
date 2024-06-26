import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apis } from 'api/apis';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';

const ViewObjectives = () => {
    const { representativeId } = useParams();
    const [objectives, setObjectives] = useState([]);

    useEffect(() => {
        const fetchObjectives = async () => {
            try {
                const response = await axios.get(`${apis.getUserObjectivesUrl}/${representativeId}/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('refresh_token')}`
                    }
                });
                if (response.data.success) {
                    setObjectives(response.data.objectives);
                } else {
                    console.log('Error: ', response.error);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchObjectives();
    }, [representativeId]);

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Objectives for Representative
            </Typography>
            <Card>
                <CardContent>
                    <List>
                        {objectives.length > 0 ? (
                            objectives.map((objective, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemText primary={objective.objective} />
                                    </ListItem>
                                    {index < objectives.length - 1 && <Divider />}
                                </React.Fragment>
                            ))
                        ) : (
                            <Typography variant="body1">No objectives found.</Typography>
                        )}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ViewObjectives;
