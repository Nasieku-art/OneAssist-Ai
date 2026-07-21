import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col h-screen ">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;