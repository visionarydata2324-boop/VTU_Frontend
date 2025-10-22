import React from "react";
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { FaChevronDown } from "react-icons/fa"; // Import React Icon
import { Link, NavLink } from "react-router-dom";

const navSections = [
  {
    title: "Data Management",
    routes: [
      { label: "Create Data", path: "admin/create-data" },
      { label: "Update Data", path: "admin/update-data" },
    ],
  },
  {
    title: "User Management",
    routes: [
      { label: "All Users", path: "admin/all-users" },
      { label: "All Transactions", path: "all-transaction-history" },
    //   { label: "User Requests", path: "/admin/requests" },
    ],
  },
  {
    title: "Admin Management",
    routes: [
      { label: "Change Service", path: "admin/change-service-type" },
      { label: "Switch Server", path: "admin/switch-url" },
      { label: "Fund User Wallet", path: "admin/fund-user-wallet" },
      { label: "Debit User Wallet", path: "admin/debit-user-wallet" },
    ],
  },
  // Add more sections as needed
];

export default function AdminNav() {
  return (
    <div className="w-full max-w-xs ">
        <AccordionGroup disableDivider sx={{ maxWidth: 400 }} >
            {navSections.map((section, index) => (
                <Accordion>
                    <AccordionSummary expandIcon={<FaChevronDown size={20} />}>
                        <p className="text-slate-400 font-normal hover:text-blue-500 duration-150 flex items-center gap-3">{section.title}</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul className="text-slate-400 flex flex-col gap-1 list-disc pl-10">
                            {section.routes.map((route, idx) => (
                                <li key={idx} className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                                    <Link to={route?.path}>
                                        {route?.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </AccordionDetails>
                </Accordion>
            ))}
        </AccordionGroup>
    </div>
  );
}
