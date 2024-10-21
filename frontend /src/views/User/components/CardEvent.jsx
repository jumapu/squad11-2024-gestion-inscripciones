import axiosInstance from "@/api/interceptor";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventCard = ({ event }) => {
  const { id } = useParams();

  const [isRegistered, setIsRegistered] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const path = window.location.href.includes("mis_eventos");

  useEffect(() => {
    const { Mentors: mentors, Students: students } = event?.registration;

    mentors.forEach((element) => {
      if (element?.id == id) {
        setIsRegistered(true);
      }
    });
    students.forEach((element) => {
      if (element?.id == id) {
        setIsRegistered(true);
      }
    });
  }, [isRegistered]);

  const createdAt = new Date(...event.createdAt);
  const finishAt = new Date(...event.finishAt);

  console.log(event);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdDate = createdAt.toLocaleDateString("es-ES", options);
  const finishDate = finishAt.toLocaleDateString("es-ES", options);

  const subscribeEvent = async () => {
    try {
      const response = await axiosInstance.get(`/event/register/${event?.id}`);

      if (response?.status === 202) {
        toast.success("¡Ya está registrado en el evento!");
      }
      if (response?.status === 201) {
        toast.success("¡Se ha registrado en el evento!");

        setIsRegistered(true);
      }
    } catch (error) {
      toast.error("Error al inscribirse. Inténtalo de nuevo.");
    }
  };

  const handleShowTeam = () => {
    setTeams(event.teamGroup.teams);
    setShowTeamModal(true);
  };

  const handleCloseModal = () => {
    setShowTeamModal(false);
  };

  return (
    <div className="w-5/6 max-w-2xl mx-auto flex flex-col md:flex-row justify-center items-center border-2 rounded-3xl overflow-hidden mb-6 border-blue-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Toaster richColors position="top-center" />
      <div className="h-48 md:w-1/2">
        <img
          className="h-full w-full object-cover"
          alt={event.name}
          src={event.imgURL || "https://via.placeholder.com/300"}
        />
      </div>
      <div className="flex flex-col gap-4 w-full p-5 bg-white">
        <div className="flex flex-col md:flex-row text-center gap-3 md:items-baseline md:justify-between">
          <h2 className="text-2xl font-semibold text-blue-700">{event.name}</h2>
          <div className="flex flex-wrap gap-5 font-extrabold text-blue-600">
            <p className="text-md">{createdDate}</p>
            <span className="text-md">-</span>
            <p className="text-md">{finishDate}</p>
          </div>
        </div>
        <p className="text-md font-medium">
          <span className="font-semibold">Tipo</span>:{" "}
          {event.registration?.Students?.length ? "Acelerador" : "Evento"}
        </p>
        <p className="text-md font-medium">
          {event.description || "Detalles del evento no disponibles."}
        </p>
        <div className="text-end">
          {path ? (
            <button
              onClick={handleShowTeam}
              className="px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
            >
              Ver Team
            </button>
          ) : (
            <button
              onClick={isRegistered ? null : subscribeEvent}
              className={`px-8 py-2 rounded-lg text-white transition duration-300 ${
                isRegistered
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-500"
              }`}
            >
              {isRegistered ? "Inscripto" : "Inscribirse"}
            </button>
          )}
        </div>
      </div>

      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/5 lg:w-1/3 transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Equipo del Evento
            </h2>
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <div
                  key={index}
                  className="mb-5 p-5 bg-gray-50 border border-gray-300 rounded-lg shadow-md transition-shadow hover:shadow-lg"
                >
                  <h3 className="text-2xl font-semibold text-blue-500 mb-2">
                    Equipo {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-lg">Mentores:</strong>
                      <ul className="list-disc ml-4">
                        {team.mentors.map((mentor) => (
                          <li
                            key={mentor.id}
                            className="text-md text-gray-800 mb-2"
                          >
                            <div>
                              <span className="font-semibold">
                                {mentor.name}
                              </span>
                              <span className="block text-sm text-gray-600">
                                Rol: {mentor.rol.join(", ")}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-lg">Estudiantes:</strong>
                      <ul className="list-disc ml-4">
                        {team.students.map((student) => (
                          <li
                            key={student.id}
                            className="text-md text-gray-800 mb-2"
                          >
                            <div>
                              <span className="font-semibold">
                                {student.name}
                              </span>
                              <span className="block text-sm text-gray-600">
                                Rol: {student.rol.join(", ")}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-md text-gray-700">
                No hay equipo disponible.
              </p>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-6 w-full px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
