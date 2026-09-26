import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import CarbonFootprintDisplay from "./components/common/CarbonFootprintDisplay";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <CarbonFootprintDisplay />
    </AuthProvider>
  );
}

export default App;
