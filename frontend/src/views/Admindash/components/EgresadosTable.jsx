import { useState, useEffect } from 'react';
import { IconButton, Tooltip } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { IoIosInformation } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';


const customStyles = {
  table: {
    style: {
      width: '100%',
      justifyContent: "around",
      responsive: true,
    }
  },
  headCells: {
    style: {
      fontSize: "1rem",
      justifyContent: "center",
    },
    rows: {
      style: {
        height: '55px',
        maxWidth: '98vw',
        justify: 'center',
        align: "center",
        responsive: true,
      },
    }
  },
  cells: {
    style: {
      textAlign: "center",
      justifyContent: 'center',
      responsive: false,
    }
  },
};

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
  },
  {
    name: 'Nombre',
    selector: row => row.name,
  },
  {
    name: 'Apellido',
    selector: row => row.surname,
  },
  {
    name: 'Rol',
    selector: row => row.role,
  },
  {
    name: 'Team',
    selector: row => row.team,
  },
  {
    name: 'Acciones',
    cell: () =>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip className='bg-slate-300' content="Informacion">
          <Link to='/dashboard/egresados/informacionForm'>
            <IconButton className='bg-slate-800 btn-grp' radius="full">
              <IoIosInformation />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip className='bg-slate-300' content="Modificar Informacion">
          <Link to='/dashboard/egresados/informacionForm' />
          <IconButton className='bg-slate-800 btn-grp editCita' radius="full" />
          <IoPencil />
        </Tooltip>
        <Tooltip className='bg-slate-300' content="Borrar Informacion">
          <Link to='/dashboard/egresados/informacionForm'>
            <IconButton className='bg-slate-800 btn-grp' radius="full">
              <IoTrashOutline />
            </IconButton>
          </Link>
        </Tooltip>

      </div>
  },
];

const datos = [

]

export const EgresadosTable = () => {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(datos);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div>
      <DataTable
        columns={columns}
        data={datos}
        customStyles={customStyles}
        expandableRows
        pagination
        paginationPerPage={10}
        progressPending={pending}
        responsive
        onSelectedRowsChange={(data) => console.log(data)}
      />
    </div>
  )
}

export default EgresadosTable