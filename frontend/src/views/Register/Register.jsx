import "./css/register.css";
import { Toaster } from "sonner";
import { Flex, AlertDialog, Button, Link } from "@radix-ui/themes";

const Register = () => {
  return (
    <div>
      <div className="flex flex-col mb-2 register-container">
      <Toaster richColors position="top-center" />
        <div className="mt-4 flex flex-col bg-gray-100 rounded-lg p-4 shadow-sm">
          <div className="mt-4 flex flex-row space-x-2">
            <div className="flex-1">
              <label className="text-black">Nombres</label>
              <input placeholder=" " className="w-[88%] bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" id="nombre" type="text" />
            </div>

            <div className="flex-1">
              <label className="text-black" >Apellidos</label>
              <input placeholder=" " className="w-[89%] bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" id="apellido" type="text" />
            </div>
          </div>

          <div className="mt-4 flex flex-row space-x-2">
            <div className="flex-1">
              <label className="text-black">Teléfono</label>
              <input placeholder=" " className="w-[88%] bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" id="telefono" type="text" />
            </div>

            <div className="flex-1">
              <label className="text-black" >Fecha de Nacimiento</label>
              <input placeholder=" " className="w-[89%] bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" id="fechaNacimiento" type="date" />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="mt-4 flex flex-col bg-gray-100 rounded-lg p-4 shadow-sm">
              <div className="mt-4">
                <label className="text-black" >Email</label>
                <input placeholder="" className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" type="text" id='email' />
              </div>
              <div className="flex-1">
                    <label className="text-black" >Skills</label>
                    <select className="w-[98%] bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" id="tipoAfiliacion">
                        <option value="">Seleccione...</option>

                        <optgroup label="Lenguajes">
                            <option value="AF">JS</option>
                            <option value="DZ">Python</option>
                            <option value="AO">Java</option>
                        </optgroup>

                    </select>
                </div>

              <div className="mt-4">
                <label className="text-black" >Nombre de usuario</label>
                <input placeholder="" className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" type="text" id='username' />
              </div>

              <div className="mt-4">
                <label className="text-black" >Contraseña</label>
                <input placeholder="" className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" type="password" id='password' />
              </div>

              <div className="mt-4">
                <label className="text-black" >Confirmar contraseña</label>
                <input placeholder="" className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1" type="password" id='confirmpassword' />
              </div>

            </div>
          </div>
          <AlertDialog.Root>
                              <AlertDialog.Trigger>
                                <Button className='mt-4 w-full bg-indigo-600 text-white py-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>GUARDAR</Button>
                              </AlertDialog.Trigger>
                              <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Guardar</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                   Desea guardar los cambios para registrarse?
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                  <AlertDialog.Action>
                                    <Button variant="solid" color="cyan" style={{color: "white", justifyContent:"center"}}>
                                     <Link href="/login">GUARDAR</Link>
                                    </Button>
                                  </AlertDialog.Action>
                                </Flex>
                              </AlertDialog.Content>
                            </AlertDialog.Root>
        </div>
      </div>
    </div>
  )
}

export default Register