import React, { useEffect } from 'react'
import { Marker,Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import * as ELG from 'esri-leaflet-geocoder';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
// L.marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({address}) => {
    const map = useMap();
    const [position, setPosition] = React.useState([60,19]);

    useEffect(() => {
      ELG.geocode().text(address).run((err, results, response) => {
        if (results?.results?.length > 0) {
          const {lat, lng} = results.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 6);
        }
      })
    }, [address])
  return (
    <Marker position={position} >
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
  )
}

export default GeoCoderMarker
