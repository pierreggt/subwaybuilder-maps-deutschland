(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Chemnitz Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Chemnitz, Germany, from the TU Chemnitz campus to the surrounding towns of Limbach-Oberfrohna, Mittweida, Frankenberg, Burgstaedt, Stollberg, Floeha, Zschopau and Hainichen, covering the tram network.',
            notification: 'Welcome to Chemnitz!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Chemnitz, Allemagne, du campus de la TU Chemnitz aux villes voisines de Limbach-Oberfrohna, Mittweida, Frankenberg, Burgstaedt, Stollberg, Floeha, Zschopau et Hainichen, sur le reseau de tramway.',
            notification: 'Bienvenue a Chemnitz !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Chemnitz',
        code: 'CHZ',
        description: t('description'),
        population: 753133,
        initialViewState: { zoom: 10, latitude: 50.8278, longitude: 12.9214, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-chz', label: 'Germany', cityCodes: ['CHZ'] });

    api.map.setTileURLOverride({
        cityCode: 'CHZ',
        tilesUrl: 'http://127.0.0.1:8080/CHZ/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/CHZ_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('CHZ', {
        buildingsIndex: '/data/CHZ/buildings_index.bin.gz',
        demandData: '/data/CHZ/demand_data.json.gz',
        roads: '/data/CHZ/roads.geojson.gz',
        runwaysTaxiways: '/data/CHZ/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/CHZ/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/CHZ/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'CHZ') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Chemnitz mod loaded successfully!');
})();
