"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
    >
      Back
    </button>
  );
};

export default BackButton;
