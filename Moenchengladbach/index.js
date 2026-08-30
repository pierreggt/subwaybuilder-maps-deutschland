(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Moenchengladbach Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Moenchengladbach, Germany and its immediate neighbours Willich, Viersen, Korschenbroich and Juechen, covering the NEW AG tram and bus network.',
            notification: 'Welcome to Moenchengladbach!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Moenchengladbach, Allemagne et de ses voisines immediates Willich, Viersen, Korschenbroich et Juechen, couvrant le reseau tram/bus NEW AG.',
            notification: 'Bienvenue a Mönchengladbach !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Moenchengladbach',
        code: 'MGL',
        description: t('description'),
        population: 567280,
        initialViewState: { zoom: 10, latitude: 51.19, longitude: 6.44, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-mgl', label: 'Germany', cityCodes: ['MGL'] });

    api.map.setTileURLOverride({
        cityCode: 'MGL',
        tilesUrl: 'http://127.0.0.1:8082/MGL/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8082/MGL_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MGL', {
        buildingsIndex: '/data/MGL/buildings_index.bin.gz',
        demandData: '/data/MGL/demand_data.json.gz',
        roads: '/data/MGL/roads.geojson.gz',
        runwaysTaxiways: '/data/MGL/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MGL/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MGL/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MGL') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Moenchengladbach mod loaded successfully!');
})();
