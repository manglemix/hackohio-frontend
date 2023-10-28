<script lang=ts>
    import { GoogleMap, GoogleMapMarker } from '@beyonk/svelte-googlemaps';
    export let data;

    let headerHeight = 0;
</script>

<header bind:clientHeight={headerHeight}>
    <h1>Want to find patterns in littering?</h1>
    <h2>We've got you covered!</h2>
</header>
<main>
    <div id="mapContainer" style="--top: {100 + headerHeight}px">
        <GoogleMap apiKey="AIzaSyCHqqqAVFFgsbIc7OKE2FCw8Enrfq5IMnk" center = {{lat: 40.4188611, lng: -82.8485833}}>
            {#each data.markers as marker}
                {marker}
                <GoogleMapMarker lat={marker.lat} lng={marker.lng} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"/>
            {/each}
        </GoogleMap>
    </div>
</main>

<style>
    h1 {
        font-size: 3rem;
        font-weight: bolder;
        margin-top: 1rem;
    }
    h2 {
        font-size: 1.5rem;
        font-weight: normal;
        margin-top: 0.5rem;
    }
    #mapContainer {
        position: fixed;
        top: var(--top);
        width: min(50rem, 100% - 3rem);
        bottom: 10rem;
    }
    header {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    main {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>