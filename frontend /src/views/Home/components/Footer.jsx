import Empresa1 from "@/assets/Epidata.png";
import Empresa2 from "@/assets/Hansen.png";
import Empresa3 from "@/assets/Gire.png";
import Empresa4 from "@/assets/Globant.png";
import Empresa5 from "@/assets/D3.png";
export default function Footer() {
    return (
      <div className="bg-neutral-50 py-24 sm:py-32 from-rose-50 from-10% via-transparent via-50% to-blue-50 to-100% bg-gradient-to-b bg-opacity-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-4xl text-gray-800 font-semibold leading-8 py-4">
            Empresas que ofrecen mentores
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="logoEmpresa"
              src={Empresa1}
              width={"50px"}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={Empresa2}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={Empresa3}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={Empresa4}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={Empresa5}
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </div>
    )
  }
  