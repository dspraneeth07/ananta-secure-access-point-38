
import { ReactNode } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import GlobalSearch from "./GlobalSearch";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-4" style={{ paddingTop: '120px' }}>
        <div className="mb-4 flex justify-end">
          <GlobalSearch />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
