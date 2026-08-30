(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Frankfurt Rhein-Main-Neckar Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Fused map of Wiesbaden, Mainz, Frankfurt, Mannheim, Heidelberg, Ludwigshafen, Karlsruhe and the surrounding Rhein-Main and Rhein-Neckar towns, Germany, from Frankfurt Airport and Karlsruhe/Baden-Baden Airport across the joined S-Bahn Rhein-Main and S-Bahn RheinNeckar networks.',
            notification: 'Welcome to Frankfurt Rhein-Main-Neckar!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte fusionnee de Wiesbaden, Mayence, Francfort, Mannheim, Heidelberg, Ludwigshafen, Karlsruhe et des villes voisines du Rhein-Main et du Rhein-Neckar, Allemagne, des aeroports de Francfort et de Karlsruhe/Baden-Baden aux reseaux S-Bahn Rhein-Main et S-Bahn RheinNeckar reunis.',
            notification: 'Bienvenue a Frankfurt Rhein-Main-Neckar !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Frankfurt Rhein-Main-Neckar',
        code: 'WFK',
        description: t('description'),
        population: 6465096,
        initialViewState: { zoom: 8, latitude: 49.55, longitude: 8.5, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-wfk', label: 'Germany', cityCodes: ['WFK'] });

    api.map.setTileURLOverride({
        cityCode: 'WFK',
        tilesUrl: 'http://127.0.0.1:8091/WFK/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8091/WFK_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('WFK', {
        buildingsIndex: '/data/WFK/buildings_index.bin.gz',
        demandData: '/data/WFK/demand_data.json.gz',
        roads: '/data/WFK/roads.geojson.gz',
        runwaysTaxiways: '/data/WFK/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/WFK/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/WFK/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'WFK') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Frankfurt Rhein-Main-Neckar mod loaded successfully!');
})();
