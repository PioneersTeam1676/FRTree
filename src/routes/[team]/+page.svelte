<script>
    export let data;
    import { onMount } from 'svelte';
    import { docTitle, isWhite } from '$lib/frontendutil';
    import "@fortawesome/fontawesome-free/css/all.min.css";

    let loaded = false;
    let team = null;

    docTitle("Team " + data.data.info[0].team_num);

    const primIsWhite = isWhite(data.data.info[0].primary_col);
    const secIsWhite = isWhite(data.data.info[0].secondary_col);

    onMount(async () => {
        // Ensure data is defined before accessing its properties
        if (data?.data?.info?.[0]) {
            document.documentElement.style.setProperty('--primary-col', data.data.info[0].primary_col);
            document.documentElement.style.setProperty('--secondary-col', data.data.info[0].secondary_col);
            loaded = true;
        }
    });

    
</script>

{#if loaded == false}
<h1>Loading...</h1>
{:else}
    <div class="main">
        <div class="pfp-div">
            <h1>Team {data.data.info[0].team_num}</h1>
            <h2>{data.data.info[0].team_full_name}</h2>
            <p><i class="fa-solid fa-location-dot"></i>&nbsp;{data.data.info[0].location}</p>
            <img class="pfp" src="{data.data.info[0].pfp}" alt="pfp not found" />
            <p class="description">{data.data.info[0].description}</p>
            {#if data.data.autofilled}
                <i class="description">Team Information autofilled</i>
            {/if}
        </div>

        <div class="all-links">
            {#each data.data.links as link}
                <!-- <a href="{link.url}" target="_blank"> -->
                    <button class="tree-buttons" onclick={() => { window.open(link.url, "_blank").focus(); }}>
                        <div class="tree-container">
                            <img class="button-logo" src="{link.icon}" alt="button logo">
                            <div class="link-content">
                                <p style="color: {primIsWhite ? "black" : "white"}" class="tree-header">{link.title}</p>
                                <p style="color: {primIsWhite ? "black" : "white"}" class="bg-info">{link.description}</p>
                            </div>
                        </div>
                    </button>
                <!-- </a> -->
            {/each}
        </div>
    </div>
{/if}

<style>
    /* :root {
        --color1: #007acc;
        --color2: #3e3e42;
        --color3: #2d2d30;
        --color4: #252526;
        --color5: #1e1e1e;
        --primary-col: #3E7B27;
        --secondary-col: #85A947;
    } */
    
    :global(html) {color: var(--color2);}
    :global(body) {margin:0px; background: var(--color3);}
    

    .main {
        display: grid;
        margin: 0px;
        width: 100%;
        min-height: 100%;
        /* background: var(--secondary-col); */
    }

    .description {
        font-family: 'Helvetica', 'Arial', sans-serif;
        color: white;
        width: 40%;
        margin: auto;
        text-align: center;
        padding: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .all-links {
        display: flex;
        flex-direction: column;
        margin: auto;
        gap: 20px;
        width: 50%;
    }

    .link-content {
        margin: auto;
    }

    .bg-info {
        margin-top: 1vh;
        color: white;
        font-family: 'Helvetica', 'Arial', sans-serif;
    }

    .pfp-div {
        margin-top: 10vh;
        text-align: center;
    }

    .pfp {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        object-fit: cover;
    }

    .tree-buttons {
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease; /* Smooth transition for scaling */
        background: none;
    }

    .tree-buttons:hover {
        transform: scale(1.01); /* Enlarge the button on hover */
    }
  
    .tree-buttons:active {
        transform: scale(0.99); /* Slightly shrink the button */
    }


    .tree-header {
        color: white;
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-weight: bold;
        font-size: 2em;
    }

    .button-logo {
        width: 200px;
        height: 200px;
        border-radius: 5px;
        padding: 15px;
        object-fit: contain;
    }

    .tree-container {
        display: flex;
        background: var(--primary-col);
        border-radius: 0.76em;
        /* border: 5px solid var(--secondary-col); */
        box-shadow: 0 0 10px 2px var(--secondary-col);
    }
  
</style>