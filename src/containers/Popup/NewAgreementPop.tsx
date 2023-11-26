import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from 'components';
import { Form } from 'containers';
import { createNewAgreement } from 'api';

type NewAgreementPopupType = {
    isOpen: boolean;
    handleClose: () => void;
};

const NewAgreementPopup = ({ isOpen, handleClose }: NewAgreementPopupType) => {
    const [user1, setUser1] = useState({ id: '1', name: '', email: '' });
    const [user2, setUser2] = useState({ id: '2', name: '', email: '' });

    const handleFormSubmit = async () => {
        const { data, error } = await createNewAgreement({
            user1Name: user1.name,
            user1Email: user1.email,
            user2Name: user2.name,
            user2Email: user2.email,
        });

        if (error) {
            console.error(error.name);
        }

        if (data) {
            setUser1({ id: '1', name: '', email: '' });
            setUser2({ id: '1', name: '', email: '' });
            handleClose();
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Create New Agreement</DialogTitle>
            <DialogContent>
                <Form user={user1} onChange={setUser1} />
                <Form user={user2} onChange={setUser2} />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleFormSubmit}>Send For Signature</Button>
                <Button varient="outlined" onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewAgreementPopup;
