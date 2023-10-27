<header>
    <h1>Found some trash?</h1>
    <h2>Send us a photo and we'll handle the rest!</h2>
</header>
<main>
    <div style="margin-top: 4rem;" />
    <form action="http://127.0.0.1:8000/upload-image" method="POST">
        <label for="photo">Upload photo of trash</label>
        <input id="photo" name="photo" type="file" accept=".png,.jpg"/>
        <button type="submit">Upload</button>
    </form>
</main>

<style>
    form {
        background-color: lightgray;
        border-radius: 1rem;
        padding: 1rem;
        border: 2px dashed gray;
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
</style>