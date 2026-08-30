(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Freiburg im Breisgau Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Freiburg im Breisgau, Germany, from the university campus to the surrounding towns of Emmendingen, Bad Krozingen, Waldkirch, Muellheim, Denzlingen, Gundelfingen, Kirchzarten and Merzhausen, covering the tram network.',
            notification: 'Welcome to Freiburg im Breisgau!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Fribourg-en-Brisgau, Allemagne, du campus universitaire aux villes voisines de Emmendingen, Bad Krozingen, Waldkirch, Muellheim, Denzlingen, Gundelfingen, Kirchzarten et Merzhausen, sur le reseau de tramway.',
            notification: 'Bienvenue a Fribourg-en-Brisgau !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Freiburg im Breisgau',
        code: 'FRB',
        description: t('description'),
        population: 828122,
        initialViewState: { zoom: 10, latitude: 47.999, longitude: 7.8421, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-frb', label: 'Germany', cityCodes: ['FRB'] });

    api.map.setTileURLOverride({
        cityCode: 'FRB',
        tilesUrl: 'http://127.0.0.1:8084/FRB/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8084/FRB_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('FRB', {
        buildingsIndex: '/data/FRB/buildings_index.bin.gz',
        demandData: '/data/FRB/demand_data.json.gz',
        roads: '/data/FRB/roads.geojson.gz',
        runwaysTaxiways: '/data/FRB/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/FRB/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/FRB/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'FRB') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Freiburg im Breisgau mod loaded successfully!');
})();
