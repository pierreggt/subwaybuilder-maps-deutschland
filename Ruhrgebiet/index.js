(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Ruhrgebiet Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Ruhrgebiet & Dusseldorf & Munster, Germany: Dortmund, Essen, Bochum, Duisburg, Wuppertal, Dusseldorf and Munster, sharing the VRR/Rhein-Ruhr-Express and regional rail network, from Dortmund and Dusseldorf Airports across the whole region.',
            notification: 'Welcome to Ruhrgebiet!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte du bassin de la Ruhr, Dusseldorf et Munster, Allemagne : Dortmund, Essen, Bochum, Duisbourg, Wuppertal, Dusseldorf et Munster, partageant le reseau VRR/Rhein-Ruhr-Express, des aeroports de Dortmund et Dusseldorf a toute la region.',
            notification: 'Bienvenue a Bassin de la Ruhr !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Ruhrgebiet',
        code: 'RHR',
        description: t('description'),
        population: 9064194,
        initialViewState: { zoom: 8, latitude: 51.575, longitude: 7.2, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-rhr', label: 'Germany', cityCodes: ['RHR'] });

    api.map.setTileURLOverride({
        cityCode: 'RHR',
        tilesUrl: 'http://127.0.0.1:8080/RHR/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/RHR_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('RHR', {
        buildingsIndex: '/data/RHR/buildings_index.bin.gz',
        demandData: '/data/RHR/demand_data.json.gz',
        roads: '/data/RHR/roads.geojson.gz',
        runwaysTaxiways: '/data/RHR/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/RHR/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/RHR/ocean_depth_index_contours.json.gz'
    });

    api.map.setLayerOverride({
        layerId: 'parks-large',
        sourceLayer: 'landuse',
        filter: ['in', ['get', 'kind'], ['literal',
            ['park','garden','nature_reserve','grass','cemetery','golf_course',
             'forest','wood','meadow','village_green','recreation_ground','pitch','zoo','allotments']]]
    });

    api.map.setLayerOverride({
        layerId: 'airports',
        sourceLayer: 'landuse',
        filter: ['==', ['get', 'kind'], 'aerodrome']
    });

    api.hooks.onCityLoad(function(cityCode) {
        if (cityCode === 'RHR') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Ruhrgebiet mod loaded successfully!');
})();
