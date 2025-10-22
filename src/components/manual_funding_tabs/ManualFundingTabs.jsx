import { Tab } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Landmark, CreditCard, Copy } from "lucide-react";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ManualFundingTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const accounts = [
    {
      name: "Palmpay",
      icon: <Wallet className="w-6 h-6" />,
      number: "7062194220",
      accountName: "Mumini Afolayan Ambali",
      gradient: "from-yellow-400 via-orange-400 to-yellow-500",
      textColor: "text-yellow-50",
    },
    {
      name: "Moniepoint",
      icon: <CreditCard className="w-6 h-6" />,
      number: "7062194220",
      accountName: "Mumini Ambali",
      gradient: "from-blue-500 via-cyan-400 to-blue-600",
      textColor: "text-blue-50",
    },
    {
      name: "Zenith Bank",
      icon: <Landmark className="w-6 h-6" />,
      number: "2372995919",
      accountName: "Mumini Ambali",
      gradient: "from-red-500 via-pink-500 to-rose-600",
      textColor: "text-rose-50",
    },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white py-4 px-3 rounded-xl w-full max-w-6xl mx-auto mt-10 font-inter relative">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-medium text-center text-gray-800 mb-2">
        💰 Manual Funding
        </h1>
        <p className="text-center text-gray-500 text-sm md:text-base mb-3 max-w-md mx-auto leading-relaxed">
            Fund your account by transferring to any of the bank accounts below. After payment, please confirm by sending your receipt to the admin via the WhatsApp icon at the bottom right.
        </p>


      {/* Tabs */}
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex justify-between bg-gray-100 p-2 rounded-xl shadow-sm">
          {accounts.map((acc, i) => (
            <Tab
              key={acc.name}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm md:mx-5 mx-2 font-medium rounded-lg transition-all duration-300 focus:outline-none",
                  selected
                    ? "bg-gradient-to-r " +
                        acc.gradient +
                        " text-white shadow-md scale-[1.03]"
                    : "text-gray-600 bg-white hover:bg-gray-200"
                )
              }
            >
              {acc.name}
            </Tab>
          ))}
        </Tab.List>

        {/* Animated Panel */}
        <div className="mt-3 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={classNames(
                "rounded-xl p-8 shadow-xl text-center bg-gradient-to-br transition-all duration-500 ease-in-out",
                accounts[selectedIndex].gradient,
                accounts[selectedIndex].textColor
              )}
            >
              <div className="flex flex-col items-center space-y-4">
                {/* White Icon */}
                <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-gray-700">
                    {accounts[selectedIndex].icon}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold tracking-wide">
                  {accounts[selectedIndex].name}
                </h2>

                <div className="w-full max-w-xs bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30 relative">
                  <p className="text-sm text-white/80">Account Number</p>
                  <p className="text-2xl font-bold text-white tracking-wide">
                    {accounts[selectedIndex].number}
                  </p>

                  {/* Copy Button */}
                  <button
                    onClick={() =>
                      handleCopy(accounts[selectedIndex].number)
                    }
                    className="absolute right-3 top-3 bg-white/30 hover:bg-white/50 rounded-full p-2 transition"
                    title="Copy account number"
                  >
                    <Copy className="w-4 h-4 text-white" />
                  </button>

                  <div className="mt-3">
                    <p className="text-sm text-white/80">Account Name</p>
                    <p className="text-lg font-semibold text-white">
                      {accounts[selectedIndex].accountName}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-white/80">
                  Please confirm your payment reference after transfer.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tab.Group>

      {/* Custom Motion Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 
            bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
            text-white font-medium px-5 py-3 rounded-xl shadow-xl border border-white/10
            flex items-center gap-2 backdrop-blur-md"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              ✅
            </motion.span>
            Account number copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
