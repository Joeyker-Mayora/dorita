import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../Img/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white shadow-md shadow-pink-100 transition-transform duration-500 overflow-visible ${
        scrolling ? "-translate-y-full" : "translate-y-0"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 relative">
        {/* LOGO */}
        <div className="relative flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 h-20 absolute -top-8 left-0 rounded-full object-cover shadow-md shadow-pink-200 bg-white"
          />
          <div className="ml-24">

          </div>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          <a href="#home" className="hover:text-pink-500 transition">Inicio</a>
          <a href="#coleccion" className="hover:text-pink-500 transition">Colección</a>
          <a href="#ofertas" className="hover:text-pink-500 transition">Ofertas</a>
          <a href="#contacto" className="hover:text-pink-500 transition">Contacto</a>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className=" text-pink-500 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/90 backdrop-blur-lg shadow-lg"
        >
          <div className="flex flex-col items-center gap-4 py-6 text-lg font-medium text-gray-700">
            <a href="#home" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">Inicio</a>
            <a href="#coleccion" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">Colección</a>
            <a href="#ofertas" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">Ofertas</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="hover:text-pink-500">Contacto</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
