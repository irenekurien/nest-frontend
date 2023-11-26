import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUser } from 'api';
import { useAuth } from 'context';
import { DataTable } from 'containers';
import { Box, Container, Typography } from '@mui/material';
import { Button } from 'components';
import { usePopUp } from 'hooks';
import NewAgreementPopup from 'containers/Popup/NewAgreementPop';
import { UserRole } from 'const';

export default function Dashboard() {
    const router = useRouter();
    const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp(['newAgreementPopup']);
    const [refresh, setRefresh] = useState(false);

    const { user, userRole, setSessionData } = useAuth();

    useEffect(() => {
        const checkUserAuth = async () => {
            const { data, error } = await getUser();

            if (error) {
                router.push('/');
            }
            setSessionData(data);
        };
        checkUserAuth();
        setRefresh(true);
    }, [refresh]);

    const openNewAgreementPopup = () => {
        handlePopUpOpen('newAgreementPopup');
    };

    const closeNewAgreementPopup = () => {
        handlePopUpClose('newAgreementPopup');
        setRefresh(!refresh);
    };

    return (
        <Container component="main">
            <Box
                sx={{
                    padding: '20px',
                    color: 'secondary.main',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '25px',
                        margin: '25px',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: 'primary.main',
                        }}
                    >
                        Dashboard
                    </Typography>
                    {userRole === UserRole.ADMIN ? (
                        <Button onClick={openNewAgreementPopup}>New Agreement</Button>
                    ) : (
                        <>{user?.name}</>
                    )}
                </Box>
                <DataTable refresh={refresh} setRefresh={setRefresh}/>
                <NewAgreementPopup
                    isOpen={popUp.newAgreementPopup.isOpen}
                    handleClose={closeNewAgreementPopup}
                />
            </Box>
        </Container>
    );
}
