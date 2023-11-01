<script lang=ts>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
    import GoogleAdvancedMap from '$lib/GoogleAdvancedMap.svelte';
    export let data;

    let headerHeight = 0;
    let supercategory: string;
    let lat: number | null = null;
    let lng: number | null = null;

    if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        supercategory = urlParams.get("trashType") ?? "all";
        let tmpLat = urlParams.get("lat");
        let tmpLng = urlParams.get("lng");

        if (tmpLat)
            lat = Number(tmpLat);
        if (tmpLng)
            lng = Number(tmpLng);
        
        if (lat === null || lng === null) {
            if (navigator?.geolocation) {
                navigator.permissions.query({ name: "geolocation" }).then((result) => {
                    if (result.state === "granted" || result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition((position) => {
                            lat = position.coords.latitude;
                            lng = position.coords.longitude;
                        });
                    } else {
                        // Ohio Coordinates
                        lat = 40.4188611;
                        lng = -82.8485833;
                    }
                    // Don't do anything if the permission was denied.
                });
            } else {
                // Ohio Coordinates
                lat = 40.4188611;
                lng = -82.8485833;
            }
        }
    }
</script>

<header bind:clientHeight={headerHeight}>
    <h1>Want to find patterns in littering?</h1>
    <h2>We've got you covered!</h2>
</header>
<h3 style="color: darkred; text-align: center;">
    The backend has been deactivated for cost saving reasons. If you would like a proper demo, please contact us!
</h3>
<!-- {#if lat && lng}
<main>
    <div id="mapContainer" style="--top: {100 + headerHeight}px">
        <form>
            <label for="allTrash">All Trash</label>
            <input type="radio" name="trashType" id="allTrash" on:click={() => goto(`/refreshData?lat=${lat}&lng=${lng}`)} checked={supercategory==="all"}>
            <label for="plasticTrash">Plastic Trash</label>
            <input type="radio" name="trashType" id="plasticTrash" on:click={() => goto(`/refreshData?trashType=plastic&lat=${lat}&lng=${lng}`)} checked={supercategory==="plastic"}>
            <label for="paperTrash">Paper Trash</label>
            <input type="radio" name="trashType" id="paperTrash" on:click={() => goto(`/refreshData?trashType=paper&lat=${lat}&lng=${lng}`)} checked={supercategory==="paper"}>
            <label for="glassTrash">Glass Trash</label>
            <input type="radio" name="trashType" id="glassTrash" on:click={() => goto(`/refreshData?trashType=glass&lat=${lat}&lng=${lng}`)} checked={supercategory==="glass"}>
            <label for="organicTrash">Organic Trash</label>
            <input type="radio" name="trashType" id="organicTrash" on:click={() => goto(`/refreshData?trashType=organic&lat=${lat}&lng=${lng}`)} checked={supercategory==="organic"}>
            <label for="metalTrash">Metal Trash</label>
            <input type="radio" name="trashType" id="metalTrash" on:click={() => goto(`/refreshData?trashType=metal&lat=${lat}&lng=${lng}`)} checked={supercategory==="metal"}>
            <label for="nonRecycTrash">Non-Recyclable Trash</label>
            <input type="radio" name="trashType" id="nonRecycTrash" on:click={() => goto(`/refreshData?trashType=non-recyclable&lat=${lat}&lng=${lng}`)} checked={supercategory==="non-recyclable"}>
            <label for="miscTrash">Misc Trash</label>
            <input type="radio" name="trashType" id="miscTrash" on:click={() => goto(`/refreshData?trashType=misc&lat=${lat}&lng=${lng}`)} checked={supercategory==="misc"}>
        </form>
        <GoogleAdvancedMap lat={lat} lng={lng} markers={data.markers} supercategory={supercategory} />
    </div>
</main>
{/if} -->

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
        bottom: 15rem;
    }
    #mapContainer form {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 0.4rem;
        margin-bottom: 0.6rem;
        gap: 0.3rem 0.2rem;
    }
    #mapContainer form input + label {
        margin-left: 1rem;
    }
    header {
        display: flex;
        flex-direction: column;
        /* height: 100%; */
    }
    main {
        display: flex;
        flex-direction: column;
        /* height: 100%; */
    }
    p {
        text-align: center;
    }
</style>