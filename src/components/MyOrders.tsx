import { useSelector } from "react-redux";
import { type RootState } from "@/redux/store";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

const MyOrders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 h-screen w-screen relative ${
        theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
      }`}
    >
      <button
        className="absolute top-5 md:top-15 left-5 md:left-15"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft />
      </button>
      <div className=" flex flex-col items-center justify-center">
      <h2 className="text-2xl mt-12  font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Order ID: {order.id.slice(0, 8)}... (
              {new Date(order.date).toLocaleString()})
            </h3>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm border-b py-2"
              >
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span>₹{item.price * item.quantity}K</span>
              </div>
            ))}
            <div className="mt-2 text-right font-semibold">
              Total: ₹{order.totalAmount.toFixed(2)}K
            </div>
            <div className="cost mt-2 text-right">
              (*Including shipping cost of 1.2K)
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default MyOrders;
