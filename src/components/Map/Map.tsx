import { Cookies, withCookies } from 'react-cookie';
import { IClaimLocation } from '../../apis/types';
import { Text } from '../../theme/components';
import { position } from 'polished';
import React, { useEffect, useRef, useState } from 'react';
import config from '../../../config';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

const mapboxglAccessToken = config.mapBoxApiKey;
const mapStyle = config.mapBoxStyle;

mapboxgl.accessToken = config.mapBoxApiKey;

type MapProps = {
    claims: IClaimLocation[];
    cookies: Cookies;
};

type MapPosProps = {
    lng: number;
    lat: number;
    zoom: number;
};

const MapWrapper = styled.div`
    height: 100%;
    position: relative;
    width: 100%;

    .map-container {
        ${position('absolute')};
    }

    .mapboxgl-canvas {
        outline: 0;
    }
`;

const MapComponent = (props: MapProps) => {
    const { claims, cookies } = props;
    const [map, setMap] = useState<mapboxgl.Map>(undefined as any);
    const [mapPos, setMapPos] = useState<MapPosProps>({
        lat: cookies.get('lat') || 0,
        lng: cookies.get('lng') || 0,
        zoom: cookies.get('zoom') || 4
    });

    const mapContainer = useRef<any>();

    useEffect(() => {
        if (mapboxglAccessToken) {
            const map = new mapboxgl.Map({
                attributionControl: false,
                center: [mapPos.lng, mapPos.lat],
                container: mapContainer.current,
                style: mapStyle,
                zoom: mapPos.zoom
            });

            setMap(map);

            const bounds = new mapboxgl.LngLatBounds();

            claims.forEach(claim => bounds.extend([claim.gps.longitude, claim.gps.latitude]));
            bounds.setNorthEast({ lat: bounds.getNorthEast().lat + 2, lng: bounds.getNorthEast().lng });
            bounds.setSouthWest({ lat: bounds.getSouthWest().lat - 2, lng: bounds.getSouthWest().lng });

            const claimFeatures = claims.map(claim => ({
                geometry: {
                    coordinates: [claim.gps.longitude, claim.gps.latitude],
                    type: 'Point'
                },
                type: 'Feature'
            }));

            map.fitBounds(bounds);
            map.setMaxZoom(12);

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                // true for mobile device
                map.dragPan.disable();
            }

            // Add zoom and rotation controls to the map.
            map.addControl(new mapboxgl.NavigationControl());

            map.on('move', () => {
                const { lat, lng } = map.getCenter();
                const zoom = map.getZoom();

                setMapPos({ lat, lng, zoom });
            });

            const mapData = {
                features: claimFeatures,
                type: 'FeatureCollection'
            };

            map.on('load', () => {
                cookies.set('lng', map.getCenter().lng, { path: '/' });
                cookies.set('lat', map.getCenter().lat, { path: '/' });
                cookies.set('zoom', map.getZoom(), { path: '/' });
                // Add a geojson point source.
                // Heatmap layers also work with a vector tile source.
                map.addSource('claims', {
                    data: mapData as any,
                    type: 'geojson'
                });

                /* eslint-disable sort-keys */
                map.addLayer(
                    {
                        id: 'claims-heat',
                        type: 'heatmap',
                        source: 'claims',
                        maxzoom: 12.5,
                        paint: {
                            // Increase the heatmap color weight weight by zoom level
                            // heatmap-intensity is a multiplier on top of heatmap-weight
                            'heatmap-intensity': 1,
                            'heatmap-weight': 1,
                            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                            // Begin color ramp at 0-stop with a 0-transparancy color
                            // to create a blur-like effect.
                            'heatmap-color': [
                                'interpolate',
                                ['linear'],
                                ['heatmap-density'],
                                0,
                                'rgba(0, 0, 255, 0)',
                                0.12,
                                'hsl(111, 72%, 87%)',
                                0.35,
                                'hsl(82, 87%, 60%)',
                                0.6,
                                'hsl(65, 96%, 54%)',
                                0.85,
                                'hsl(49, 100%, 58%)',
                                0.99,
                                'hsl(10, 94%, 56%)'
                            ],
                            // Transition from heatmap to circle layer by zoom level
                            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.8, 12, 0.5],
                            // Adjust the heatmap radius by zoom level
                            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 1, 12, 20]
                        }
                    },
                    'waterway-label'
                );
                /* eslint-enable sort-keys */
            });
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [mapContainer]);

    if (!mapboxglAccessToken) {
        return (
            <MapWrapper style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <Text semibold textSecondary>
                    No token to present map
                </Text>
            </MapWrapper>
        );
    }

    return <MapWrapper onBlur={() => map.dragPan.disable()} onFocus={() => map.dragPan.enable()} ref={mapContainer} />;
};

export const Map = withCookies(MapComponent) as any;
