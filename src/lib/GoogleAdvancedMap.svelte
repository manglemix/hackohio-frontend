<script lang=ts>
	import { browser } from "$app/environment";
    import { Loader } from "@googlemaps/js-api-loader"
    export let lat: number;
    export let lng: number;
    export let markers: {
        lat: number;
        lng: number;
        instances: number;
        supercategory: string;
    }[];
    export let supercategory: string;
    let mapDiv: HTMLElement;

    if (browser) {
        const loader = new Loader({
            apiKey: "AIzaSyCHqqqAVFFgsbIc7OKE2FCw8Enrfq5IMnk",
            version: "weekly",
        });

        loader.importLibrary("visualization").then(async ({ HeatmapLayer }) => {
            const { Map } = await loader.importLibrary("maps");
        
            const map = new Map(mapDiv, {
                center: { lat, lng },
                zoom: 7,
                mapId: '4504f8b37365c3d0',
            });
            var heatMapData = [];
            
            for (const markerData of markers) {
                if (markerData.supercategory !== supercategory && supercategory !== "all")
                    continue;
                heatMapData.push({
                    location: new google.maps.LatLng(markerData.lat, markerData.lng),
                    weight: markerData.instances
                });
            }
            var heatmap = new HeatmapLayer({
                data: heatMapData,
                radius: 120
            });
            heatmap.setMap(map);

        });
    }
  </script>

  <div bind:this={mapDiv} style="width: 100%; height: 100%;"/>