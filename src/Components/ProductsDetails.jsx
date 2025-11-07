import React from "react";
import { Link } from "react-router-dom";
import { productosRopa } from "../data/productosRopa";

const ProductosList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {productosRopa.map((producto) => (
        <div
          key={producto.id}
          className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{producto.nombre}</h2>
            <p className="text-gray-500 mb-2">${producto.precio.toFixed(2)}</p>
            <p className="text-gray-400 text-sm mb-4">
              Tallas disponibles: {producto.tallas.join(", ")}
            </p>
            <Link
              to={`/producto/${producto.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver más
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosList;
