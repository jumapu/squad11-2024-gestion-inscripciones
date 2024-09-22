import logoFooter from "../../../assets/code-logo.webp";

export default function Footer() {
    return (
      <div className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-4xl text-gray-800 font-semibold leading-8 py-4">
            Empresas que ofrecen mentores
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="logoEmpresa"
              src={logoFooter}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={logoFooter}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={logoFooter}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={logoFooter}
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
              alt="logoEmpresa"
              src={logoFooter}
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </div>
    )
  }
  