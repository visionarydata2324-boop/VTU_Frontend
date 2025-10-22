// src/components/AdminToggle.jsx
import React, { useState, useEffect } from "react";
import BASE_URLS, { getBaseUrl, setBaseUrl } from "../config";

export default function AdminBaseUrlSwitch() {
  const [activeUrl, setActiveUrl] = useState(getBaseUrl());

  useEffect(() => {
    setActiveUrl(getBaseUrl());
  }, []);

  const handleToggle = () => {
    if (activeUrl === BASE_URLS.default) {
      setBaseUrl("alternate");
      setActiveUrl(BASE_URLS.alternate);
    } else {
      setBaseUrl("default");
      setActiveUrl(BASE_URLS.default);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        {/* Headline */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Server Manager
        </h2>

        {/* Subtitle / Description */}
        <p className="text-gray-600 text-center mb-6">
            Easily switch between your <span className="font-semibold">Default</span> and <span className="font-semibold">Backup</span> Server.  
            This helps ensure reliability in case one server is down.
        </p>

        {/* Toggle Section */}
            <div className="flex flex-col items-center gap-4">
                <button
                onClick={handleToggle}
                className="px-6 py-3 rounded-md shadow-md text-white font-semibold transition bg-blue-600 hover:bg-blue-800 w-full"
                >
                Switch to {activeUrl === BASE_URLS.default ? "Backup URL" : "Default URL"}
                </button>

                <div className="text-sm text-gray-700 text-center">
                    <p className="mb-3">🔗 <span className="font-semibold">Current Server:</span></p>
                    <code className="bg-gray-100 px-3 py-1 rounded-md text-blue-700 text-sm">
                        {activeUrl}
                    </code>
                </div>
            </div>
        </div>

  );
}
