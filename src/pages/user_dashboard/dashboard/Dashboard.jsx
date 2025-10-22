import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaMoneyCheckAlt, FaUniversity, FaRegBuilding, FaWhatsapp } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { ImDatabase } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import TransactionsHistoryComp from "../../../components/user_dashboard_component/TransactionsHistoryComp";
import MTNDataDisplay from "../../../components/user_dashboard_component/MTNDataDisplay";
import ManualFundingTabs from "../../../components/manual_funding_tabs/ManualFundingTabs";

const DashboardHeader = () => {
  const { existingUser } = useSelector((state) => state.user);
  const { firstName } = existingUser?.data || {};

  return (
    <div className="bg-white lg:py-18 py-6 text-slate-700 md:px-6 px-3 rounded-lg shadow-md transition-all duration-500">
      <h1 className="text-2xl font-bold">Welcome to Ambitioux, <span className="capitalize text-blue-500">{firstName}</span></h1>
      <p className="mt-2">
        Welcome to Ambitioux VTU, your one-stop platform for seamless and affordable data, airtime, and bill payments. 
        Enjoy exclusive benefits such as discounted data prices, cashback rewards, and commissions on every successful referral. 
        Save money while earning effortlessly by using our reliable VTU services.
      </p>
      <p className="mt-2 transition-opacity duration-500 ease-in-out">
        With Ambitioux, you can:
        <ul className="list-disc pl-5">
          <li>Purchase data at unbeatable rates.</li>
          <li>Earn commissions on every MTN data purchase made by your referrals.</li>
          <li>Enjoy fast and secure transactions.</li>
          <li>Get cashback rewards on select purchases.</li>
        </ul>
      </p>
    </div>
  );
};

const Services = () => {
  const services = [
    // { logo: "/buyData.jpg", title: "Bulk Reseller Data", link: "data-top-up" },
    { logo: "/airtime.svg", title: "VTU Airtime Top-up", link: "airtime-recharge-card" },
    { logo: "/tvSub.jpg", title: "Cable Subscription", link: "cable-providers" },
    // { logo: "/epins.jpg", title: "Exam Scratch Card", link: "/exam-scratch-card" },
    { logo: "/pin-coupon.png", title: "Bulk Data", link: "data-top-up" },
    { logo: "/electric.png", title: "Electricity Bills Payment", link: "electricity-bills" },
    // { logo: "/payment-gateway.jpg", title: "Automatic Payment Gateway", link: "/payment-gateway" },
    // { logo: "/referral.png", title: "My Referrals", link: "/referrals" },
  ];

  return (
    <div className="max-w-7xl mx-auto lg:px-4 px-2 lg:py-6 py-2 bg-gray-100 mt-6 rounded-lg">
      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <Link
            to={service.link}
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            title={`Go to ${service.title}`}
          >
            {/* Service Icon */}
            <div className="w-[6rem] h-[6rem] bg-gray-100 rounded-full flex items-center justify-center mb-4 hover:animate-bounce transition-all duration-300">
              <img
                src={service.logo}
                alt={service.title}
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Service Title */}
            <h3 className="text-center text-md font-semibold text-gray-700">
              {service.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Marquee = () => {
  const {existingUser} = useSelector((state) => state.user);
  const { firstName } = existingUser?.data || {};

  return (
    <div className="bg-gradient-to-r from-blue-400 to-red-600 mt-6 text-white rounded-full py-2 shadow-md">
      <marquee behavior="" direction="" className="text-lg font-semibold">
        🚀 Welcome to Ambitioux VTU <span className="capitalize">{firstName}!</span> Enjoy fast, affordable data, airtime, and bill payments. 
        Need help? Chat with us at 08162269770 or 08082792885 (WhatsApp only). 
        Reminder: For Airtel SME data, avoid sending to numbers with active loans.
      </marquee>
    </div>
  )
}

const Dashboard = () => {
  return (
    <section className="max-w-7xl mx-auto md:p-6 p-3">
      <DashboardHeader />
      <ManualFundingTabs />
      <Marquee />
      {/* <NetworkServices /> */}
      <MTNDataDisplay />
      <Services />
      <TransactionsHistoryComp />
    </section>
  );
};

export default Dashboard;
