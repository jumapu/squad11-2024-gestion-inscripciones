import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import axiosInstance from "@/api/interceptor";
import NavAndDrawer from "../components/NavAndDrawer";
import { useParams } from "react-router-dom";
import Modal from "./components/Modal";

const GroupTable = () => {
  const { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [nameEvent, setnameEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isMembersModalOpen, setMembersModalOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `admin/event/team/${id}/allTeams`
        );
        if (response?.data?.grupo) {
          setGroups(response.data.grupo);
          setnameEvent(response.data.evento);
        } else {
          setGroups([]);
        }
      } catch (error) {
        toast.error("Error fetching groups");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [id]);

  const handleEdit = (group) => {
    setSelectedGroup(group);
    setEditModalOpen(true);
  };

  const handleDelete = (group) => {
    setSelectedGroup(group);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    toast.success(`Grupo con ID: ${selectedGroup.id} eliminado`);
    setGroups(groups.filter((g) => g.id !== selectedGroup.id));
    setDeleteModalOpen(false);
    setSelectedGroup(null);
  };

  const handleUpdateGroup = (updatedGroup) => {
    setGroups(groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
    toast.success(`Grupo ${updatedGroup.name} actualizado`);
    setEditModalOpen(false);
    setSelectedGroup(null);
  };

  const showMembers = (group) => {
    setSelectedGroup(group);
    setMembersModalOpen(true);
  };

  if (loading) return <div className="text-center mt-4">Cargando...</div>;

  return (
    <div className="overflow-hidden bg-gray-100 min-h-screen">
      <Toaster richColors position="top-center" />
      <NavAndDrawer />
      <div className="md:ml-[240px] md:w-[calc(100vw - 240px)] flex justify-center">
        <div className="flex flex-col items-center w-11/12 lg:w-5/6 gap-6">
          <a
            href="../eventos"
            className="text-2xl font-extrabold hover:scale-105 self-start"
          >
            <svg
              className="inline me-4"
              width="14"
              height="26"
              viewBox="0 0 14 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 22.945L5.34683 13L14 3.055L11.336 0L0 13L11.336 26L14 22.945Z"
                fill="black"
              />
            </svg>
            Lista de Grupos del Evento {nameEvent}
          </a>
          <div className="overflow-x-auto shadow-lg rounded-lg bg-white w-5/6 mt-4">
            <table className="w-max md:w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-300">
                <tr>
                  <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                    Grupo
                  </th>
                  <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                    Miembros
                  </th>
                  <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => (
                  <tr
                    key={group.id}
                    className="hover:bg-gray-200 transition duration-300"
                  >
                    <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                      {group.members ? group.members.length : 0}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-400">
                      <button
                        className="bg-blue-500 text-white font-semibold py-1 px-3 rounded shadow hover:bg-blue-600 transition duration-200 mr-2"
                        onClick={() => handleEdit(group)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-green-500 text-white font-semibold py-1 px-3 rounded shadow hover:bg-green-600 transition duration-200 mr-2"
                        onClick={() => showMembers(group)}
                      >
                        Ver Integrantes
                      </button>
                      <button
                        className="bg-red-500 text-white font-semibold py-1 px-3 rounded shadow hover:bg-red-600 transition duration-200"
                        onClick={() => handleDelete(group)}
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

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Editar Grupo"
        onConfirm={() => handleUpdateGroup(selectedGroup)}
      >
        <div>
          <label className="block mb-2 font-bold">Nombre del Grupo:</label>
          <input
            type="text"
            value={selectedGroup?.name || ""}
            onChange={(e) =>
              setSelectedGroup({ ...selectedGroup, name: e.target.value })
            }
            className="border-2 border-solid border-blue-600 rounded px-4 py-2 w-full font-semibold"
          />
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirmar Eliminación"
        onConfirm={confirmDelete}
      >
        <p>
          ¿Estás seguro de que quieres eliminar el grupo {selectedGroup?.name}?
        </p>
      </Modal>

      <Modal
        isOpen={isMembersModalOpen}
        onClose={() => setMembersModalOpen(false)}
        title="Integrantes del Grupo"
      >
        {selectedGroup ? (
          <div>
            <h3 className="font-semibold mb-4">Mentores:</h3>
            {selectedGroup.mentors.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg mt-4 mb-6">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                      Nombre
                    </th>
                    <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                      Rol
                    </th>
                    <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                      Tecnologías
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGroup.mentors.map((mentor) => (
                    <tr
                      key={mentor.id}
                      className="hover:bg-gray-200 transition duration-300"
                    >
                      <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                        {mentor.name}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                        {mentor.rol.join(", ")}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                        {mentor.technologies
                          ? mentor.technologies.join(", ")
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No hay mentores asignados.</div>
            )}

            <h3 className="font-semibold mb-4">Estudiantes:</h3>
            {selectedGroup.students.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg mt-4">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                      Nombre
                    </th>
                    <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                      Rol
                    </th>
                    <th className="py-3 px-6 border-b border-gray-400 text-left text-gray-600 font-semibold">
                      Tecnologías
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGroup.students.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-200 transition duration-300"
                    >
                      <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                        {student.name}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                        {student.rol}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-400 text-gray-800">
                        {student.technologies
                          ? student.technologies.join(", ")
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No hay estudiantes asignados.</div>
            )}
          </div>
        ) : (
          <div>No hay información disponible para este grupo.</div>
        )}
      </Modal>
    </div>
  );
};

export default GroupTable;
