(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Bremen Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Bremen, Germany and its surrounding Niedersachsen towns: Achim, Bassum, Berne, Breddorf, Dötlingen, Elsfleth, Emtinghausen, Ganderkesee, Grasberg, Groß Ippener, Hambergen, Hepstedt, Hude, Kirchseelte, Lemwerder, Lilienthal, Osterholz-Scharmbeck, Ottersberg, Oyten, Prinzhöfte, Riede, Ritterhude, Schwanewede, Stuhr, Syke, Tarmstedt, Thedinghausen, Weyhe, Wilstedt and Worpswede, from the city center to Bremen Airport.',
            notification: 'Welcome to Bremen!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Breme, Allemagne, et des communes voisines de Basse-Saxe (Achim, Bassum, Berne, Breddorf, Dötlingen, Elsfleth, Emtinghausen, Ganderkesee, Grasberg, Groß Ippener, Hambergen, Hepstedt, Hude, Kirchseelte, Lemwerder, Lilienthal, Osterholz-Scharmbeck, Ottersberg, Oyten, Prinzhöfte, Riede, Ritterhude, Schwanewede, Stuhr, Syke, Tarmstedt, Thedinghausen, Weyhe, Wilstedt et Worpswede), du centre-ville a l\'aeroport de Breme.',
            notification: 'Bienvenue a Breme !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Bremen',
        code: 'HB',
        description: t('description'),
        population: 841468,
        initialViewState: { zoom: 11, latitude: 53.08, longitude: 8.81, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-hb', label: 'Germany', cityCodes: ['HB'] });

    api.map.setTileURLOverride({
        cityCode: 'HB',
        tilesUrl: 'http://127.0.0.1:8080/HB/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/HB_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('HB', {
        buildingsIndex: '/data/HB/buildings_index.bin.gz',
        demandData: '/data/HB/demand_data.json.gz',
        roads: '/data/HB/roads.geojson.gz',
        runwaysTaxiways: '/data/HB/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/HB/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/HB/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'HB') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Bremen mod loaded successfully!');
})();
