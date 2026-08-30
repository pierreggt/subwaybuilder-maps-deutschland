(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Dresden Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Dresden, Germany and its surrounding towns: Radebeul, Coswig, Weinboehla, Freital, Bannewitz and Heidenau, from Dresden Airport (DRS) in the north to the Elbe valley towns south of the city, covering the DVB tram/bus network and S-Bahn lines.',
            notification: 'Welcome to Dresden!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Dresde, Allemagne et de ses villes voisines Radebeul, Coswig, Weinboehla, Freital, Bannewitz et Heidenau, de l aeroport de Dresde (DRS) au nord jusqu aux villes de la vallee de l Elbe au sud, couvrant le reseau tram/bus DVB et les lignes S-Bahn.',
            notification: 'Bienvenue a Dresde !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Dresden',
        code: 'DRE',
        description: t('description'),
        population: 939135,
        initialViewState: { zoom: 10, latitude: 51.065, longitude: 13.705, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-dre', label: 'Germany', cityCodes: ['DRE'] });

    api.map.setTileURLOverride({
        cityCode: 'DRE',
        tilesUrl: 'http://127.0.0.1:8080/DRE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/DRE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('DRE', {
        buildingsIndex: '/data/DRE/buildings_index.bin.gz',
        demandData: '/data/DRE/demand_data.json.gz',
        roads: '/data/DRE/roads.geojson.gz',
        runwaysTaxiways: '/data/DRE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/DRE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/DRE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'DRE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Dresden mod loaded successfully!');
})();
