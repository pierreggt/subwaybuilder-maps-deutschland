(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Hannover-Braunschweig Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Fused map of Hannover and Braunschweig, Germany, from Hannover Airport and Braunschweig-Wolfsburg Airport to the surrounding Region Hannover and Braunschweig towns, covering the joined Region Hannover and Braunschweig Stadtbahn/tram networks.',
            notification: 'Welcome to Hannover-Braunschweig!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte fusionnee de Hanovre et Brunswick, Allemagne, des aeroports de Hanovre et de Braunschweig-Wolfsburg aux villes voisines de la Region Hannover et de Brunswick, sur les reseaux de Stadtbahn/tramway reunis.',
            notification: 'Bienvenue a Hanovre-Brunswick !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Hannover-Braunschweig',
        code: 'HBS',
        description: t('description'),
        population: 1335246,
        initialViewState: { zoom: 9, latitude: 52.32, longitude: 10.05, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-hbs', label: 'Germany', cityCodes: ['HBS'] });

    api.map.setTileURLOverride({
        cityCode: 'HBS',
        tilesUrl: 'http://127.0.0.1:8090/HBS/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8090/HBS_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('HBS', {
        buildingsIndex: '/data/HBS/buildings_index.bin.gz',
        demandData: '/data/HBS/demand_data.json.gz',
        roads: '/data/HBS/roads.geojson.gz',
        runwaysTaxiways: '/data/HBS/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/HBS/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/HBS/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'HBS') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Hannover-Braunschweig mod loaded successfully!');
})();
