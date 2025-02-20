<script>

    export let data;

    console.log(data);


</script>

<div class="main-container">
    <div class="container">
    <!-- loop through all data.info items  -->
    {#each data.data.info as team}

        <div class="item"> <!-- Change this to an anchor tag once it is ready to be used -->
            <img src="{team.pfp}" alt="Team Logo">
            <div class="text-grid">
                <p class="team-number">Team {team.team_num}</p>
                <p class="team-name">{team.description}</p>
            </div>    
        </div>

    {/each}

    </div>
</div>



<style>

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
        max-width: 100vw; /* Adjust as needed */
    }

    .item {
        display: flex;
        align-items: center; /* Center vertically */
        width: calc(25% - 50px); /* 4 items per row with some margin */
        margin: 30px; /* Space between items */
        background: var(--color2);
        border-radius: 5px;
        box-shadow: 0 0 5px 0px black;
        padding: 10px;
        cursor: pointer;
        transition: transform 0.2s ease; /* Smooth transition for scaling */
    }
    .item:hover {
        transform: scale(1.01); /* Enlarge the button on hover */
    }

    .item:active {
        transform: scale(0.99); /* Slightly shrink the button */
    }


    .item img {
        width: 150px; /* Adjust image size as needed */
        height: 150px; /* Adjust image size as needed */
        margin-right: 10px; /* Space between image and text */
        border-radius: 50%; /* Make it a circle */
    }
    
    .item p {
        margin: 0; /* Remove default margin */
        font-size: 22px;
        font-weight: bold;
        color: white;
        text-align: center; /* Center the text horizontally */
        }
        
    .text-grid {
        flex-direction: column;
        display: flex;
        width: 100%;
    }

</style>