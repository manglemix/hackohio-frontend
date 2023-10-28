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
    let mapDiv: HTMLElement;

    if (browser) {
        const loader = new Loader({
            apiKey: "AIzaSyCHqqqAVFFgsbIc7OKE2FCw8Enrfq5IMnk",
            version: "weekly",
        });

        loader.importLibrary("marker").then(async ({ AdvancedMarkerElement }) => {
            const { Map, InfoWindow } = await loader.importLibrary("maps");
        
            const map = new Map(mapDiv, {
                center: { lat, lng },
                zoom: 7,
                mapId: '4504f8b37365c3d0',
            });
            const infoWindow = new InfoWindow();
            
            for (const markerData of markers) {
                const marker = new AdvancedMarkerElement({
                    map,
                    position: { lat: markerData.lat, lng: markerData.lng },
                });

                marker.addListener('click', ({ }) => {
                    infoWindow.close();
                    infoWindow.setContent(`<h1>${markerData.supercategory}: ${markerData.instances}</h1>`);
                    infoWindow.open(marker.map, marker);
                });
            }
        });
    }
  </script>

  <div bind:this={mapDiv} style="width: 100%; height: 100%;"/>