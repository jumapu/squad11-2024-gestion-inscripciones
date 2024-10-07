import NavAndDrawer from "../../components/NavAndDrawer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import axiosInstance from "../../../../api/interceptor";

const Eventos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    if (image === null) {
      toast.error("Ingrese una imagen");
      return;
    }

    const formData = new FormData();

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    formData.append("file", file);

    const eventData = {
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
      finishAt: data.finishAt,
      registration: {
        createdAt: data.registrationCreatedAt,
        finishAt: data.registrationFinishAt,
      },
      isActive: data.isActive,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(eventData)], { type: "application/json" })
    );
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.post("admin/event/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Evento creado con éxito");
    } catch (error) {
      console.error(err);

      toast.error("Error al crear el evento");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className="overflow-hidden pb-10">
      <NavAndDrawer />

      <Toaster richColors position="top-center" />
      <div className="md:ml-[240px] md:w-[calc(100vw - 240px)] h-full grid grid-rows-[auto_1fr] gap-10">
        <section className="w-full px-5 ">
          <a href="./" className="text-2xl font-extrabold hover:scale-105">
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
            Agregar nuevo evento
          </a>
        </section>
        <section className="p-5 flex justify-center">
          <div className="md:w-2/4 flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-md font-bold text-gray-700 ">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre del Evento"
                  className="w-full p-3 rounded-3xl  border-2 border-solid border-blue-600 focus:border-blue-600 focus:ring-0"
                  {...register("name", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.name && (
                  <span className="text-red-600 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="relative w-full mb-4">
                <h2 className="text-md font-bold text-gray-700 mb-2">Imagen</h2>
                <label
                  className="flex justify-center w-full h-32 px-4 transition bg-gray-200 border-solid border-gray-300  rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                  id="drop"
                >
                  <span className="flex items-center space-x-2 b-">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      Drop image Event to Attach, or
                      <span className="text-blue-600 underline ml-[4px]">
                        browse
                      </span>
                    </span>
                  </span>
                  <input
                    type="file"
                    name="file_upload"
                    className="hidden"
                    accept="image/png,image/jpeg"
                    id="input"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <h2 className="font-bold text-lg text-center">
                Inscripción del Evento
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-lg font-bold text-gray-700 ">
                    Inicio
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-3xl  border-2 border-solid border-blue-600 focus:border-blue-600 focus:ring-0"
                    {...register("inicioIns", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.inicioIns && (
                    <span className="text-red-600 text-xs">
                      {errors.inicioIns.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-700 ">
                    Fin
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-3xl  border-2 border-solid border-blue-600 focus:border-blue-600 focus:ring-0"
                    {...register("finIns", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.finIns && (
                    <span className="text-red-600 text-xs">
                      {errors.finIns.message}
                    </span>
                  )}
                </div>
              </div>

              <h2 className="font-bold text-lg text-center">
                Inicio del Evento
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-lg font-bold text-gray-700 ">
                    Inicio
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-3xl  border-2 border-solid border-blue-600 focus:border-blue-600 focus:ring-0"
                    {...register("inicio", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.inicio && (
                    <span className="text-red-600 text-xs">
                      {errors.inicio.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-bold text-gray-700 ">
                    Fin
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-3xl  border-2 border-solid border-blue-600 focus:border-blue-600 focus:ring-0"
                    {...register("fin", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.fin && (
                    <span className="text-red-600 text-xs">
                      {errors.fin.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="descripcion"
                >
                  Descripción
                </label>
                <textarea
                  rows="10"
                  {...register("descripcion", {
                    required: "Este campo es obligatorio",
                  })}
                  className="appearance-none block w-full bg-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-blue-600"
                  placeholder="Escribe aquí la descripción..."
                  id="descripcion"
                ></textarea>
                {errors.descripcion && (
                  <span className="text-red-600 text-xs">
                    {errors.descripcion.message}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <button className="bg-red-500 p-3 text-white rounded-3xl hover:scale-105">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 p-3 text-white rounded-3xl hover:scale-105"
                >
                  Añadir
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Eventos;
