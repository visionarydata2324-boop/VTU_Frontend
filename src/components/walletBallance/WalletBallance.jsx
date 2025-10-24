import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getBaseUrl } from "../../config";

export default function WalletBalance() {
  const [balance, setBalance] = useState(null); // holds wallet balance
  const [error, setError] = useState(null); // holds any error messages

  const { existingUser } = useSelector((state) => state.user);


useEffect(() => {
  const token = localStorage.getItem("authToken");

  fetchEventSource(`${getBaseUrl()}/api/v1/wallet-balance/subscribe`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onmessage(ev) {
      const data = JSON.parse(ev.data);
      // console.log(token);
      // console.log(data.error);
      if (data.balance !== undefined) {
        setBalance(data.balance);
      } else if (data.error) {
        setError(data.error);
      }
    },
    onerror(err) {
      // console.error("SSE error:", err);
      setError("Connection lost. Retrying...");
    },
  });
}, []);

  return (
    <div className="">
      {/* <h1 className="text-lg font-bold">Wallet Balance</h1> */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {balance !== null && (
        <p className="font-bold text-xl">₦{balance}</p>
      )}
    </div>
  );
}
