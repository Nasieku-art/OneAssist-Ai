
import Router from "./Components/Router";
import { AuthProvider } from "./Components/Auth";
 
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
 
export default App;
 
