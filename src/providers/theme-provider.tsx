import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6d28d9", 
            borderRadius: 8,
            colorBgContainer: "#1f2937",
            colorText: "#f3f4f6",
            colorBorder: "#374151",
            colorBgElevated: "#1f2937",
          },
          components: {
            Button: {
              controlHeight: 42,
              defaultBg: "#6d28d9",
              defaultColor: "#ffffff",
              defaultBorderColor: "transparent",
              boxShadow: "none",
              controlOutline: "none",
              hoverBg: "#7c3aed",
              activeBg: "#5b21b6",
            },
            Input: {
              controlHeight: 42,
              activeShadow: "none",
              boxShadow: "none",
              colorBorder: "#374151",
              colorBgContainer: "#1f2937",
              colorText: "#f3f4f6",
              hoverBorderColor: "#6d28d9",
            },
            Select: {
              controlHeight: 42,
              boxShadow: "none",
              colorBorder: "#374151",
              controlOutline: "none",
              colorBgContainer: "#1f2937",
              colorText: "#f3f4f6",
              colorPrimaryHover: "#6d28d9",
              optionSelectedBg: "#374151",
            },
            Modal: {
              colorBgMask: "rgba(0, 0, 0, 0.75)",
              colorBgElevated: "#1f2937",
              colorText: "#f3f4f6",
            },
            Drawer: {
              colorBgElevated: "#1f2937",
              colorText: "#f3f4f6",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
