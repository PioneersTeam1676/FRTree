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

:root {
    --color1: #007acc;
    --color2: #3e3e42;
    --color3: #2d2d30;
    --color4: #252526;
    --color5: #1e1e1e;
}

    :global(html) {color: var(--color2)}
    :global(body) {margin:0px; background: var(--color3);}

    .main-container {
        display: flex;
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

    .item img {
        width: 150px; 
        height: 150px;
        margin-right: 10px; 
        border-radius: 50%; 
    }
    
    .item p {
        margin: 0; /* Remove default margin */
        font-size: 22px;
        font-weight: bold;
        color: white;
        text-align: center; /* Center the text horizontally */
        }
       
    .main-container {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 20px;
        /*height: 100vh;*/ /* Optional: make it full height */
    }
</style>
