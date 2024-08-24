import DataTable from 'react-data-table-component';


//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
	rows: {
		style: {
			minHeight: '50px', // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px', // override the cell padding for head cells
			paddingRight: '8px',
      width:'10vw',
      responsive: true,
      fontWeigth: 600,
      fontSize: "1rem",
		},
	},
	cells: {
		style: {
			paddingLeft: '8px', // override the cell padding for data cells
			paddingRight: '8px',
      flexWrap: "wrap",
      width:'10vw',
      responsive: true,
		},
	},
};

const columns = [
  {
    name: 'Nombre Evento',
    selector: row => row.eventname,
  },
  {
    name: 'Tipo',
    selector: row => row.type,
    
  },
  {
    name: 'Fecha de Inicio',
    selector: row => row.datestart,
    
  },
  {
    name: 'Fecha de Finalizacion',
    selector: row => row.dateend,
    
  },
  {
    name: 'Team',
    selector: row => row.team,
    
  },
];

const data = [
  {
    id: 1,
    eventname: 'AceleradorIT',
    type: 'Simulacion Laboral',
    datestart:'2024-10-15',
    dateend:"2024-12-15",
    team: "aceleradorSquads",
  },
  {
    id: 2,
    eventname: 'TestingFundamental',
    type: 'Webinar',
    datestart:'2024-09-01',
    dateend:"2024-10-10",
    team: "webinar",
  },
]

 function TablaEventos() {
  return (
    <DataTable
      columns={columns}
      data={data}
      selectableRows
      customStyles={customStyles}
    />
  );
}
export default TablaEventos

