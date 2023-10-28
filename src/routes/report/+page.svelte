<script>
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	/** @type {import('./$types').ActionData} */
	export let form;
    let loading = false;
    let loaded = false;

    const fadeParams = { duration: 300 };
</script>

{#if loading}
<div class="fixed">
    <main transition:fade={fadeParams}>
        <div class="loader" />
    </main>
</div>
{:else if loaded}
<div class="fixed">
    <main transition:fade={fadeParams}>
        {form}
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
                loaded = true
            };
        }}>
            <label for="photo">Upload photo of trash</label>
            <input id="photo" name="photo" type="file" accept=".png,.jpg" required />
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
</style>