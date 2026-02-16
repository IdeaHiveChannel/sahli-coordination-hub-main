import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initGA } from "./lib/gtag";
import { storageService } from "./lib/storageService";

initGA();
storageService.seedInitialData();

createRoot(document.getElementById("root")!).render(<App />);
