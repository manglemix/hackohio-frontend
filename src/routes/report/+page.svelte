<script lang=ts>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { bytesToBase64 } from '$lib/base64.js';
	import { browser } from '$app/environment';

	export let form;
    let loading = false;
    let imgLoaded = false;
    let selectedTrash: number | null = null;

    async function fileToImage(file: File) {
        var stream = file.stream();
        var reader = stream.getReader();
		let photoBytes: Uint8Array = new Uint8Array();

        while(true) {
			const result = await reader.read();
			if (result.value === undefined)
				break;
			let tmp = new Uint8Array(result.value.length + photoBytes.length);
			tmp.set(photoBytes);
			tmp.set(result.value, photoBytes.length);
			photoBytes = tmp;
			if (result.done)
				break;
		}

        return "data:image/jpg;base64," + bytesToBase64(photoBytes);
    }

    let files: FileList;
    let taggedImgContentRect: DOMRectReadOnly;
    const fadeParams = { duration: 300 };
    let headerHeight: number;
    let geolocation: string;
    if (browser && navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            geolocation = position.coords.latitude + ", " + position.coords.longitude;
        });
    }
</script>

{#if form}
    <header transition:fade={fadeParams} bind:offsetHeight={headerHeight}>
        <h1>Here is what we found</h1>
        <h2>Click on a box for instructions</h2>
        <div style="margin-top: 3rem;" />
    </header>
    <main transition:fade={fadeParams} >
        <noscript>
            <p>You seem to have Javascript disabled. You will not be able to see instructions without it.</p>
        </noscript>
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
            src={"data:image/jpg;base64," + form.photo}
            width=100%
            alt="The same photo that you sent but with the trash highlighted"
            bind:contentRect={taggedImgContentRect}
            on:load={() => imgLoaded = true}
            on:resize={() => imgLoaded = true}
        >

        {#if taggedImgContentRect && imgLoaded}
            {#each form.items as item, i}
                <input
                    type="radio"
                    name="boundingBox"
                    class="boundingBox"
                    style="
                    --width: {(item.bbox[2] - item.bbox[0]) * taggedImgContentRect.width}px;
                    --height: {(item.bbox[3] - item.bbox[1]) * taggedImgContentRect.height}px;
                    --left: {item.bbox[0] * taggedImgContentRect.width}px;
                    --top: {item.bbox[1] * taggedImgContentRect.height + headerHeight}px;
                    "
                    on:click={() => selectedTrash = i}
                    on:keydown={() => selectedTrash = i}
                />
            {/each}
        {/if}
        
        {#if selectedTrash != null}
            <div style="margin-top: 1.5rem;" />
            <div class="instructions">
                <h3 transition:fade={fadeParams}>{form.items[selectedTrash].name}</h3>
                <p transition:fade={fadeParams}>{form.items[selectedTrash].instructions}</p>
            </div>
        {/if}
    </main>
{:else if loading}
<div class="fixed">
    <main transition:fade={fadeParams}>
        <div class="loader" />
    </main>
</div>
{:else}
    <header transition:fade={fadeParams}>
        <h1>Found some trash?</h1>
        <h2>Send us a photo and we'll handle the rest!</h2>
    </header>
    <main transition:fade={fadeParams}>
        <div style="margin-top: 4rem;" />
        <form method="POST" enctype="multipart/form-data" use:enhance={() => {
            loading = true;
            selectedTrash = null;
            geolocation = "lmao";

            return async ({ update }) => {
                await update();
		        await new Promise((fulfil) => setTimeout(fulfil, 300));
                loading = false;
            };
        }}>
            <label for="photo">Upload photo of trash</label>
            {#if files && files.length > 0}
                {#await fileToImage(files[0]) then uri}
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img src={uri} alt="The image you just uploaded">
                {/await}
            {/if}
            <input id="photo" name="photo" type="file" accept=".jpg" required bind:files />
            <input type="hidden" name="geolocation" bind:value={geolocation}>
            <label for="laws">Optionally provide a link to your local recycling laws</label>
            <input type="url" id="laws" name="laws">
            <button type="submit">Upload</button>
        </form>
    </main>
{/if}

<style>
    .fixed {
        position: absolute;
        top: 4rem;
        width: min(50rem, 100vw - 3rem);
    }
    form {
        background-color: lightgray;
        border-radius: 1rem;
        padding: 1rem;
        border: 3px dashed #444444;
    }
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
    .loader {
        margin: auto;
        margin-top: 5rem;
        border: 20px solid #EAF0F6;
        border-radius: 50%;
        border-top: 20px solid #93a1cd;
        width: 200px;
        height: 200px;
        animation: spinner 1s cubic-bezier(.74,.48,.32,.62) infinite;
    }
    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .instructions {
        position: sticky;
        bottom: 0.8rem;
        background-color: #888888cc;
        padding: 0.5rem;
        border-radius: 0.8rem;
        border: 1px solid gray;
    }
    .instructions p {
        color: black;
        text-shadow: 2px 2px 4px #444444;
        font-size: 1.75rem;
        font-weight: 300;
    }
    .instructions h3 {
        color: black;
        text-shadow: 2px 2px 4px #444444;
        font-size: 2rem;
        font-weight: 1000;
    }
    .boundingBox {
        width: var(--width);
        height: var(--height);
        background-color: red;
        opacity: 0.3;
        left: calc(var(--left) + (100vw - min(51rem, 100vw - 3rem)) / 2);
        top: calc(var(--top) + 3.75rem);
        position: absolute;
        -webkit-appearance: none;
        appearance: none;
    }
    .boundingBox:checked {
        background-color: orange;
        -webkit-appearance: none;
        appearance: none;
    }
</style>