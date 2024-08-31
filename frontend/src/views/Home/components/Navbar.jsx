import { Theme, Flex, Link, Button } from "@radix-ui/themes";
import Logo from "@/assets/logo.webp";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <>
    <Theme scaling="100%">
      <Flex className="nav max-w-full justify-between align-middle p-6 flex-row" gap="6" >
        <img className="max-w-40 h-12" src={Logo} alt="logo" />
        <Flex align="center" gap="6">
          <Link href="#">Menu1</Link>
          <Link href="#">Menu2</Link>
          <Link href="#">Menu3</Link>
          <Link href="#">Menu4</Link>
        </Flex>
        <Flex className="gap-4 justify-around">
          <Link href='/login'>
            <Button className="py-2 px-5 bg-sky-800 raduis=lg font-medium text-nowrap shadow-black shadow-md cursor-pointer">Iniciar Sesion</Button>
          </Link>
          <Link href='/registro'>
            <Button className="py-2 px-5 bg-sky-800 radius-lg font-medium text-nowrap shadow-black shadow-md cursor-pointer">Registrarse</Button>
          </Link>
        </Flex>
      </Flex>
      </Theme>
    </>
  );
}

export default Navbar