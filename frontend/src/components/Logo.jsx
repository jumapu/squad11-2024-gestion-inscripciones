import LogoImage from "../assets/logo.webp"

const Logo = () => {
  return (
    <div className="w-1/5 flex items-center justify-center">
            <img
              src={LogoImage}
              alt="logo"
              className="max-w-full max-h-full"
              style={{ maxWidth: "12rem", maxHeight: "12rem" }}
            />

          </div>
  )
}

export default Logo