(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Magdeburg Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of Magdeburg, Germany, from the OVGU campus to the surrounding towns of Schoenebeck, Burg, Haldensleben, Wolmirstedt, Barleben, Biederitz and Niedere Boerde, covering the tram and S-Bahn Mittelelbe network.',
            notification: 'Welcome to Magdeburg!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\n\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de Magdebourg, Allemagne, du campus de l OVGU aux villes voisines de Schoenebeck, Burg, Haldensleben, Wolmirstedt, Barleben, Biederitz et Niedere Boerde, sur le reseau de tramway et le S-Bahn Mittelelbe.',
            notification: 'Bienvenue a Magdebourg !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\n\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Magdeburg',
        code: 'MAG',
        description: t('description'),
        population: 631791,
        initialViewState: { zoom: 10, latitude: 52.1205, longitude: 11.6276, bearing: 0 }
    });

    api.cities.registerTab({ id: 'germany-mag', label: 'Germany', cityCodes: ['MAG'] });

    api.map.setTileURLOverride({
        cityCode: 'MAG',
        tilesUrl: 'http://127.0.0.1:8083/MAG/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8083/MAG_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MAG', {
        buildingsIndex: '/data/MAG/buildings_index.bin.gz',
        demandData: '/data/MAG/demand_data.json.gz',
        roads: '/data/MAG/roads.geojson.gz',
        runwaysTaxiways: '/data/MAG/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MAG/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MAG/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MAG') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Magdeburg mod loaded successfully!');
})();
