
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
      <div className="container mx-auto px-4 py-2" style={{ paddingTop: '100px' }}>
        <div className="mb-2 flex justify-end">
          <GlobalSearch />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
