import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { getAgreement } from 'api';
import { Card } from 'containers';
import { Button } from 'components';
import { useAuth } from 'context';
import { UserRole } from 'const';
import { RecipientType } from 'types';
import { getCertificate } from 'api/GetCertificate';

type DetailsPopupType = {
    isOpen: boolean;
    handleClose: () => void;
    rowData: any;
};

const DetailsPopup = ({ isOpen, handleClose, rowData }: DetailsPopupType) => {
    const [requestId, setRequestId] = useState<string>();
    const [currentUser, setCurrentUser] = useState<RecipientType>();
    const [otherUser, setOtherUser] = useState<RecipientType>();

    const { user, userRole } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await getAgreement(rowData?.rowId);
                setRequestId(data.requestId);
                if (user.email === data.recipient1.user.email || userRole === UserRole.ADMIN) {
                    setCurrentUser(data.recipient1);
                    setOtherUser(data.recipient2);
                } else if (user.email === data.recipient2.user.email) {
                    setCurrentUser(data.recipient2);
                    setOtherUser(data.recipient1);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const downloadCert = async () => {
        if (requestId) {
            const { data, error } = await getCertificate(requestId);
            window.location.href = data;
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>View Signature Details</DialogTitle>
            <DialogContent sx={{ py: '20px' }}>
                {currentUser && otherUser ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '5px',
                            }}
                        >
                            <Card idx="1" isSigned={currentUser.isSigned} {...currentUser.user} />
                            <Card idx="2" isSigned={otherUser.isSigned} {...otherUser.user} />
                        </div>
                    </>
                ) : (
                    ''
                )}
            </DialogContent>
            <DialogActions sx={{ p: '20px', display: 'flex', justifyContent: 'center' }}>
                <Button
                    disabled={!(currentUser?.isSigned && otherUser?.isSigned)}
                    onClick={downloadCert}
                >
                    Download Signed Document
                </Button>
                {currentUser && userRole === UserRole.USER && currentUser.isSigned === false ? (
                    <Button
                        onClick={() => {
                            window.open(currentUser.signLink, '_blank');
                            console.log(currentUser.signLink);
                        }}
                    >
                        Sign on behalf of {user.name}
                    </Button>
                ) : (
                    <></>
                )}

                <Button varient="outlined" onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailsPopup;
