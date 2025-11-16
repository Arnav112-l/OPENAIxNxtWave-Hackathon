import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapViewProps {
  className?: string;
}

export const MapView: React.FC<MapViewProps> = ({ className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || initialized) return;

    const initializeMap = async () => {
      try {
        const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
        
        console.log('Initializing map with API key:', apiKey ? 'Present' : 'Missing');
        
        if (!apiKey) {
          setError('MapTiler API key not configured');
          setLoading(false);
          return;
        }

        // Default location - New Delhi
        const defaultLocation: [number, number] = [77.2090, 28.6139];

        map.current = new maplibregl.Map({
          container: mapContainer.current!,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
          center: defaultLocation,
          zoom: 13,
          attributionControl: false,
        });

        setInitialized(true);

        // Add navigation controls
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        map.current.on('load', () => {
          console.log('Map loaded successfully');
          setLoading(false);

          if (!map.current) return;

          // Add user location marker
          new maplibregl.Marker({ color: '#d97706' })
            .setLngLat(defaultLocation)
            .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML('<div style="padding: 8px;"><strong>Your Location</strong></div>'))
            .addTo(map.current);

          // Add sample store markers
          const stores = [
            { lng: 77.2100, lat: 28.6189, name: 'Patel Store' },
            { lng: 77.2150, lat: 28.6100, name: 'Sharma Kirana' },
            { lng: 77.2050, lat: 28.6150, name: 'Gupta General Store' },
          ];

          stores.forEach((store) => {
            if (map.current) {
              new maplibregl.Marker({ color: '#ea580c', scale: 0.8 })
                .setLngLat([store.lng, store.lat])
                .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(`<div style="padding: 8px;"><strong>${store.name}</strong></div>`))
                .addTo(map.current);
            }
          });
        });

        map.current.on('error', (e) => {
          console.error('Map error:', e);
          setError(`Failed to load map: ${e.error?.message || 'Unknown error'}`);
          setLoading(false);
        });

        // Set a timeout in case the map doesn't load
        setTimeout(() => {
          if (loading && !error) {
            console.error('Map load timeout');
            setError('Map loading timed out. Please refresh the page.');
            setLoading(false);
          }
        }, 15000);

      } catch (err: any) {
        console.error('Error initializing map:', err);
        setError(`Failed to initialize map: ${err.message}`);
        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initialized, loading, error]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img 
          src="/map.png" 
          alt="Map Loading" 
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative ${className} overflow-hidden`}>
        <img 
          src="/map.png" 
          alt="Map View" 
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white/95 dark:bg-stone-800/95 rounded-xl p-4 text-center">
            <p className="text-stone-600 dark:text-stone-400 text-sm">Map View</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden`}>
      <img 
        src="/map.png" 
        alt="Interactive Map" 
        className="w-full h-full object-cover rounded-2xl"
      />
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

