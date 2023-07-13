import * as React from 'react';
import {useState, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
const TOKEN = "pk.eyJ1IjoidXJpYTEzNDYiLCJhIjoiY2w0YmczdDhiMG92eDNsbzdtdGNvd3kxNyJ9.T8AiSpg2KXsfovyZk_Yc6w"


function BarterMap(props) {
  const [popupInfo, setPopupInfo] = useState(null);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        initialViewState={{
          latitude: 32.075874,
          longitude: 34.800098,
          zoom: 12.7,
          bearing: 0,
          pitch: 0
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        <Marker
          longitude={34.800098}
          latitude={32.075874}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(true);
          }}
        >
         <i className="fa fa-sign-in mx-2" aria-hidden="true"></i>
        </Marker>
        {/* {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )} */}
      </Map>

      {/* <ControlPanel /> */}
    </div>
  );
}

export default BarterMap;
