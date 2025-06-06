import { Shield, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationLinks = [
    { to: "/", label: "Início" },
    { to: "/mapa", label: "Mapa de Risco" },
    { to: "/contato", label: "Contato" }
  ];

  return (
    <nav className="w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Alerta SafeZone</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex space-x-6">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`transition-colors ${isActive(link.to) ? 'text-yellow-400' : 'text-white hover:text-blue-200'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="text-white hover:text-blue-200 transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white/10 backdrop-blur-md border-white/20">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigationLinks.map((link) => (
                    <Link 
                      key={link.to}
                      to={link.to} 
                      className={`transition-colors text-lg ${isActive(link.to) ? 'text-yellow-400' : 'text-white hover:text-blue-200'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;