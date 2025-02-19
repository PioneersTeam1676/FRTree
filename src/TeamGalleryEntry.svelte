<script>
    let { team_num, pfp, description } = $props();
    
    function goToTeam(team_num) {
        window.location.href = "../" + team_num;
    }
</script>

    <button type="button" class="item" onclick={() => goToTeam(team_num)} aria-label="Go to team {team_num}">
        <img src={pfp} alt="Team Logo" />
        <div class="text-grid">
            <p class="team-number">Team {team_num}</p>
            <p class="team-name">{description}</p>
        </div>
    </button>

<style>
    

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
        font-size: 25px;
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