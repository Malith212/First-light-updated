import React from "react";
import Header from "./header";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return <div>
    <Header />
    {children}
  </div>;
}

export default LayoutProvider;
