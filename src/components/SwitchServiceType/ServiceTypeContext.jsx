import { createContext, useContext, useState } from "react";

const ServiceTypeContext = createContext();

export const ServiceTypeProvider = ({ children }) => {
  const [serviceType, setServiceType] = useState("gsubz"); // default value

  return (
    <ServiceTypeContext.Provider value={{ serviceType, setServiceType }}>
      {children}
    </ServiceTypeContext.Provider>
  );
};

export const useServiceType = () => {
  const context = useContext(ServiceTypeContext);
  if (!context) {
    throw new Error("useServiceType must be used within a ServiceTypeProvider");
  }
  return context;
};
