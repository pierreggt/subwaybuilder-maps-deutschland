# Subway Builder Maps — Germany (pierreggt collection)

A shared repository of community-created [Subway Builder](https://store.steampowered.com/app/2716540/Subway_Builder/) maps for Germany, built with [depot](https://github.com/Subway-Builder-Modded/depot).

Each map lives in its own top-level folder (full mod source, `.pmtiles` tracked via [Git LFS](https://git-lfs.com/)) and is also published as a versioned [GitHub Release](../../releases), one release per map (tag format `<code>-vX.Y.Z`), with the release asset being the flat data zip.

## Registry updates

This repo hosts **multiple maps as separate releases**. The [Subway-Builder-Modded registry](https://github.com/Subway-Builder-Modded/registry)'s "GitHub Releases" update type only supports repositories that publish a single mod or map — it always resolves to whatever release is currently tagged "latest" repo-wide, which would silently serve the wrong map's zip here.

Each map is therefore registered with the registry as **`Update Type: Custom URL`**, pointing at a dedicated manifest in [`updates/`](updates/):

```
https://raw.githubusercontent.com/pierreggt/subwaybuilder-maps-deutschland/main/updates/<code>-update.json
```

Each `<code>-update.json` follows the registry's `schema_version: 1` update manifest format (`versions[]` with `version`, `game_version`, `date`, `download`, `sha256`) and points at that specific map's own GitHub Release asset — so pulling in a new release for one map never affects any other map's update pointer.

## Maps

| City | Code | Update manifest |
|---|---|---|
| Aachen | AAC | [updates/aac-update.json](updates/aac-update.json) |
| Augsburg | AUG | [updates/aug-update.json](updates/aug-update.json) |
| Bielefeld | BIE | [updates/bie-update.json](updates/bie-update.json) |
| Bremen | HB | [updates/hb-update.json](updates/hb-update.json) |
| Chemnitz | CHZ | [updates/chz-update.json](updates/chz-update.json) |
| Dresden | DRE | [updates/dre-update.json](updates/dre-update.json) |
| Erfurt | ERF | [updates/erf-update.json](updates/erf-update.json) |
| Freiburg | FRB | [updates/frb-update.json](updates/frb-update.json) |
| Hamburg | HAM | [updates/ham-update.json](updates/ham-update.json) |
| Kiel | KIE | [updates/kie-update.json](updates/kie-update.json) |
| Lübeck | LUB | [updates/lub-update.json](updates/lub-update.json) |
| Magdeburg | MAG | [updates/mag-update.json](updates/mag-update.json) |
| Mönchengladbach | MGL | [updates/mgl-update.json](updates/mgl-update.json) |
| Munich | MUC | [updates/muc-update.json](updates/muc-update.json) |
| Nuremberg | NUE | [updates/nue-update.json](updates/nue-update.json) |
| Ruhrgebiet & Düsseldorf & Münster (Dortmund, Essen, Bochum, Duisburg, Wuppertal, Düsseldorf, Münster) | RHR | [updates/rhr-update.json](updates/rhr-update.json) |
| Stuttgart | STU | [updates/stu-update.json](updates/stu-update.json) |

Note: Bonn, Cologne, Halle, Leipzig, Hannover, Braunschweig, Wiesbaden-Mainz, Frankfurt and Rhein-Neckar-Karlsruhe are not listed above — they are being merged into regional fusion maps and will be added once those are built, tested, and finalized.
