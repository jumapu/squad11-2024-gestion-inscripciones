import React, { useState, useEffect } from "react";
import NavAndDrawer from "../components/NavAndDrawer";
import { toast, Toaster } from "sonner";
import axiosInstance from "@/api/interceptor.js";
import { useParams } from "react-router-dom";

const TeamGroupFilter = () => {
  const { id } = useParams();

  const initialFilters = JSON.parse(localStorage.getItem("filters")) || [];
  const [filters, setFilters] = useState(initialFilters);
  const [filterType, setFilterType] = useState("student");
  const [filterData, setFilterData] = useState({
    rol: "",
    quantity: "",
    technologies: [],
  });

  useEffect(() => {
    console.log("Guardando filtros en localStorage:", filters);
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const addFilter = () => {
    const quantityValue = parseInt(filterData.quantity, 10);

    if (!filterData.rol) {
      toast.error("El rol no puede estar vacío.");
      return;
    }
    if (!filterData.quantity) {
      toast.error("La cantidad no puede estar vacío.");
      return;
    }
    if (quantityValue <= 0 || String(quantityValue).startsWith("0")) {
      toast.error(
        "La cantidad debe ser un número positivo y no puede empezar con cero."
      );
      return;
    }

    const newFilter = { type: filterType, ...filterData };
    setFilters((prevFilters) => [...prevFilters, newFilter]);
    toast.success("Filtro agregado exitosamente!");
    setFilterData({ rol: "", quantity: "", technologies: [] });
  };

  const removeFilter = (index) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
    toast.success("Filtro eliminado exitosamente!");
  };

  const handleSubmit = () => {
    const studentFilter = [];
    const mentorFilter = [];

    filters.forEach((filter) => {
      const { rol, quantity, technologies, groups = 1 } = filter;

      // Crear el objeto del filtro en el formato deseado
      const filterData = {
        rol,
        quantity: parseInt(quantity, 10),
        technologies: technologies || [],
      };

      if (filter.type === "student") {
        studentFilter.push(filterData);
      } else if (filter.type === "mentor") {
        mentorFilter.push(filterData);
      }
    });

    const dataToSend = {
      studentFilter,
      mentorFilter,
    };

    axiosInstance
      .post(`admin/event/team/create/${id}`, dataToSend)
      .then((result) => {
        if (result?.status === 201) {
          toast.success("Grupo creado exitosamente!");
          setFilters([]);
          localStorage.removeItem("filters");
          return;
        }
        toast.error("Error al crear el grupo.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al crear el grupo.");
      });
  };

  return (
    <div className="overflow-hidden">
      <Toaster richColors position="top-center" />
      <div>
        <NavAndDrawer />
      </div>
      <div className="md:ml-[240px] md:w-[calc(100vw - 240px)] flex justify-center">
        <div className="w-5/6 md:w-2/3">
          <h3 className="text-2xl font-bold mb-4">Agregar Filtros</h3>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2  rounded-lg bg-gray-100 border-2 border-solid border-blue-600"
            >
              <option value="student">Estudiante</option>
              <option value="mentor">Mentor</option>
            </select>
            <input
              name="rol"
              placeholder="Rol"
              value={filterData.rol}
              onChange={handleChange}
              className="p-2  rounded-lg bg-gray-100 placeholder:text-black border-2 border-solid border-blue-600"
            />
            <input
              name="quantity"
              type="number"
              placeholder="Cantidad"
              value={filterData.quantity}
              onChange={handleChange}
              className="p-2 rounded-lg  bg-gray-100 placeholder:text-black  border-2 border-solid border-blue-600"
            />
            <input
              name="technologies"
              placeholder="Tecnologías (separadas por coma, opcional)"
              value={filterData.technologies.join(",")}
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  technologies: e.target.value
                    .split(",")
                    .map((tech) => tech.trim()),
                })
              }
              className="p-2  rounded-lg  bg-gray-100 placeholder:text-black border-2 border-solid border-blue-600"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={addFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
            >
              Agregar Filtro
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
            >
              Crear grupos
            </button>
          </div>
          <h3 className="text-2xl font-bold mt-10 mb-4">Filtros Agregados</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Tipo</th>
                  <th className="py-3 px-6 text-left">Rol</th>
                  <th className="py-3 px-6 text-left">Cantidad</th>
                  <th className="py-3 px-6 text-left">Tecnologías</th>
                  <th className="py-3 px-6 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filters.map((filter, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left font-semibold">
                      {filter.type === "student" ? "Estudiante" : "Mentor"}
                    </td>
                    <td className="py-3 px-6 font-semibold">{filter.rol}</td>
                    <td className="py-3 px-6 font-semibold">
                      {filter.quantity}
                    </td>
                    <td className="py-3 px-6 font-semibold">
                      {filter.technologies.join(", ")}
                    </td>
                    <td className="py-3 px-6 font-semibold">
                      <button
                        onClick={() => removeFilter(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamGroupFilter;
