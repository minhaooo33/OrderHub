import { createContext, useReducer } from "react";
import useHttp from "../hooks/useHttp";

const CartContext = createContext({
    items:[],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
    submitOrder: () => {},
});

function cartReducer(state,action) {
    if(action.type === 'ADD') {
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.item.id);
      
            const updatedItems = [...state.items];

            if(existingItemIndex >= 0) {
                const existingItem = state.items[existingItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                    totalPrice: existingItem.totalPrice + action.item.price,
                }
                updatedItems[existingItemIndex] = updatedItem;
                } else {
                updatedItems.push({...action.item, quantity:1});
            }

            return {...state,items: updatedItems};
    }

    if(action.type === 'REMOVE') {
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.id);
    
        const existingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];
    
        if(existingItem.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
                totalPrice: existingItem.totalPrice - existingItem.price,
            };
            updatedItems[existingItemIndex] = updatedItem;
        }
    
        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR') {
        return { items: [] };
    }

    return state;

}

export function CartContextProvider({ children }) {
    const { sendRequest } = useHttp();
    const [ cart, dispatchCartAction ] = useReducer(cartReducer,{items:[]});

    function addItem(item) {
        dispatchCartAction({type:'ADD', item:item});
    }

    function removeItem(id) {
        dispatchCartAction({type:'REMOVE', id:id});
    }

    function clearCart() {
        dispatchCartAction({type:'CLEAR'});
    }
    async function submitOrder(table) {
        // 確保數值正確
        const sanitizedItems = cart.items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: Number(item.quantity),
            price: Number(item.price), 
            /*totalPrice: Number(item.price) * Number(item.quantity), */
            //有需要動態折扣再開啟
          }));

        const totalAmount = sanitizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderData = {
            order: {
                items: sanitizedItems,
                table: Number(table),
                totalAmount: Number(totalAmount.toFixed(2)), 
            },
        };
      
        try {
            const resData = await sendRequest({
                url: 'http://localhost:3000/orders',
                method: 'POST',
                body: orderData,
            });
            console.log("✅ 後端回傳 resData:", resData);
            //dispatchCartAction({ type: 'CLEAR' });

            return {
                id: resData.id,
                verifyToken: resData.verifyToken,
            };
            
        } catch (error) {
            console.error("送出失敗", error);
            throw error;
        }
      }

    const cartContextValue = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCart,
        submitOrder: submitOrder,
    }
    
    return(
        <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
    )
}

export default CartContext;