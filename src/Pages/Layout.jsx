import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="shrink-0">
        <Navbar />
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;