<script lang=ts>
    import { browser } from "$app/environment";
    import { Loader } from "@googlemaps/js-api-loader"
    if (browser) {
        const loader = new Loader({
            apiKey: "YOUR_API_KEY",
            version: "weekly",
        });

        loader.importLibrary("core").then(async () => {
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        map = new Map(document.getElementById("map") as HTMLElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        });
    }
    
</script>

<header>
    <h1>Want to find patterns in littering?</h1>
    <h2>We've got you covered!</h2>
</header>
<main>
    <div style="margin-top: 4rem;" />
    <h3>There will be a heatmap here</h3>
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
</style>