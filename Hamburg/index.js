(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Hamburg Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Hamburg, Germany, from the city center to Hamburg Airport and the S-Bahn/U-Bahn network extending into Schleswig-Holstein.',
            notification: 'Welcome to Hamburg!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Hambourg, Allemagne, du centre-ville a l\'aeroport de Hambourg et au reseau S-Bahn/U-Bahn qui s\'etend dans le Schleswig-Holstein.',
            notification: 'Bienvenue a Hambourg !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Hamburg',
        code: 'HAM',
        description: t('description'),
        population: 2968841,
        initialViewState: { zoom: 11, latitude: 53.5675, longitude: 10.0, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-ham', label: 'Germany', cityCodes: ['HAM'] });

    api.map.setTileURLOverride({
        cityCode: 'HAM',
        tilesUrl: 'http://127.0.0.1:8080/HAM/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/HAM_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('HAM', {
        buildingsIndex: '/data/HAM/buildings_index.bin.gz',
        demandData: '/data/HAM/demand_data.json.gz',
        roads: '/data/HAM/roads.geojson.gz',
        runwaysTaxiways: '/data/HAM/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/HAM/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/HAM/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'HAM') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Hamburg mod loaded successfully!');
})();
