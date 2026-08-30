(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Bielefeld Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Bielefeld, Germany and its surrounding Ostwestfalen-Lippe towns: Gütersloh, Herford, Detmold, Bad Salzuflen, Halle (Westf.), Enger, Harsewinkel, Herzebrock-Clarholz, Hiddenhausen, Hövelhof, Lage, Leopoldshöhe, Löhne, Oerlinghausen, Rheda-Wiedenbrück, Rietberg, Schlangen, Schloß Holte-Stukenbrock, Spenge, Steinhagen, Verl, Versmold, Vlotho, Werther (Westf.), Augustdorf and Borgholzhausen, covering the moBiel network.',
            notification: 'Welcome to Bielefeld!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Bielefeld, Allemagne, et des communes voisines d\'Ostwestfalen-Lippe (Gütersloh, Herford, Detmold, Bad Salzuflen, Halle (Westf.), Enger, Harsewinkel, Herzebrock-Clarholz, Hiddenhausen, Hövelhof, Lage, Leopoldshöhe, Löhne, Oerlinghausen, Rheda-Wiedenbrück, Rietberg, Schlangen, Schloß Holte-Stukenbrock, Spenge, Steinhagen, Verl, Versmold, Vlotho, Werther (Westf.), Augustdorf et Borgholzhausen), sur le reseau moBiel.',
            notification: 'Bienvenue a Bielefeld !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Bielefeld',
        code: 'BIE',
        description: t('description'),
        population: 798564,
        initialViewState: { zoom: 11, latitude: 52.02, longitude: 8.53, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-bie', label: 'Germany', cityCodes: ['BIE'] });

    api.map.setTileURLOverride({
        cityCode: 'BIE',
        tilesUrl: 'http://127.0.0.1:8080/BIE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/BIE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('BIE', {
        buildingsIndex: '/data/BIE/buildings_index.bin.gz',
        demandData: '/data/BIE/demand_data.json.gz',
        roads: '/data/BIE/roads.geojson.gz',
        runwaysTaxiways: '/data/BIE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/BIE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/BIE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'BIE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Bielefeld mod loaded successfully!');
})();
