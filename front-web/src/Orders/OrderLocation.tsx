import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AsyncSelect from "react-select/async";
import { fetchLocalMapBox } from "../api";
import { OrderLocationData } from "./types";

const initialPosition = {
  lat: -15.8414546,
  lng: -48.0440658,
};

type Place = {
  label?: string;
  value?: string;
  position: {
    lat: number;
    lng: number;
  };
};

type Props = {
  onChangeLocation: (location : OrderLocationData) => void; 
};

function OrderLocation({ onChangeLocation }: Readonly<Props>) {
  const [address, setAddress] = useState<Place>({
    position: initialPosition,
  });

  const loadOptions = async (inputValue: string): Promise<Place[]> => {
    const response = await fetchLocalMapBox(inputValue);

    const places = response.data.features.map((item: any) => ({
      label: item.place_name,
      value: item.place_name,
      position: {
        lat: item.center[1],
        lng: item.center[0],
      },
    }));

    return places;
  };

  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    onChangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      address: place.label!,
    });
  };

  return (
    <div className="order-location-container">
      <div className="order-location-content">
        <h3 className="order-location-title">
          Selecione onde o pedido será entregue:
        </h3>
        <div className="filter-container">
          <AsyncSelect
            placeholder="Digite um endereço para entrega: "
            className="filter"
            loadOptions={loadOptions}
            onChange={(value) => handleChangeSelect(value as Place)}
          />
        </div>
        <MapContainer
          center={address.position}
          zoom={17}
          key={address.position.lat}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={address.position}>
            <Popup>{address.label}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default OrderLocation;
