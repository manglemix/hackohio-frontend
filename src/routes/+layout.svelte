<script>
	import logo from '$lib/assets/logo.png';
</script>

<nav>
    <div class="nav-content">
        <div class="left-navbar">
            <a href="/">
                <img src={logo} height=30px alt="Recycling Bin"/>
                <strong>ReTrash</strong>
            </a>
        </div>
        <div class="right-navbar">
            <a href="/report">Report</a>
            <a href="/data">Data</a>
            <a href="/about">About</a>
        </div>
    </div>
</nav>
<br>
<br>
<br>
<div class="page">
    <slot></slot>
</div>

<footer>
    <div>
        <p>This website was made for the HackOHI/O 11 hackathon. If you think that this is a great idea, <a href="/about">please let us know!</a></p>
    </div>
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans&display=swap');

    :global(*) {
        font-family: 'IBM Plex Sans', sans-serif;
        line-height: 1.25;
        margin: 0px;
        padding: 0px;
    }

    :global(body) {
        display: flex;
        flex-direction: column;
    }

    .page {
        width: min(50rem, 100% - 3rem);
        align-self: center;
        min-height: calc(100vh - 12rem);
        display: flex;
        flex-direction: column;
    }

    footer {
        border-top: 1px solid gray;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        padding-bottom: 2rem;
        padding-top: 1rem;
    }

    footer div * {
        color: gray;
        font-style: italic;
        font-size: 0.8rem;
    }

    footer div {
        width: min(50rem, 100% - 3rem);
        align-self: center;
    }

    nav {
        min-width: 392px;
        font-size: 1.25rem;
        background-color: #ddd;
        box-shadow: 0px 0px 5px gray;
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        z-index: 100;
    }

    nav .nav-content {
        width: min(50rem, 100% - 3rem);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-self: center;
        padding: 0.7rem;
        align-items: center;
    }

    nav .nav-content .left-navbar strong {
        font-size: 1.7rem;
    }

    nav .nav-content .right-navbar a + a {
        margin-left: 20px;
    }

    nav a {
        color: #444;
        text-decoration: none;
    }

    nav a:hover {
        color: #333333;
    }
    :global(h1) {
        align-self: center;
        text-align: center;
    }
    :global(h2) {
        align-self: center;
        text-align: center;
    }
    :global(form) {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }
    :global(form label) {
        font-weight: bold;
        font-size: 1.1rem;
    }
    :global(form button) {
        width: 100px;
        font-size: 1rem;
    }
</style>