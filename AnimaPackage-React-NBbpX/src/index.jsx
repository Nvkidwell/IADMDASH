import React from "react";
import ReactDOMClient from "react-dom/client";
import { DashboardScreen } from "./screens/DashboardScreen";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<DashboardScreen />);
