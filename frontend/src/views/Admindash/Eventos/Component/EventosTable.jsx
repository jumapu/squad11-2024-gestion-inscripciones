import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { IoIosInformation } from "react-icons/io";
import { IoPencil } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosInstance from "@/api/interceptor.js";
import Box from "@mui/material/Box";

export const EventosTable = ({ eventos, pending }) => {
  const drawerWidth = 240;
  const customStyles = {
    table: {
      style: {
        sm: { width: "100%" },
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
        width: 100,
      },
    },
  };

  const columns = [
    {
      name: "Nombre del Evento",
      selector: (row) => row.name,
    },
    {
      name: "Estado",
      selector: (row) => {
        const fecha = new Date(
          row.createdAt[0],
          row.createdAt[1],
          row.createdAt[2]
        );
        const fechaActual = new Date();

        return fecha < fechaActual ? "Finalizado" : "En curso";
      },
    },
    {
      name: "Fecha de Inicio",
      selector: (row) =>
        new Date(
          row.createdAt[0],
          row.createdAt[1],
          row.createdAt[2]
        ).toLocaleDateString(),
    },
    {
      name: "Fecha de finalización",
      selector: (row) =>
        new Date(
          row.finishAt[0],
          row.finishAt[1],
          row.finishAt[2]
        ).toLocaleDateString(),
    },
    {
      name: "Crear Grupos",
      selector: (row) => (
        <div className="p-3">
          <a
            href={"/createTeam/" + row.id}
            className=" text-md px-3 py-2 bg-red-600 rounded-3xl hover:bg-red-500 text-white  cursor-pointer  "
          >
            Asignar
          </a>
        </div>
      ),
    },
    {
      name: "Grupos",
      selector: (row) => (
        <div className="p-3">
          <a
            href={"/team/" + row.id}
            className=" text-md px-3 py-2 bg-red-600 rounded-3xl hover:bg-red-500 text-white  cursor-pointer  "
          >
            Ver Mas...
          </a>
        </div>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div
          style={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip content="Informacion">
            <Link to={`Egresados/informacionForm/${row.id}`}>
              <IconButton className="bg-indigo-900 rounded-full">
                <IoIosInformation size={24} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Modificar Informacion">
            <Link to={`/Egresados/editar/${row.id}`}>
              <IconButton className="bg-indigo-900 rounded-full">
                <IoPencil />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="Borrar Informacion">
            <Link to={`/Egresados/borrar/${row.id}`}>
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
    <Box
      sx={{
        width: { sm: `calc(95vw - ${drawerWidth}px)` },
        ml: { sm: ` ${drawerWidth}px` },
        maxWidth: "1440px",
        border: "3px solid darkblue",
        borderRadius: "33px",
        marginTop: "20px",
        paddingBottom: "25px",
      }}
    >
      <DataTable
        columns={columns}
        data={eventos}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        progressPending={pending}
        responsive
      />
    </Box>
  );
};
