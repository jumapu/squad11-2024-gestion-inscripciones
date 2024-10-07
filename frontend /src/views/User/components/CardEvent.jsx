import axiosInstance from "@/api/interceptor";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";

const EventCard = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const registeredEvents =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];
    const isAlreadyRegistered = registeredEvents.some((e) => e.id === event.id);
    setIsRegistered(isAlreadyRegistered);
  }, [event.id]);

  const createdAt = new Date(...event.createdAt);
  const finishAt = new Date(...event.finishAt);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdDate = createdAt.toLocaleDateString("es-ES", options);
  const finishDate = finishAt.toLocaleDateString("es-ES", options);

  const subscribeEvent = async () => {
    console.log(event.id);
    try {
      const response = await axiosInstance.get(`/event/register/${event?.id}`);

      if (response?.status === 200) {
        const registeredEvents =
          JSON.parse(localStorage.getItem("registeredEvents")) || [];
        registeredEvents.push(event);
        localStorage.setItem(
          "registeredEvents",
          JSON.stringify(registeredEvents)
        );

        toast.success("¡Inscripción exitosa!");
        setIsRegistered(true);
      }
    } catch (error) {
      toast.error("Error al inscribirse. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="w-5/6 flex flex-col md:flex-row justify-center items-center border-solid border-2 rounded-3xl overflow-hidden mb-6 border-blue-600">
      <div className="h-96  md:w-2/4">
        <img
          className="h-full "
          alt={event.name}
          src={event.imgURL || "https://via.placeholder.com/300"}
        />
      </div>
      <div className="flex flex-col gap-10  w-5/6 p-5">
        <div className="flex flex-col md:flex-row text-center gap-3 md:items-baseline md:justify-between">
          <h2>{event.name}</h2>
          <div className="flex flex-wrap gap-10 font-extrabold text-blue-600">
            <svg
              width="21"
              height="19"
              viewBox="0 0 21 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.297 19C9.08846 19 7.95643 18.7704 6.90094 18.3111C5.84546 17.8518 4.92694 17.2313 4.1454 16.4497C3.36386 15.6682 2.74346 14.7496 2.2842 13.694C1.82494 12.6385 1.59531 11.5064 1.59531 10.2977C1.59531 9.08906 1.82494 7.95696 2.2842 6.9014C2.74346 5.84584 3.36386 4.92727 4.1454 4.14567C4.92694 3.36408 5.84546 2.74364 6.90094 2.28435C7.95643 1.82506 9.08846 1.59542 10.297 1.59542C11.5056 1.59542 12.6376 1.82506 13.6931 2.28435C14.7486 2.74364 15.6671 3.36408 16.4487 4.14567C17.2302 4.92727 17.8506 5.84584 18.3099 6.9014C18.7691 7.95696 18.9987 9.08906 18.9987 10.2977C18.9987 11.5064 18.7691 12.6385 18.3099 13.694C17.8506 14.7496 17.2302 15.6682 16.4487 16.4497C15.6671 17.2313 14.7486 17.8518 13.6931 18.3111C12.6376 18.7704 11.5056 19 10.297 19ZM13.0042 14.3588L14.3578 13.0051L11.2639 9.91094V5.4631H9.33017V10.6845L13.0042 14.3588ZM4.10914 0L5.46274 1.35369L1.3536 5.4631L0 4.10942L4.10914 0ZM16.4849 0L20.5941 4.10942L19.2405 5.4631L15.1313 1.35369L16.4849 0ZM10.297 17.0662C12.1824 17.0662 13.7817 16.4095 15.0951 15.0961C16.4084 13.7827 17.065 12.1832 17.065 10.2977C17.065 8.41221 16.4084 6.81277 15.0951 5.49936C13.7817 4.18596 12.1824 3.52926 10.297 3.52926C8.41166 3.52926 6.81231 4.18596 5.499 5.49936C4.18569 6.81277 3.52903 8.41221 3.52903 10.2977C3.52903 12.1832 4.18569 13.7827 5.499 15.0961C6.81231 16.4095 8.41166 17.0662 10.297 17.0662Z"
                fill="#2F68A1"
              />
            </svg>
            <p className="text-md font-medium text-center">{createdDate}</p>-
            <p className="text-md font-medium text-center">{finishDate}</p>
          </div>
        </div>
        <p className="text-md font-medium">
          <span className="font-semibold">Tipo</span>:
          {event.registration?.Students?.length ? "Acelerador" : "Evento"}
        </p>
        <p className="text-md font-medium">
          {event.description || "Detalles del evento no disponibles."}
        </p>
        <div className="text-end">
          <button
            onClick={isRegistered ? null : subscribeEvent}
            className={`px-10 py-3 ${
              isRegistered ? "bg-gray-500" : "bg-red-600"
            } text-white rounded-full hover:scale-105`}
          >
            {isRegistered ? "Inscripto" : "Inscribirse"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
