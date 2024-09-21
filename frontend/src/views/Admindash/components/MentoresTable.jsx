import { useState, useEffect } from 'react';
import { IconButton, Tooltip } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { IoIosInformation } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axiosInstance from "@/api/interceptor.js";
import Box from "@mui/material/Box";

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
        color: "red",
        fontSize: "1rem",
        justifyContent: "center",
      }
    },
    cells: {
      style: {
        textAlign: "center",
        alignItems:"center",
        justifyContent: "center",
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
      name: 'Empresa',
      selector: row => row.company,
    },

    {
      name: 'Squad',
      selector: row => row.team,
    },
    {
      name: 'Acciones',
      cell: row => (
        <div style={{ display: 'flex', alignItems: 'center', textAlign:"center" }}>
          <Tooltip content="Informacion">
            <Link to={`/Mentores/informacionForm/${row.id}`}>
              <IconButton className='bg-indigo-900 rounded-full'>
                <IoIosInformation size={24} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Modificar Informacion">
            <Link to={`/Mentores/editar/${row.id}`}>
              <IconButton className='bg-indigo-900 rounded-full'>
                <IoPencil />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Borrar Informacion">
            <Link to={`/Mentores/borrar/${row.id}`}>
              <IconButton className='bg-red-800 rounded-full'>
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
        const Mentores = result.data.Mentors.Mentores || [];
        console.log(result);
        setMentores(Mentores);
        setPending(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMentores();
  }, []);

  return (
    <Box sx={{
      width: { sm: `calc(95vw - ${drawerWidth}px)` },
      ml: { sm: ` ${drawerWidth}px` },
      maxWidth: "1440px",
      border:"3px solid darkblue",
      borderRadius:"33px",
      marginTop: "20px",
      paddingBottom: "25px",
    }}>
      <DataTable
        columns={columns}
        data={Mentores}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        progressPending={pending}
        responsive
      />
    </Box>
  );
}

export default MentoresTable;
