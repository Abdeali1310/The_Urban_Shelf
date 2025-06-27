import React from "react";

type FormDataType = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
};

type Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  errors: { [key: string]: string };
  handleValidation: (field: string) => void;
};

const Form: React.FC<Props> = ({
  formData,
  setFormData,
  errors,
  handleValidation,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Shipping Details</h3>

      <div className="form-inputs flex flex-col gap-6 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="flex-1 px-4 py-3 rounded border border-zinc-600 text-base"
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={() => handleValidation("firstName")}
          />
          <input
            className="flex-1 px-4 py-3 rounded border border-zinc-600 text-base"
            type="text"
            name="lastName"
            placeholder="Last Name*"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={() => handleValidation("lastName")}
          />
        </div>

        {errors.lastName ? (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        ) : errors.firstName ? (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        ) : null}

        <textarea
          className="w-full px-4 py-3 rounded border border-zinc-600 text-base"
          name="address"
          placeholder="Start typing address*"
          value={formData.address}
          onChange={handleChange}
          onBlur={() => handleValidation("address")}
          rows={4}
        ></textarea>
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="flex-1 px-4 py-3 rounded border border-zinc-600 text-base"
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleValidation("email")}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number*"
            className="flex-1 px-4 py-3 rounded border border-zinc-600 text-base"
            value={formData.phone}
            maxLength={10}
            inputMode="numeric"
            onChange={handleChange}
            onBlur={() => handleValidation("phone")}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Delete",
              ];
              if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        {errors.phone ? (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        ) : errors.email ? (
          <p className="text-red-500 text-sm">{errors.email}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
