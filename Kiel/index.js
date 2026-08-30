(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Kiel Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Kiel, Germany, from the CAU campus to the surrounding towns of Preetz, Schwentinental, Altenholz, Ploen, Heikendorf, Schoenkirchen and Molfsee.',
            notification: 'Welcome to Kiel!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Kiel, Allemagne, du campus de la CAU aux villes voisines de Preetz, Schwentinental, Altenholz, Ploen, Heikendorf, Schoenkirchen et Molfsee.',
            notification: 'Bienvenue a Kiel !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Kiel',
        code: 'KIL',
        description: t('description'),
        population: 731723,
        initialViewState: { zoom: 11, latitude: 54.3233, longitude: 10.1228, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-kil', label: 'Germany', cityCodes: ['KIL'] });

    api.map.setTileURLOverride({
        cityCode: 'KIL',
        tilesUrl: 'http://127.0.0.1:8080/KIL/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/KIL_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('KIL', {
        buildingsIndex: '/data/KIL/buildings_index.bin.gz',
        demandData: '/data/KIL/demand_data.json.gz',
        roads: '/data/KIL/roads.geojson.gz',
        runwaysTaxiways: '/data/KIL/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/KIL/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/KIL/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'KIL') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Kiel mod loaded successfully!');
})();
