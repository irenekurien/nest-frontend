import React from 'react';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

type UserCardProps = {
    idx: string;
    isSigned: boolean;
    name: string;
    email: string;
};

const UserCard = ({ idx, isSigned, name, email }: UserCardProps) => {
    return (
        <Card
            sx={{
                width: '40%',
                margin: 'auto',
                marginTop: 2,
                boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
            }}
        >
            <CardContent>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '5px',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonIcon />
                    </Avatar>
                    <Typography variant="h6">Person {idx} Details</Typography>
                </div>
                <div>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Name:</span> {name}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Email:</span> {email}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: 'bold' }}>Status:</span>{' '}
                        {isSigned ? 'Signed' : 'Waiting'}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserCard;
