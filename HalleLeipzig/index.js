(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Halle-Leipzig Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Fused map of Halle (Saale) and Leipzig, Germany, sharing Leipzig/Halle Airport, from the MLU and Leipzig University campuses to the surrounding Saalekreis and Landkreis Leipzig/Nordsachsen towns, covering the joined tram and S-Bahn Mitteldeutschland networks.',
            notification: 'Welcome to Halle-Leipzig!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte fusionnee de Halle (Saale) et Leipzig, Allemagne, partageant l aeroport de Leipzig/Halle, des campus de la MLU et de l universite de Leipzig aux villes voisines du Saalekreis et du Landkreis Leipzig/Nordsachsen, sur les reseaux de tramway et de S-Bahn Mitteldeutschland reunis.',
            notification: 'Bienvenue a Halle-Leipzig !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Halle-Leipzig',
        code: 'HLE',
        description: t('description'),
        population: 1432854,
        initialViewState: { zoom: 10, latitude: 51.4, longitude: 12.15, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-hle', label: 'Germany', cityCodes: ['HLE'] });

    api.map.setTileURLOverride({
        cityCode: 'HLE',
        tilesUrl: 'http://127.0.0.1:8089/HLE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8089/HLE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('HLE', {
        buildingsIndex: '/data/HLE/buildings_index.bin.gz',
        demandData: '/data/HLE/demand_data.json.gz',
        roads: '/data/HLE/roads.geojson.gz',
        runwaysTaxiways: '/data/HLE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/HLE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/HLE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'HLE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Halle-Leipzig mod loaded successfully!');
})();
