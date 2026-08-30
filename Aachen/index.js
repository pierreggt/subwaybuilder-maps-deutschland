(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Aachen Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Aachen, Germany, from the RWTH campus to the surrounding Staedteregion towns of Wuerselen, Eschweiler, Stolberg, Herzogenrath, Alsdorf and Baesweiler.',
            notification: 'Welcome to Aachen!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte d Aix-la-Chapelle, Allemagne, du campus de la RWTH aux villes voisines de la Staedteregion : Wurselen, Eschweiler, Stolberg, Herzogenrath, Alsdorf et Baesweiler.',
            notification: 'Bienvenue a Aix-la-Chapelle !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Aachen',
        code: 'AAC',
        description: t('description'),
        population: 972674,
        initialViewState: { zoom: 11, latitude: 50.7753, longitude: 6.0839, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-aac', label: 'Germany', cityCodes: ['AAC'] });

    api.map.setTileURLOverride({
        cityCode: 'AAC',
        tilesUrl: 'http://127.0.0.1:8080/AAC/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/AAC_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('AAC', {
        buildingsIndex: '/data/AAC/buildings_index.bin.gz',
        demandData: '/data/AAC/demand_data.json.gz',
        roads: '/data/AAC/roads.geojson.gz',
        runwaysTaxiways: '/data/AAC/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/AAC/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/AAC/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'AAC') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Aachen mod loaded successfully!');
})();
