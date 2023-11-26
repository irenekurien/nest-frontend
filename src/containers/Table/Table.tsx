import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAgreemets } from 'api';
import { usePopUp } from 'hooks';
import { DetailsPopup } from 'containers';
import { RecipientType } from 'types';

type ResponseType = {
    id: string;
    recipient1: RecipientType;
    recipient2: RecipientType;
};

type DataTableProps = {
    refresh: boolean;
    setRefresh: (r: boolean) => void;
};

const DataTable = ({ refresh, setRefresh }: DataTableProps) => {
    const [rows, setRows] = React.useState([]);
    const { popUp, handlePopUpOpen, handlePopUpClose } = usePopUp(['detailsPopup']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await getAgreemets();
                const formattedRows = data.map((item: ResponseType) => ({
                    id: item.id,
                    user1: item.recipient1?.user?.name || '',
                    user2: item.recipient2?.user?.name || '',
                    status: getStatus(
                        item.recipient1?.isSigned || false,
                        item.recipient2?.isSigned || false
                    ),
                    details: 'More Details',
                }));
                setRows(formattedRows);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [refresh]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'user1', headerName: 'Signer I', flex: 1 },
        { field: 'user2', headerName: 'Signer II', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'More Details',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <p onClick={() => openDetailsPopup(params.row.id, params.row)}>View Details</p>
            ),
        },
    ];

    const openDetailsPopup = (rowId: number, rowData: any) => {
        handlePopUpOpen('detailsPopup', { rowId, rowData });
    };

    const closeDetailsPopup = () => {
        handlePopUpClose('detailsPopup');
        setRefresh(!refresh);
    };

    const getStatus = (signedByUser1: boolean, signedByUser2: boolean) => {
        if (signedByUser1 && signedByUser2) {
            return 'Completed';
        } else if (signedByUser1 || signedByUser2) {
            return '1/2 signed';
        } else {
            return '0/2 Signed';
        }
    };

    return (
        <div style={{ height: '100%', width: '75%', margin: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 15]}
            />
            <DetailsPopup
                isOpen={popUp.detailsPopup.isOpen}
                handleClose={closeDetailsPopup}
                rowData={popUp.detailsPopup.data}
            />
        </div>
    );
};

export default DataTable;
