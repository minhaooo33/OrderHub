import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') || (location.state && location.state.id);
  const token = searchParams.get('token') || (location.state && location.state.token);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`http://localhost:3000/verify-order?id=${id}&token=${token}`);
        if (!response.ok) throw new Error("驗證失敗");
        const data = await response.json();
        setOrder(data.order);
      } catch (err) {
        setError("查詢訂單失敗，請確認訂單資訊是否正確");
      } finally {
        setLoading(false);
      }
    }

    if (id && token) {
      fetchOrder();
    } else {
      setError("缺少訂單資訊");
      setLoading(false);
    }
  }, [id, token]);

  if (loading) {
    return <p className="text-center py-20 text-gray-500">訂單驗證中...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center px-6 py-10 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 訂單已成功送出</h1>
        <p className="text-gray-700 text-base mb-6">
          感謝您的訂購，我們正在火速為您準備美味餐點！
        </p>
        <div className="bg-white p-4 rounded shadow mb-6 text-left relative">
          <p className="font-semibold mb-2">桌號：{order.table}</p>
          <ul className="text-sm text-gray-700 list-disc pl-5">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
          <p className="absolute top-2 right-2 md:top-4 md:right-4 text-xs md:text-sm font-semibold text-black bg-green-100 px-2 py-1 md:px-3 md:py-1.5 rounded shadow">
            總金額：<span className="text-green-700">＄{order.totalAmount.toFixed(2)}</span>
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow mb-6 text-center">
          <p className="text-sm font-semibold mb-2 text-gray-700">請出示此 QR Code 以供商家結帳掃描</p>
          <div className="flex justify-center">
            <QRCode
              value={`http://localhost:3000/verify-order?id=${order.id}&token=${order.verifyToken}`}
              size={160}
            />
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition"
        >
          回到首頁
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
