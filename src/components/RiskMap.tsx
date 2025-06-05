import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertTriangle, Droplets, Mountain } from 'lucide-react';

const RiskMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapboxToken = 'pk.eyJ1Ijoidml0dWhlcm5hbmRleiIsImEiOiJjbWJpdjJ2ZGkwYTU4Mmxwa2RqeGk4MTllIn0.2MWLm9B3jd6sDIvkl3AhZw';

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-74.5, 40.0], // New York area as example
      zoom: 9,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add flood risk areas
      map.current?.addSource('flood-risk', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-74.6, 40.1],
                  [-74.4, 40.1],
                  [-74.4, 39.9],
                  [-74.6, 39.9],
                  [-74.6, 40.1]
                ]]
              },
              properties: {
                risk: 'high',
                type: 'flood'
              }
            }
          ]
        }
      });

      map.current?.addLayer({
        id: 'flood-risk-layer',
        type: 'fill',
        source: 'flood-risk',
        paint: {
          'fill-color': '#3b82f6',
          'fill-opacity': 0.6
        }
      });

      // Add landslide risk areas
      map.current?.addSource('landslide-risk', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-74.3, 40.2],
                  [-74.1, 40.2],
                  [-74.1, 40.0],
                  [-74.3, 40.0],
                  [-74.3, 40.2]
                ]]
              },
              properties: {
                risk: 'high',
                type: 'landslide'
              }
            }
          ]
        }
      });

      map.current?.addLayer({
        id: 'landslide-risk-layer',
        type: 'fill',
        source: 'landslide-risk',
        paint: {
          'fill-color': '#f59e0b',
          'fill-opacity': 0.6
        }
      });

      // Add popup on click
      map.current?.on('click', 'flood-risk-layer', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML('<h3>Área de Risco de Enchente</h3><p>Alto risco de enchentes durante chuvas intensas</p>')
          .addTo(map.current!);
      });

      map.current?.on('click', 'landslide-risk-layer', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML('<h3>Área de Risco de Deslizamento</h3><p>Alto risco de deslizamentos em terreno íngreme</p>')
          .addTo(map.current!);
      });

      // Change cursor on hover
      map.current?.on('mouseenter', 'flood-risk-layer', () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current?.on('mouseleave', 'flood-risk-layer', () => {
        map.current!.getCanvas().style.cursor = '';
      });

      map.current?.on('mouseenter', 'landslide-risk-layer', () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current?.on('mouseleave', 'landslide-risk-layer', () => {
        map.current!.getCanvas().style.cursor = '';
      });
    });
  };

  useEffect(() => {
    initializeMap();
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section id="map-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Mapa Interativo de Riscos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore áreas de risco de enchentes e deslizamentos em tempo real em sua região. 
            Clique nas zonas coloridas para obter informações detalhadas sobre perigos potenciais.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                ref={mapContainer} 
                className="w-full h-96 lg:h-[500px]"
              />
            </div>
          </div>

          {/* Legend and Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Legenda de Riscos</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 bg-opacity-60 rounded mr-3"></div>
                  <div>
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Risco de Enchente</span>
                    </div>
                    <p className="text-sm text-gray-600">Áreas propensas a enchentes</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 bg-opacity-60 rounded mr-3"></div>
                  <div>
                    <div className="flex items-center">
                      <Mountain className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="font-medium">Risco de Deslizamento</span>
                    </div>
                    <p className="text-sm text-gray-600">Áreas propensas a deslizamentos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Alerta Meteorológico Atual</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Risco Moderado</p>
                    <p className="text-sm text-yellow-700">Chuva forte esperada nas próximas 24 horas. Monitore áreas propensas a enchentes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Contatos de Emergência</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Emergência:</strong> 190</p>
                <p><strong>Emergência Local:</strong> (11) 123-4567</p>
                <p><strong>Linha Direta Enchentes:</strong> (11) 123-ENCHENTE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskMap;