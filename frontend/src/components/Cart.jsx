import { useContext, useState ,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/solid"; 
import { MinusCircleIcon } from "@heroicons/react/24/solid"; 


const Cart = ({tableNumber}) => {

    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const cartTotalPrice = cartCtx.items.reduce((totalPrice,item) =>
        totalPrice + item.price * item.quantity,0);


    function handleAddItem(item){
        cartCtx.addItem(item);
    }
    function handleRemoveItem(id){
        cartCtx.removeItem(id);
    }
    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    async function handleSubmitOrder(){
        setIsSubmitting(true);
        try {
            const { id, verifyToken } = await cartCtx.submitOrder(tableNumber);
           userProgressCtx.hideCart();
           navigate(`/order-success?id=${id}&token=${verifyToken}`);
           console.log("✅ 送出成功，id:", id, "token:", verifyToken);
        } catch (error) {
            toast.error("訂單提交失敗，請稍後再試");
        } finally {
            setIsSubmitting(false);
        }
    }
return(
    <Modal 
        open={userProgressCtx.progress === "show"}
        close={userProgressCtx.progress === "show" ? handleCloseCart : null}
    >
        <div className="flex flex-col h-full">

            {/* Scrollable Content 區塊 */}
            <div className="flex-1 overflow-y-auto px-6">

                {/* Header 區塊 */}
                <div className="flex justify-between items-center mb-4 ">
                    <button
                        onClick={handleCloseCart}
                        className="bg-gray-200 text-black w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer"
                    >
                        <p className="font-bold">X</p>
                    </button>
                </div>

                {/* 桌號與小計 */}
                <div className="flex justify-between items-start py-2">
                    <div className="flex items-center gap-2">
                        <h2 className="font-medium">桌號：{tableNumber}</h2>
                    </div>
                </div>

                {/* 購物車品項列表 */}
                <ul className="mb-4 divide-y divide-gray-200">
                    {cartCtx.items.map((item) => (
                        <li key={item.id} className="py-4">
                            <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                            <span className="font-medium">{item.name}</span>
                                <div className="flex flex-col gap-1 text-right">
                                    <p className="font-semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                </div>
                                
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleRemoveItem(item.id)}>
                                            <MinusCircleIcon className=" w-10 h-10 flex justify-center items-center"/>
                                            </button>
                                        <span className="text-base font-semibold">{item.quantity}</span>
                                        <button onClick={() =>handleAddItem(item)}>
                                            <PlusCircleIcon className=" w-10 h-10 flex justify-center items-center" />
                                        </button>
                                    </div>
                                </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 結帳按鈕區塊 */}
            <div className="px-6 pt-2 pb-4 bg-white shadow-inner">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">小計</span>
                    <span className="text-lg font-bold text-black">
                      ${cartTotalPrice.toFixed(2)}
                    </span>
                </div>
                <button
                    className="w-full bg-black text-white py-3 rounded text-lg font-bold"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitOrder}
                >
                    {isSubmitting ? "訂單提交中..." : "前往結帳"}
                </button>
            </div>

        </div>
    </Modal>
)
}

export default Cart;