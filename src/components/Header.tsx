import { Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Alerta SafeZone</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-yellow-400' : 'text-white hover:text-blue-200'}`}
            >
              Início
            </Link>
            <Link 
              to="/mapa" 
              className={`transition-colors ${isActive('/mapa') ? 'text-yellow-400' : 'text-white hover:text-blue-200'}`}
            >
              Mapa de Risco
            </Link>
            <Link 
              to="/contato" 
              className={`transition-colors ${isActive('/contato') ? 'text-yellow-400' : 'text-white hover:text-blue-200'}`}
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;