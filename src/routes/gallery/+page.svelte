<script>
    import { docTitle } from "$lib/frontendutil";


    import TeamGalleryEntry from "../../TeamGalleryEntry.svelte";

    const { data } = $props();
    const gallery = data.data.info;

    docTitle("Gallery");

    console.log(data);
    console.log(gallery);

    function goToTeam(team_num) {
        window.location.href = "../" + team_num;
    }
</script>

<div class="main-container">
    <div class="container">
        {#each gallery as team}
            <TeamGalleryEntry {...team} />
        {/each}
    </div>
    <div>-- If you can't find the team you are looking for here, ask them to make an official profile! --</div>
</div>

<style>
    /* :root {
        --color1: #007acc;
        --color2: #3e3e42;
        --color3: #2d2d30;
        --color4: #252526;
    } */

    :global(html) {color: var(--color2)}
    :global(body) {margin:0px; background: var(--color3);}

    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 20px;
        /*height: 100vh;*/ /* Optional: make it full height */
        }

    .container {
        display: flex;
        justify-content: center; /* Center items horizontally */
        flex-wrap: wrap;
        width: 100%;
    }

    .main-container {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 20px;
        /*height: 100vh;*/ /* Optional: make it full height */
    }
</style>
