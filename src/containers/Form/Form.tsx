import React from 'react';
import { Avatar, DialogContent, Typography } from '@mui/material';
import { Input } from 'components';
import PersonIcon from '@mui/icons-material/Person';

type User = {
    id: string;
    name: string;
    email: string;
};

type FormProps = {
    user: User;
    onChange: (updatedUser: User) => void;
};

const Form = ({ user, onChange }: FormProps) => {
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        onChange({ ...user, [name]: value });
    };

    return (
        <>
            <DialogContent>
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
                    <Typography variant="h6">Person {user.id} Details</Typography>
                </div>
                <Input label="Name" type="name" value={user.name} onChange={handleInputChange} />
                <Input
                    label="Email Address"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                />
            </DialogContent>
        </>
    );
};

export default Form;
