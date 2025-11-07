import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

const ProductosList = ({ productos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
        >
          {/* Imagen del producto */}
          <div className="relative w-full h-[400px] sm:h-[320px] md:h-[350px] lg:h-[350px] overflow-hidden">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Botones superiores (favorito y ver) */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button className="bg-white/90 p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition-transform">
                <FaHeart className="text-gray-600 hover:text-red-500" />
              </button>
              <Link
                to={`/producto/${producto.id}`}
                className="bg-white/90 p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition-transform"
              >
                <FaEye className="text-gray-600 hover:text-blue-600" />
              </Link>
            </div>

            {/* Etiqueta de destacado */}
            {producto.destacado && (
              <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Nuevo
              </span>
            )}

            {/* Botón inferior (añadir al carrito) */}
            <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-neutral-500 text-white px-4 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gray-900 text-sm">
              <FaShoppingCart /> ver
            </button>
          </div>

          {/* Detalles del producto */}
          <div className="p-4 text-center">
            <h2 className="text-md font-semibold text-gray-800 mb-1 truncate">
              {producto.nombre}
            </h2>

            {/* Valoración */}
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) =>
                i < producto.rating ? (
                  <FaStar key={i} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={i} className="text-gray-300" />
                )
              )}
            </div>

            <p className="text-gray-500 mb-1 text-sm">${producto.precio.toFixed(2)}</p>
            <p className="text-gray-400 text-xs truncate">
              Tallas: {producto.tallas.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosList;
