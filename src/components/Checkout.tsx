import { useTheme } from "@/hooks/useTheme";
import type { RootState } from "@/redux/store";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { useState } from "react";
import { addOrder } from "@/redux/Slices/orderSlice";
import { v4 as uuidv4 } from "uuid";
import { clearCart } from "@/redux/Slices/cartSlice";
const Checkout = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const handleValidation = (field: string): boolean => {
    const value = formData[field as keyof typeof formData];
    let errorMsg = "";
  
    if (!value || value.trim() === "") {
      errorMsg = `${field.replace(/^\w/, (c) => c.toUpperCase())} is required`;
    }
  
    if (field === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = "Invalid email format";
      }
    }
  
    if (field === "phone" && value) {
      if (!/^\d{10}$/.test(value)) {
        errorMsg = "Phone number must be 10 digits";
      }
    }
  
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  
    return errorMsg === ""; // ✅ true if no error
  };
  
  const handlePayNow = () => {
    const fields = ["firstName", "lastName", "address", "email", "phone"];
    const allValid = fields.every((field) => handleValidation(field));

    if (!allValid) {
      return;
    }
    const orderId = uuidv4();

    const newOrder = {
      id: orderId,
      items: cart.items,
      totalAmount: cart.totalAmount + 1.2,
      date: new Date().toISOString(),
    };
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigate("/success");
  };
  return cart.items.length > 0 ? (
    <div
      className={`flex  h-full overflow-y-scroll relative px-12 py-12 flex-col md:flex-row gap-5 ${
        theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
      } pt-12  justify-center`}
    >
      <button
        className="absolute top-5 md:top-15 left-5 md:left-15"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft />
      </button>
      <div className="form flex flex-col lg:flex-row gap-6 w-full max-w-5xl mx-auto mt-32 lg:mt-16">
        <div className="w-full lg:w-2/3">
          <Form
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleValidation={handleValidation}
          />
        </div>

        <div
          className={`pay  h-[350px] max-h-[400px] lg:w-1/3 p-6 rounded-lg border  ${
            theme === "dark"
              ? "bg-zinc-900 border-zinc-700"
              : "bg-[#ffffd7] border-zinc-200"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Payment Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{cart.totalAmount.toFixed(2)}K</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Shipping Charges</span>
            <span>₹1.2K</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Estimated Delivery</span>
            <span>4-5 Days</span>
          </div>

          <div className="flex justify-between text-lg font-semibold border-t pt-4 mt-4">
            <span>Total</span>
            <span>₹{(cart.totalAmount + 1.2).toFixed(2)}K</span>
          </div>

          <button
            onClick={handlePayNow}
            className={`w-full mt-6 py-2 rounded text-md font-semibold transition-colors duration-300 ${
              theme === "light"
                ? "bg-black text-white hover:bg-zinc-800"
                : "bg-zinc-100 text-black hover:bg-zinc-300"
            }`}
          >
            Order now!
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`text-center pt-20 relative text-xl font-bold ${
        theme === "light" ? "bg-[#FFFFF0] text-black" : "bg-black text-white"
      } h-screen`}
    >
      <button
        className="absolute top-5 md:top-15 left-5 md:left-15"
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft />
      </button>
      <h2>Your Cart is empty!</h2>
    </div>
  );
};

export default Checkout;
