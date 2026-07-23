import { AuthProvider } from "./Components/Auth";
import Router from "./Components/Router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
