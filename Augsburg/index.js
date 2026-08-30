(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Augsburg Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Augsburg, Germany and its surrounding towns: Neusaess, Gersthofen, Stadtbergen, Friedberg and Koenigsbrunn, covering the Augsburger Verkehrsverbund (AVV) tram and bus network across the Augsburg Speckguertel.',
            notification: 'Welcome to Augsburg!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte d Augsbourg, Allemagne et de ses villes voisines Neusaess, Gersthofen, Stadtbergen, Friedberg et Koenigsbrunn, couvrant le reseau tram/bus AVV de la ceinture urbaine d Augsbourg.',
            notification: 'Bienvenue a Augsbourg !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Augsburg',
        code: 'AUG',
        description: t('description'),
        population: 552151,
        initialViewState: { zoom: 10, latitude: 48.365, longitude: 10.9, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-aug', label: 'Germany', cityCodes: ['AUG'] });

    api.map.setTileURLOverride({
        cityCode: 'AUG',
        tilesUrl: 'http://127.0.0.1:8081/AUG/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8081/AUG_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('AUG', {
        buildingsIndex: '/data/AUG/buildings_index.bin.gz',
        demandData: '/data/AUG/demand_data.json.gz',
        roads: '/data/AUG/roads.geojson.gz',
        runwaysTaxiways: '/data/AUG/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/AUG/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/AUG/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'AUG') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Augsburg mod loaded successfully!');
})();
