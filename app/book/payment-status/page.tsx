"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#000", color: "#fff" }}>
        <p style={{ fontSize: 18 }}>Loading...</p>
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
}

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const canceled = searchParams.get("canceled");

  const [status, setStatus] = useState<"loading" | "success" | "failed" | "canceled">(
    canceled ? "canceled" : "loading"
  );

  useEffect(() => {
    if (!sessionId || canceled) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/check-payment?session_id=${sessionId}`);
        const data = await res.json();
        setStatus(data.success ? "success" : "failed");
      } catch {
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [sessionId, canceled]);

  useEffect(() => {
    if (status === "success" || status === "canceled") {
      const timer = setTimeout(() => {
        window.location.href = "/book";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#000", color: "#fff" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: 32 }}>
        {status === "loading" && <p style={{ fontSize: 18 }}>Verifying your payment...</p>}

        {status === "success" && (
          <>
            <h1 style={{ fontSize: 28, marginBottom: 12 }}>Payment Successful</h1>
            <p style={{ fontSize: 16, opacity: 0.8 }}>
              Thank you for your purchase! Redirecting you to your book...
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <h1 style={{ fontSize: 28, marginBottom: 12 }}>Payment Failed</h1>
            <p style={{ fontSize: 16, opacity: 0.8 }}>
              Something went wrong with your payment. Please try again.
            </p>
            <button
              onClick={() => { window.location.href = "/book"; }}
              style={{ marginTop: 20, padding: "10px 24px", background: "#fff", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14 }}
            >
              Back to Book
            </button>
          </>
        )}

        {status === "canceled" && (
          <>
            <h1 style={{ fontSize: 28, marginBottom: 12 }}>Payment Canceled</h1>
            <p style={{ fontSize: 16, opacity: 0.8 }}>
              Your payment was canceled. Redirecting you back...
            </p>
          </>
        )}
      </div>
    </div>
  );
}