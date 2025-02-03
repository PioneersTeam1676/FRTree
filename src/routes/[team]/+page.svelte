<script>
    export let data;
    console.log(data);

    // console.log(data.data[0].url);
</script>


<div class="main">
    <div class="pfp-div">
        <img class="pfp" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnewshour-classroom-tc.digi-producers.pbs.org%2Fuploads%2Fimages%2FJimmyCarter-1024x683.width-1024.jpg&f=1&nofb=1&ipt=95f057b39b5ca5108705e17d9555f4138ac49906bbfe645835f0e750ba873a1f&ipo=images" alt="pfp">
        <p class="description"> hi i am jimmy carter, a former US president</p>
    </div>

    <div class="all-links">

        {#each data.data as url}
            <div class="button-divs">
                <a href="{url.url}" target="_blank">
                    <button class="tree-buttons" id="redirectWebsite">
    
                        <div class="container">
                            <div class="grid1">
                                <img class="button-logo" src="{url.icon}" alt="button logo">
                            </div>
                            <div class="grid2">
                                <p class="tree-header">{url.url}</p>
                                <p class="bg-info">{url.description}</p>
                            </div>
                        </div>
                    </button>
                </a>
            </div>
        {/each}
        

    </div>
</div>




<style>
    
    :global(html) {color: #3E7B27}
    :global(body) {margin:0px; background:#85A947;}
    
.main {
    display: grid;
}

.description {
    font-family: 'Helvetica', 'Arial', sans-serif;
    color: white;

}

.all-links {
    align-self: center;
    justify-self: center;
}

.button-divs {
    width: 50vw;
    height: 100%;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px; 
}

@media (max-width: 800px) {
  .button-divs {
    width: 80vw;
  }
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
}

.tree-buttons {
    background: #3E7B27;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease; /* Smooth transition for scaling */
    box-shadow: 0 0 5px 0px black;


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
}

.button-logo {
    width: 80px;
    height: 80px;
    border-radius: 5px;
}

.container {
    display: grid;
    grid-template-columns: .2fr 1fr; 
}

.grid1 {
    margin-top: 10px;
    margin-bottom: 6px;
}
</style>