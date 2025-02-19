<script>

    import TeamGalleryEntry from "../../TeamGalleryEntry.svelte";

    export let data;

    console.log(data);

    function goToTeam(team_num) {
        window.location.href = "../" + team_num;
    }
</script>

<div class="main-container">
    <div class="container">
        {#each data.data.info as team}
            <TeamGalleryEntry {...team} />
        {/each}
    </div>
</div>

<style>
    :root {
        --color1: #007acc;
        --color2: #3e3e42;
        --color3: #2d2d30;
        --color4: #252526;
    }

    /* :global(html) {
        color: var(--color2);
    }
    :global(body) {
        margin: 0px;
        background: var(--color3);
    } */

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
