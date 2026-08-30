(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Nürnberg Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Nürnberg, Germany, including Fürth, Erlangen and Schwabach, from the city center to Nuremberg Airport, spanning the VGN network.',
            notification: 'Welcome to Nürnberg!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Nürnberg, Allemagne, incluant Fürth, Erlangen et Schwabach, du centre-ville a l\'aeroport de Nuremberg, sur le reseau VGN.',
            notification: 'Bienvenue a Nürnberg !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Nürnberg',
        code: 'NUE',
        description: t('description'),
        population: 1150414,
        initialViewState: { zoom: 10, latitude: 49.45, longitude: 11.07, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-nue', label: 'Germany', cityCodes: ['NUE'] });

    api.map.setTileURLOverride({
        cityCode: 'NUE',
        tilesUrl: 'http://127.0.0.1:8080/NUE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/NUE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('NUE', {
        buildingsIndex: '/data/NUE/buildings_index.bin.gz',
        demandData: '/data/NUE/demand_data.json.gz',
        roads: '/data/NUE/roads.geojson.gz',
        runwaysTaxiways: '/data/NUE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/NUE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/NUE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'NUE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Nürnberg mod loaded successfully!');
})();
