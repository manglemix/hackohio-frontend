<script lang=ts>
	import logo from '$lib/assets/logo.png';
</script>
<header>
    <h1>About</h1>
</header>
<main>
    <div style="margin-top: 2rem;" />
    <div class="images">
        <img src="https://hack.osu.edu/2023/images/Hack11_logo.svg" id="hackohio" alt="Hack OHI/O 11">
        <img src={logo} id="logo" alt="Recycling Bin">
    </div>
    <div style="margin-top: 2rem;" />
    <p>
        &emsp;&emsp;We are a team of three participating in the <strong>Hack OHI/O 11 Hackathon</strong>.
        Our main goal is to improve the sustainability of our society one step at a time.
        The specific way we decided to contribute was by tackling the ever present issue of
        <em>littering</em>.
        <br><br>
        &emsp;&emsp;Everyone is be able to see the amount of litter invading their neighborhood.
        The real problem is that its not as easy to take action against it. Litter is persistent,
        and without district or federal level changes, it will remain. Bringing about this kind
        of change does not come easy, and always requires reliable evidence to make a case. This
        is where we come in!
        <br><br>
        <strong>&emsp;&emsp;ReTrash</strong> allows us to collect data from thousands of people regarding the
        locations at which littering occurred. Using AI models, we can even discern what kind of
        trash was littered, and how much! This allows us to generate a heatmap (visible
        <a href="/data" title="Data visualization page">here</a>), which anyone can refer to better
        plan how to organize cleanup operations.
        <br><br>
        &emsp;&emsp;But that's not all! You, the humble user, can still make a difference! Most people
        don't realize how involved recycling is and how many rules have to be taken into consideration.
        When you report littering, you will be given detailed information on how you can dispose of each
        piece of trash while complying with local recycling laws!
        <br><br>
        Feel free to contact us if you have any questions or remarks!<br>
        <a href="mailto:junkit@umich.edu">junkit@umich.edu</a><br>
        <a href="mailto:najman.husaini@utah.edu">najman.husaini@utah.edu</a><br>
        <a href="mailto:ranjans@umich.edu">ranjans@umich.edu</a>
    </p>
</main>

<style>
    h1 {
        font-size: 3rem;
        font-weight: bolder;
        margin-top: 1rem;
    }
    #hackohio {
        width: 60%;
        background-color: #222222;
        color: red;
        padding: 1rem;
        align-self: center;
    }
    #logo {
        width: 20%;
        margin-left: 2rem;
    }
    main {
        display: flex;
        flex-direction: column;
    }
    main p {
        line-height: 1.5rem;
    }
    main p a {
        text-decoration: none;
        font-style: italic;
    }
    .images {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>