import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import CarbonFootprintDisplay from "./components/common/CarbonFootprintDisplay";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      {(import.meta.env.DEV || import.meta.env.VITE_CARBON_TRACKING === "true") && typeof PerformanceObserver !== "undefined" && <CarbonFootprintDisplay />}
    </AuthProvider>
  );
}

export default App;
