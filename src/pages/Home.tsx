import { AlertTriangle, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        {/* Header */}
        <Header />

        {/* Hero Content */}
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Mantenha-se Seguro Durante
              <span className="text-yellow-400 block">Desastres Naturais</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Mapeamento em tempo real de riscos de enchentes e deslizamentos para proteger sua comunidade. 
              Receba alertas instantâneos e visualize zonas de perigo em sua área.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                asChild
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg"
              >
                <Link to="/mapa">
                  <MapPin className="mr-2 h-5 w-5" />
                  Ver Mapa de Risco
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white border-green-500 px-8 py-3 text-lg"
              >
                <Link to="/contato">
                  Receber Alertas
                </Link>
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Monitoramento de Enchentes</h3>
                <p className="text-blue-100">Avaliação de risco de enchentes em tempo real e sistema de alerta precoce para sua área.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Alertas de Deslizamento</h3>
                <p className="text-blue-100">Monitoramento geológico avançado para detectar áreas propensas a deslizamentos.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Segurança Comunitária</h3>
                <p className="text-blue-100">Proteja sua família e vizinhos com notificações instantâneas de emergência.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;