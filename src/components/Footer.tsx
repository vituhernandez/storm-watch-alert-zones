import { Shield, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-bold">Alerta SafeZone</span>
            </div>
            <p className="text-gray-300">
              Protegendo comunidades através do mapeamento inteligente de riscos de desastres naturais.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contatos de Emergência</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <span>Emergência: 190</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>Suporte: (11) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span>suporte@alerta-safezone.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Localização</h3>
            <div className="flex items-start space-x-2 text-sm text-gray-300">
              <MapPin className="h-4 w-4 text-red-400 mt-1" />
              <span>
                Centro de Operações de Emergência<br />
                Rua da Segurança, 123<br />
                São Paulo, SP 01234-567
              </span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2024 Alerta SafeZone. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;