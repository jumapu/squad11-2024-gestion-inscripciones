import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { toast, Toaster } from "sonner";
import axiosInstance from "@/api/interceptor";
import EventCard from "./components/CardEvent";

const Events = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  useEffect(() => {
    const eventos = async () => {
      try {
        const response = await axiosInstance.get(`/event/myEvents`);

        if (response?.data?.events) {
          setEvents(response?.data?.events);
        }
      } catch (error) {
        console.log(error);

        toast.error("Error fetching groups");
      } finally {
      }
    };
    eventos();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    "Nuevo evento: Taller de React el 10 de octubre.",
    "Recuerda inscribirte al Acelerador IT.",
    "Se han agregado nuevos recursos al programa de mentoría.",
    "No olvides entregar tu proyecto final antes del 15 de octubre.",
  ];

  return (
    <div className="flex h-full">
      <Navbar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <Toaster richColors position="top-center" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col sm:ml-60">
        <header className="flex justify-between items-center bg-white p-4 shadow">
          <div className="flex items-center">
            <button onClick={handleDrawerToggle} className="sm:hidden text-2xl">
              ☰
            </button>
          </div>
          <div className="flex items-center space-x-4 gap-10">
            <div className="relative" ref={notificationsRef}>
              <button onClick={toggleNotifications} className="relative">
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="23" cy="23" r="23" fill="#2F68A1" />
                  <path
                    d="M23 32.5C23.3964 32.5 23.7668 32.3831 24.0784 32.1822C25.0068 31.5836 24.1046 30.5 23 30.5C21.8954 30.5 20.9932 31.5836 21.9216 32.1822C22.2332 32.3831 22.6036 32.5 23 32.5ZM29.5858 27.0858C29.2107 26.7107 29 26.202 29 25.6716V21.5C29 18.6706 27.6155 16.266 25.1518 15.3741C24.7771 15.2384 24.5 14.8986 24.5 14.5C24.5 13.67 23.83 13 23 13C22.17 13 21.5 13.67 21.5 14.5C21.5 14.8986 21.223 15.2386 20.8483 15.3746C18.3923 16.2657 17 18.6621 17 21.5V25.6716C17 26.202 16.7893 26.7107 16.4142 27.0858L15.2071 28.2929C15.0745 28.4255 15 28.6054 15 28.7929C15 29.1834 15.3166 29.5 15.7071 29.5H30.2929C30.6834 29.5 31 29.1834 31 28.7929C31 28.6054 30.9255 28.4255 30.7929 28.2929L29.5858 27.0858ZM27 25.5C27 26.6046 26.1046 27.5 25 27.5H21C19.8954 27.5 19 26.6046 19 25.5V21.5C19 19.02 20.51 17 23 17C25.49 17 27 19.02 27 21.5V25.5Z"
                    fill="white"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  4
                </span>
              </button>
              {/* Dropdown de notificaciones */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">Notificaciones</h3>
                  <ul className="divide-y divide-gray-200">
                    {notifications.map((notification, index) => (
                      <li key={index} className="py-2">
                        {notification}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <div className="text-right mr-4">
                <p className="font-medium">Fulano de Tal</p>
                <p className="text-gray-500 text-sm">Administrador</p>
              </div>
              <div className="rounded-full w-10 h-10 bg-gray-300" />
            </div>
          </div>
        </header>
        <main className="p-6">
          <article className="flex flex-col place-items-center gap-10">
            <h2 className="text-5xl font-extrabold pb-3">Eventos</h2>
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p>No hay eventos disponibles.</p>
            )}
          </article>
        </main>
      </div>
    </div>
  );
};

export default Events;
