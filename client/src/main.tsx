import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Extend window type for Google AdSense
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// Google AdSense Script
const script = document.createElement("script");
script.async = true;
script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx";
script.crossOrigin = "anonymous";
document.head.appendChild(script);

// Push ad unit configuration
window.adsbygoogle = window.adsbygoogle || [];

createRoot(document.getElementById("root")!).render(<App />);
