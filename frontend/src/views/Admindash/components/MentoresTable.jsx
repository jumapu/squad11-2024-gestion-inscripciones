import { IconButton, Tooltip } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { IoIosInformation } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

export const MentoresTable = ({ mentores, pending }) => {
  const drawerWidth = 240;
  const customStyles = {
    table: {
      style: {
        width: "100%",
        maxWidth: "1440px",
      },
    },
    headCells: {
      style: {
        color: "red",
        fontSize: "1rem",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Apellido",
      selector: (row) => row.lastName,
    },
    {
      name: "Empresa",
      selector: (row) => row.company,
    },

    {
      name: "Rol",
      selector: (row) => row.rol,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div
          style={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip content="Informacion">
            <Link to={`/Mentores/informacionForm/${row.id}`}>
              <IconButton className="bg-blue-900 rounded-full">
                <IoIosInformation size={24} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Modificar Informacion">
            <Link to={`/Mentores/editar/${row.id}`}>
              <IconButton className="bg-blue-900 rounded-full">
                <IoPencil />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Borrar Informacion">
            <Link to={`/Mentores/borrar/${row.id}`}>
              <IconButton className="bg-red-800 rounded-full">
                <IoTrashOutline />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        marginLeft: drawerWidth,
        border: "solid 3px darkblue",
        borderRadius: "20px",
        marginTop: "20px",
        paddingBottom: "25px",
      }}
    >
      <DataTable
        columns={columns}
        data={mentores}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        progressPending={pending}
        responsive
      />
    </div>
  );
};

export default MentoresTable;
