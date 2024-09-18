import { useState, useEffect } from 'react';
import { IconButton, Tooltip } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { IoIosInformation } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axiosInstance from "@/api/interceptor.js";

export const MentoresTable = () => {
  const drawerWidth = 240;
  const customStyles = {
    table: {
      style: {
        width: "100%", 
        maxWidth: "1440px",
      }
    },
    headCells: {
      style: {
        fontSize: "1rem",
        justifyContent: "center",
      }
    },
    cells: {
      style: {
        textAlign: "center",
      }
    }
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
      selector: row => row.rol,
    },
    {
      name: 'Team',
      selector: row => row.team,
    },
    {
      name: 'Acciones',
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip content="Informacion">
            <Link to={`/Mentores/informacionForm/${row.id}`}>
              <IconButton className='bg-slate-800'>
                <IoIosInformation />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Modificar Informacion">
            <Link to={`/Mentores/editar/${row.id}`}>
              <IconButton className='bg-slate-800'>
                <IoPencil />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Borrar Informacion">
            <Link to={`/Mentores/borrar/${row.id}`}>
              <IconButton className='bg-slate-800'>
                <IoTrashOutline />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  const [Mentores, setMentores] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchMentores = async () => {
      try {
        const result = await axiosInstance.get("admin/user/all");
        const mentores = result.data.Student.Mentores || [];
        console.log(result);
        setMentores(mentores);
        setPending(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMentores();
  }, []);

  return (
    <div style={{marginLeft: drawerWidth }}>
      <DataTable
        columns={columns}
        data={Mentores}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        progressPending={pending}
        responsive
      />
    </div>
  );
}

export default MentoresTable;
