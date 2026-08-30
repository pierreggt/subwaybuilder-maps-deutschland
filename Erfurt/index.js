(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Erfurt Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Erfurt, Germany, from Erfurt-Weimar Airport to the university campus and the surrounding towns of Weimar, Gotha, Arnstadt, Soemmerda, Apolda, Bad Berka, Nesse-Apfelstaedt and Stadtilm, covering the tram network.',
            notification: 'Welcome to Erfurt!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte d Erfurt, Allemagne, de l aeroport d Erfurt-Weimar au campus universitaire et aux villes voisines de Weimar, Gotha, Arnstadt, Soemmerda, Apolda, Bad Berka, Nesse-Apfelstaedt et Stadtilm, sur le reseau de tramway.',
            notification: 'Bienvenue a Erfurt !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Erfurt',
        code: 'ERF',
        description: t('description'),
        population: 1037939,
        initialViewState: { zoom: 10, latitude: 50.9848, longitude: 11.0299, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-erf', label: 'Germany', cityCodes: ['ERF'] });

    api.map.setTileURLOverride({
        cityCode: 'ERF',
        tilesUrl: 'http://127.0.0.1:8086/ERF/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8086/ERF_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('ERF', {
        buildingsIndex: '/data/ERF/buildings_index.bin.gz',
        demandData: '/data/ERF/demand_data.json.gz',
        roads: '/data/ERF/roads.geojson.gz',
        runwaysTaxiways: '/data/ERF/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/ERF/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/ERF/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'ERF') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Erfurt mod loaded successfully!');
})();
