(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Munich Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Munich, Germany, from the city center to Munich Airport, spanning the full S-Bahn network into surrounding Oberbayern.',
            notification: 'Welcome to Munich!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Munich, Allemagne, du centre-ville a l\'aeroport de Munich, sur tout le reseau S-Bahn de la region de Haute-Baviere.',
            notification: 'Bienvenue a Munich !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Munich',
        code: 'MUC',
        description: t('description'),
        population: 3045993,
        initialViewState: { zoom: 10, latitude: 48.137, longitude: 11.575, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-muc', label: 'Germany', cityCodes: ['MUC'] });

    api.map.setTileURLOverride({
        cityCode: 'MUC',
        tilesUrl: 'http://127.0.0.1:8080/MUC/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/MUC_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MUC', {
        buildingsIndex: '/data/MUC/buildings_index.bin.gz',
        demandData: '/data/MUC/demand_data.json.gz',
        roads: '/data/MUC/roads.geojson.gz',
        runwaysTaxiways: '/data/MUC/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MUC/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MUC/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MUC') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Munich mod loaded successfully!');
})();
