<script lang=ts>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let form;
    let loading = false;
    let imgLoaded = false;
    let selectedTrash: number | null = null;

    // function blobToBase64Async(blob: Blob) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(blob); 
    //     reader.onload = e => {
    //         photoB64 = e.target?.result as string ?? "";                
    //         console.log(photoB64);
    //     }
    // }

    let taggedImg;
    const fadeParams = { duration: 300 };
</script>

{#if form}
    <header transition:fade={fadeParams}>
        <h1>Here is what we found</h1>
        <h2>Click on a box for instructions</h2>
    </header>
    <main transition:fade={fadeParams}>
        <div style="margin-top: 3rem;" />
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
            src={"data:image/jpg;base64," + form.photo}
            width=100%
            alt="The same photo that you sent but with the trash highlighted"
            bind:this={taggedImg}
            on:load={() => imgLoaded = true}
            on:resize={() => imgLoaded = true}
        >
        
        {#if taggedImg && imgLoaded}
            {#each form.items as item, i}
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    style="
                    width: {(item.bbox[2] - item.bbox[0]) * taggedImg.width}px;
                    height: {(item.bbox[3] - item.bbox[1]) * taggedImg.height}px;
                    background: red;
                    opacity: 0.3;
                    left: {item.bbox[0] * taggedImg.width + taggedImg.offsetLeft}px;
                    top: {item.bbox[1] * taggedImg.height + taggedImg.offsetTop}px;
                    position: absolute;
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
<div class="fixed">
    <header transition:fade={fadeParams}>
        <h1>Found some trash?</h1>
        <h2>Send us a photo and we'll handle the rest!</h2>
    </header>
    <main transition:fade={fadeParams}>
        <div style="margin-top: 4rem;" />
        <form method="POST" enctype="multipart/form-data" use:enhance={() => {
            loading = true;

            return async ({ update }) => {
                await update();
                loading = false;
            };
        }}>
            <label for="photo">Upload photo of trash</label>
            <input id="photo" name="photo" type="file" accept=".jpg" required />
            <button type="submit">Upload</button>
        </form>
    </main>
</div>
{/if}

<style>
    .fixed {
        position: fixed;
        top: 4rem;
        /* left: 0%; */
        width: min(50rem, 100% - 3rem);
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
        background-color: lightgray;
        padding: 0.5rem;
        border-radius: 0.8rem;
        border: 1px solid gray;
    }
</style>