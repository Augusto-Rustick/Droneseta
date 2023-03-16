import AppRoutes from "./components/AppRoutes/AppRoutes";
import { AuthProvider } from "./contexts/auth";
import { NotificationProvider } from "./contexts/notification";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
