<script>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";

    if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const trashType = urlParams.get("trashType");
        const lat = urlParams.get("lat");
        const lng = urlParams.get("lng");

        if (trashType && lat && lng) {
            goto(`/data?trashType=${trashType}&lat=${lat}&lng=${lng}`);
        } else {
            goto("/data");
        }
    }
</script>

<div class="loader" />

<style>
    .loader {
        margin: auto;
        margin-top: 5rem;
        border: 20px solid #EAF0F6;
        border-radius: 50%;
        border-top: 20px solid #93a1cd;
        width: 200px;
        height: 200px;
        animation: spinner 0.5s cubic-bezier(.74,.48,.32,.62) infinite;
    }
    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>