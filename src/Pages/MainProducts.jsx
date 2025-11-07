import React, { useState } from "react";
import ProductosList from "../Components/ProductosList";
import { productosRopa } from "../Utils/ProductDetails";

// Definir categorías y subcategorías
const categorias = {
  "Ropa Íntima": ["Brassieres", "Pantys", "Top"],
  Caballeros: ["Medias", "Boxer", "Camisetas"],
};

const MainProducts = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);

  // Filtrar productos según selección
  const productosFiltrados = productosRopa.filter((producto) => {
    if (!categoriaSeleccionada) return true; // Sin filtro
    if (!subcategoriaSeleccionada) return producto.categoria === categoriaSeleccionada;
    return producto.subcategoria === subcategoriaSeleccionada;
  });

  return (
    <div className="pt-20">
      
      {/* Mostrar productos filtrados */}
      <ProductosList productos={productosFiltrados} />
    </div>
  );
};

export default MainProducts;
