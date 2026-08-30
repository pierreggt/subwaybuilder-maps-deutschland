(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Bonn-Köln Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Fused map of Bonn and Köln, Germany, from Cologne Bonn Airport to the surrounding Rhein-Sieg-Kreis, Rhein-Erft-Kreis and Rheinisch-Bergischer Kreis towns, covering the joined KVB and SWB Stadtbahn networks.',
            notification: 'Welcome to Bonn-Köln!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte fusionnee de Bonn et Köln, Allemagne, de l aeroport de Cologne-Bonn aux villes voisines du Rhein-Sieg-Kreis, Rhein-Erft-Kreis et Rheinisch-Bergischer Kreis, sur les reseaux de Stadtbahn KVB et SWB reunis.',
            notification: 'Bienvenue a Bonn-Köln !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Bonn-Köln',
        code: 'BNC',
        description: t('description'),
        population: 2839773,
        initialViewState: { zoom: 10, latitude: 50.83, longitude: 7.02, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-bnc', label: 'Germany', cityCodes: ['BNC'] });

    api.map.setTileURLOverride({
        cityCode: 'BNC',
        tilesUrl: 'http://127.0.0.1:8088/BNC/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8088/BNC_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('BNC', {
        buildingsIndex: '/data/BNC/buildings_index.bin.gz',
        demandData: '/data/BNC/demand_data.json.gz',
        roads: '/data/BNC/roads.geojson.gz',
        runwaysTaxiways: '/data/BNC/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/BNC/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/BNC/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'BNC') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Bonn-Köln mod loaded successfully!');
})();
