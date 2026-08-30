(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Lübeck Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Luebeck, Germany, from Luebeck-Blankensee Airport (LBC) to the university campus and the surrounding towns of Bad Schwartau, Stockelsdorf, Ratekau, Gross Groenau and Krummesse.',
            notification: 'Welcome to Lübeck!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Lübeck, Allemagne, de l aeroport de Luebeck-Blankensee (LBC) au campus universitaire et aux villes voisines de Bad Schwartau, Stockelsdorf, Ratekau, Gross Groenau et Krummesse.',
            notification: 'Bienvenue a Lübeck !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Lübeck',
        code: 'LUB',
        description: t('description'),
        population: 362607,
        initialViewState: { zoom: 11, latitude: 53.8655, longitude: 10.6866, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-lub', label: 'Germany', cityCodes: ['LUB'] });

    api.map.setTileURLOverride({
        cityCode: 'LUB',
        tilesUrl: 'http://127.0.0.1:8080/LUB/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/LUB_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('LUB', {
        buildingsIndex: '/data/LUB/buildings_index.bin.gz',
        demandData: '/data/LUB/demand_data.json.gz',
        roads: '/data/LUB/roads.geojson.gz',
        runwaysTaxiways: '/data/LUB/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/LUB/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/LUB/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'LUB') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Lübeck mod loaded successfully!');
})();
