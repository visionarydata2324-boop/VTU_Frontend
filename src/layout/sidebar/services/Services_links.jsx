import React from 'react'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Link } from 'react-router-dom';
import { GiNetworkBars } from 'react-icons/gi';
import { MdCall } from 'react-icons/md';
import { FaLightbulb } from 'react-icons/fa';

export default function Services_links() {
  return (
    <div className="text-slate-300 mt-5">
        <div className="">

        </div>
        <p className="text-[12px] text-blue-500 pl-3 font-semibold">SERVICES</p>
        <AccordionGroup disableDivider sx={{ maxWidth: 400 }}>
            <Accordion>
                <AccordionSummary color='white'>
                    <p className="text-slate-300 font-normal hover:text-blue-500 hover:translate-x-2 duration-150 flex items-center gap-3"><GiNetworkBars /> Buy Data</p>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className="text-slate-300 flex flex-col gap-1 list-disc pl-10">
                        <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                            <Link to={'data-top-up'} className=''>Buy Data</Link>
                        </li>
                        {/* <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                            <Link to={'data-recharge-card'} className=''>Data Recharge Card</Link>
                        </li> */}
                    </ul>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary color='white'>
                    <p className="text-slate-300 font-normal hover:text-blue-500 hover:translate-x-2 duration-150 flex items-center gap-3"><MdCall /> Buy Airtime</p>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className="text-slate-300 flex flex-col gap-1 list-disc pl-10">
                        {/* <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                            <Link to={'airtime-top-up'} className='hover:text-blue-500 hover:translate-x-2 duration-150'>Instant TopUp</Link>
                        </li> */}
                        <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                            <Link to={'airtime-recharge-card'} className='hover:text-blue-500 hover:translate-x-2 duration-150'>Airtime Recharge Card</Link>
                        </li>
                    </ul>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary color='white'>
                    <p className="text-slate-300 font-normal hover:text-blue-500 hover:translate-x-2 duration-150 flex items-center gap-3"><FaLightbulb />Utility Payment</p>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className="text-slate-300 flex flex-col gap-1 list-disc pl-10">
                        <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                            <Link to={'electricity-bills'} className='hover:text-blue-500 hover:translate-x-2 duration-150'>Electricity Payment</Link>
                        </li>
                        <li className='hover:text-blue-500 hover:translate-x-2 duration-150'>
                            <Link to={'cable-providers'} className='hover:text-blue-500 hover:translate-x-2 duration-150'>Cable Subscription</Link>
                        </li>
                    </ul>
                </AccordionDetails>
            </Accordion>
        </AccordionGroup>
    </div>
  )
}
