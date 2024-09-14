import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
// import { IoIosInformation } from "react-icons/io";
// import { GoPencil } from "react-icons/go";
// import { IoTrashOutline } from "react-icons/io5";

const drawerWidth = 240;

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'text',
    width: 180,
  },
  {
    field: 'role',
    headerName: 'Rol',
    sortable: false,
    width: 80,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'team',
    headerName: 'Squad',
    sortable: false,
    width: 100,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 100,
    // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 30123456, lastName: 'Snow', firstName: 'Jon', email: 'jonsnow@example.com', role: 'Front', team:'7',  },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'lanister@example.com', role: 'Back', team:'20',  },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: { sm: `calc(100vw - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, maxWidth: "1440px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
