(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Stuttgart Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Stuttgart, Germany, from the city center to Stuttgart Airport, spanning the S-Bahn Stuttgart network into the surrounding region.',
            notification: 'Welcome to Stuttgart!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Stuttgart, Allemagne, du centre-ville a l\'aeroport de Stuttgart, sur le reseau S-Bahn Stuttgart de la region environnante.',
            notification: 'Bienvenue a Stuttgart !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Stuttgart',
        code: 'STU',
        description: t('description'),
        population: 1939666,
        initialViewState: { zoom: 11, latitude: 48.775, longitude: 9.18, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-stu', label: 'Germany', cityCodes: ['STU'] });

    api.map.setTileURLOverride({
        cityCode: 'STU',
        tilesUrl: 'http://127.0.0.1:8080/STU/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/STU_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('STU', {
        buildingsIndex: '/data/STU/buildings_index.bin.gz',
        demandData: '/data/STU/demand_data.json.gz',
        roads: '/data/STU/roads.geojson.gz',
        runwaysTaxiways: '/data/STU/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/STU/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/STU/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'STU') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Stuttgart mod loaded successfully!');
})();
