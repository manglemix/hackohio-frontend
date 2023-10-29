<script lang=ts>
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
    import GoogleAdvancedMap from '$lib/GoogleAdvancedMap.svelte';
    export let data;

    let headerHeight = 0;
    let supercategory: string;

    if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        supercategory=urlParams.get("trashType") ?? "all";
    }
</script>

<header bind:clientHeight={headerHeight}>
    <h1>Want to find patterns in littering?</h1>
    <h2>We've got you covered!</h2>
</header>
<main>
    <div id="mapContainer" style="--top: {100 + headerHeight}px">
        <p>Change the type of trash that will be visible</p>
        <form>
            <label for="allTrash">All Trash</label>
            <input type="radio" name="trashType" id="allTrash" on:click={() => goto("/refreshData")} checked={supercategory==="all"}>
            <label for="plasticTrash">Plastic Trash</label>
            <input type="radio" name="trashType" id="plasticTrash" on:click={() => goto("/refreshData?trashType=plastic")} checked={supercategory==="plastic"}>
            <label for="paperTrash">Paper Trash</label>
            <input type="radio" name="trashType" id="paperTrash" on:click={() => goto("/refreshData?trashType=paper")} checked={supercategory==="paper"}>
            <label for="glassTrash">Glass Trash</label>
            <input type="radio" name="trashType" id="glassTrash" on:click={() => goto("/refreshData?trashType=glass")} checked={supercategory==="glass"}>
            <label for="organicTrash">Organic Trash</label>
            <input type="radio" name="trashType" id="organicTrash" on:click={() => goto("/refreshData?trashType=organic")} checked={supercategory==="organic"}>
            <label for="metalTrash">Metal Trash</label>
            <input type="radio" name="trashType" id="metalTrash" on:click={() => goto("/refreshData?trashType=metal")} checked={supercategory==="metal"}>
            <label for="nonRecycTrash">Non-Recyclable Trash</label>
            <input type="radio" name="trashType" id="nonRecycTrash" on:click={() => goto("/refreshData?trashType=non-recyclable")} checked={supercategory==="non-recyclable"}>
            <label for="miscTrash">Misc Trash</label>
            <input type="radio" name="trashType" id="miscTrash" on:click={() => goto("/refreshData?trashType=misc")} checked={supercategory==="misc"}>
        </form>
        <GoogleAdvancedMap lat={40.4188611} lng={-82.8485833} markers={data.markers} supercategory={supercategory} />
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
        height: 100%;
    }
    main {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    p {
        text-align: center;
    }
</style>