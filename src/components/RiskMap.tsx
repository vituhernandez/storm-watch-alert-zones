import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertTriangle, Droplets, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RiskMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap();
    }
  };

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
          .setHTML('<h3>Flood Risk Area</h3><p>High risk of flooding during heavy rainfall</p>')
          .addTo(map.current!);
      });

      map.current?.on('click', 'landslide-risk-layer', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML('<h3>Landslide Risk Area</h3><p>High risk of landslides on steep terrain</p>')
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
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section id="map-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Risk Map</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore real-time flood and landslide risk areas in your region. 
            Click on colored zones to get detailed information about potential hazards.
          </p>
        </div>

        {!isTokenSet ? (
          <div className="max-w-md mx-auto mb-8 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Enter Mapbox Token</h3>
            <p className="text-sm text-gray-600 mb-4">
              To display the interactive map, please enter your Mapbox public token. 
              You can get one at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your Mapbox token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTokenSubmit}>Set Token</Button>
            </div>
          </div>
        ) : null}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                ref={mapContainer} 
                className="w-full h-96 lg:h-[500px]"
                style={{ display: isTokenSet ? 'block' : 'none' }}
              />
              {!isTokenSet && (
                <div className="w-full h-96 lg:h-[500px] bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Map will appear after setting Mapbox token</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Legend and Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 bg-opacity-60 rounded mr-3"></div>
                  <div>
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Flood Risk</span>
                    </div>
                    <p className="text-sm text-gray-600">Areas prone to flooding</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 bg-opacity-60 rounded mr-3"></div>
                  <div>
                    <div className="flex items-center">
                      <Mountain className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="font-medium">Landslide Risk</span>
                    </div>
                    <p className="text-sm text-gray-600">Areas prone to landslides</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Current Weather Alert</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Moderate Risk</p>
                    <p className="text-sm text-yellow-700">Heavy rainfall expected in the next 24 hours. Monitor flood-prone areas.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Emergency:</strong> 911</p>
                <p><strong>Local Emergency:</strong> (555) 123-4567</p>
                <p><strong>Flood Hotline:</strong> (555) 123-FLOOD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskMap;