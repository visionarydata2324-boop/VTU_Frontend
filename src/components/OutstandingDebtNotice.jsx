import React from "react";
import { AlertCircle } from "lucide-react"; // optional: `npm i lucide-react`

export default function OutstandingDebtNotice({
  title = "Important Notice",
  message = "This is a default notice message.",
  className = "",
}) {
  return (
    <div
      role="note"
      aria-label={title}
      className={`flex items-start gap-3 rounded-b-xl border border-amber-300 bg-amber-50/70 p-3 text-amber-900 ${className}`}
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold">{title}</p>
        <p className="whitespace-pre-line text-sm">{message}</p>
      </div>
    </div>
  );
}
