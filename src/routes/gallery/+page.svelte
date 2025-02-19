<script>

    import TeamGalleryEntry from "../../TeamGalleryEntry.svelte";

    export let data;

    console.log(data);

    function goToTeam(team_num) {
        window.location.href = "../" + team_num;
    }
</script>

<div class="main-container">
    
    {#each data.data.info as team}
        <TeamGalleryEntry {...team} />
    {/each}

    <!-- <div class="container">
        <!-- loop through all data.info items  -->
        <!-- {#each data.data.info as team} -->
            <!-- <a href="../{team.team_num}"> -->
                <!-- <button type="button" class="item" on:click={goToTeam(team.team_num)} aria-label="Go to team {team.team_num}">
                    <img src={team.pfp} alt="Team Logo" />
                    <div class="text-grid">
                        <p class="team-number">Team {team.team_num}</p>
                        <p class="team-name">{team.description}</p>
                    </div>
                </button> -->
            <!-- </a> -->
        <!-- {/each} -->
    <!-- </div> --> -->
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

    .main-container {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 20px;
        /*height: 100vh;*/ /* Optional: make it full height */
    }
</style>
