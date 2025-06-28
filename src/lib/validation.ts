export type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
  };
  
  export const validateField = (field: keyof FormData, value: string): string => {
    if (!value || value.trim() === "") {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Invalid email format";
      }
    }
  
    if (field === "phone") {
      if (!/^\d{10}$/.test(value)) {
        return "Phone number must be 10 digits";
      }
    }
  
    return ""; 
  };
  