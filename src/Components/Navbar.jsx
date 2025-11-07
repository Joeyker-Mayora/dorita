import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import Logo from "../Img/Logo.png";

const categoriasPrincipales = [
  { id: "todas", nombre: "Todas", color: "gray", subcategorias: [] },
  { id: "damas", nombre: "Damas", subcategorias: ["Panties", "Brasier", "Pantalones", "Tops"], color: "pink" },
  { id: "accesorios", nombre: "Accesorios", subcategorias: ["Pulseras", "Bolsos", "Sombreros"], color: "purple" },
  { id: "hombres", nombre: "Hombres", subcategorias: ["Camisetas", "Boxers", "Medias"], color: "blue" },
];

const colorClasses = {
  gray: "bg-gray-100 hover:bg-gray-200",
  pink: "bg-pink-100 hover:bg-pink-200",
  purple: "bg-purple-100 hover:bg-purple-200",
  blue: "bg-blue-100 hover:bg-blue-200",
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  const categoriaActiva = categoriasPrincipales.find(c => c.id === categoriaSeleccionada);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolling(window.scrollY > lastScrollY && window.scrollY > 50);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar principal */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-white shadow-md shadow-pink-100 transition-transform duration-500 ${
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
            <div className="ml-24" />
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex gap-8 font-medium text-gray-700 items-center">
            <a href="#home" className="hover:text-pink-500 transition">Inicio</a>
            <a href="#coleccion" className="hover:text-pink-500 transition">Colección</a>
            <a href="#ofertas" className="hover:text-pink-500 transition">Ofertas</a>
            <a href="#contacto" className="hover:text-pink-500 transition">Contacto</a>
            {categoriasPrincipales.map(cat => (
              <div key={cat.id} className="relative">
                <button
                  onClick={() => setCategoriaSeleccionada(cat.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    categoriaSeleccionada === cat.id
                      ? "bg-white text-pink-500 shadow-md border border-pink-300"
                      : colorClasses[cat.color] + " text-gray-700"
                  }`}
                >
                  {cat.nombre} {cat.subcategorias.length > 0 && (
                    categoriaSeleccionada === cat.id ? <FaChevronUp className="inline ml-1" /> : <FaChevronDown className="inline ml-1" />
                  )}
                </button>
                {categoriaSeleccionada === cat.id && cat.subcategorias.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2 z-50"
                  >
                    {cat.subcategorias.map(sub => (
                      <div key={sub} className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer">
                        {sub}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-pink-500 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Menú móvil overlay */}
      <AnimatePresence>
  {menuOpen && (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay blur blanco */}
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-sm"
        onClick={() => setMenuOpen(false)}
      />

      {/* Contenedor menú desde la derecha */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-72 max-w-full h-full bg-white backdrop-blur-sm shadow-xl flex flex-col p-6 overflow-y-auto gap-6"
      >
        {/* Botón cerrar visible arriba a la izquierda dentro del menú */}
      <button
  onClick={() => setMenuOpen(false)}
  className="absolute top-4 right-4 text-pink-500 z-50 focus:outline-none"
>
  <FaTimes size={28} />
</button>


        {/* Links principales */}
        <div className="flex flex-col gap-4 mt-12">
          {["Inicio", "Colección", "Ofertas", "Contacto"].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold text-gray-700 hover:text-pink-500 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <hr className="border-gray-200" />

        {/* Categorías principales */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Categorías
          </h3>
          <div className="flex flex-wrap gap-2">
            {categoriasPrincipales.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                  categoriaSeleccionada === cat.id
                    ? "bg-pink-500 text-white shadow-lg"
                    : colorClasses[cat.color] + " text-gray-700 hover:shadow-md"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategorías */}
        {categoriaSeleccionada !== "todas" && categoriaActiva?.subcategorias?.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Subcategorías
            </h4>
            <div className="flex flex-wrap gap-2">
              {categoriaActiva.subcategorias.map(sub => (
                <span
                  key={sub}
                  className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm cursor-pointer hover:bg-pink-50 hover:text-pink-500 transition-colors"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};

export default Navbar;
