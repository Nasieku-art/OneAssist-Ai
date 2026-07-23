import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useAuth } from "../Components/Auth";

function Layout({ children }) {
  const { isAuthenticated, fullName, logout } = useAuth();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="shrink-0">
        <Navbar
          isAuthenticated={isAuthenticated}
          fullName={fullName}
          onProfileClick={logout}
        />
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;