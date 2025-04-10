import { useContext } from 'react';
import CartContext from '../context/CartContext';
import UserProgressContext from '../context/UserProgressContext';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const FloatingCartButton = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
}
, 0);

  if (cartCtx.items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <button
        onClick={userProgressCtx.showCart}
        className="w-full bg-black text-white py-3 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-lg transition hover:bg-gray-800"
      >
        <ShoppingCartIcon className="w-5 h-5" />
        <span>檢視購物車・{totalCartItems}</span>
      </button>
    </div>
  );
};

export default FloatingCartButton;