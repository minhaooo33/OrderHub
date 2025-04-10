import { useContext } from "react";
import CarContext from "../../context/CartContext";
import { PlusIcon } from '@heroicons/react/24/solid';

const MealCard = ({ meal }) => {
    const cartCtx = useContext(CarContext);
    function handleAddToCart() {
        cartCtx.addItem(meal);
    }
    return (
  <div className="flex flex-row items-start gap-4 p-4 border rounded-lg shadow-sm mb-4 bg-white min-h-[112px]">

    <div className="flex flex-col flex-1 justify-center py-2">
    <h3 className="text-lg font-bold mb-1">{meal.name}</h3>
    <p className="text-base font-semibold text-gray-800">${meal.price}</p>
    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{meal.description}</p>
  </div>
 
    <div className="relative w-32 h-24 flex-shrink-0 mt-auto mb-auto">
    <img
      src={`http://localhost:3000/${meal.image}`}
      alt={meal.name}
      className="w-full h-full object-cover rounded-lg "
    />
    <button
      onClick={handleAddToCart}
      className="absolute bottom-1 right-1 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-200 transition"
    >
      <PlusIcon className="w-5 h-5" />
    </button>

     </div>

</div>
    );
};

export default MealCard;