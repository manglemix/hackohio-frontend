<script>
	import landscape from '$lib/assets/landscape.webp';
</script>

<header>
    <h1>Trash is not the future</h1>
    <h2>By collecting data from thousands of volunteers about litter in their area, <em>we</em> could change our future</h2>
</header>
<img src={landscape} alt="Landscape of a river in a forest">
<p style="text-align: right; font-size: 0.8rem; margin-top: 0.3rem; font-style: italic; color: #555555">Photo by Najman Husaini</p>
<main>
    <div style="margin-top: 3rem;" />
    <h3>What do I do?</h3>
    <p>
        Any time you see trash, report it through this website on this <a href="/report" title="This is the page where you report littering">page</a>.
        An AI model will identify pieces of trash in the image and provide you information on what you can do. Don't have the time to clean up trash?
        Don't worry! This information will be added to a database that is publicly available. Cleanup crews of all sizes can use this data to better
        plan their cleanup days to be more efficient <em>and</em> effective!
    </p>
</main>

<style>
    h1 {
        font-size: 4rem;
        font-weight: bolder;
        margin-top: 1rem;
    }
    h2 {
        font-size: 1.5rem;
        font-weight: normal;
        margin-top: 1rem;
    }
    h3 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 0.6rem;
    }
    img {
        width: 100vw;
        height: 20rem;
        align-self: center;
        object-fit: cover;
        left: 0px;
        z-index: -1;
        object-position: 0% 60%;
        margin-top: 2rem;
    }
</style>