<script>
    import Tree from "../Tree.svelte";
</script>

<title>FRTree</title>

<!-- https://crispy-engine-rw7jpq56gpphx9w-5173.app.github.dev/ -->
<div class="main-content">
    <div class="half">
        <div style="position: relative;">
            <div style="z-index: 1;">
              <Tree teamId={1676} />
            </div>
            <div style="position: absolute; top: 0; left: 0; z-index: -1; transform: translate(75px, 20px); filter: blur(1px)">
              <Tree teamId={1676} />
            </div>
            <div style="position: absolute; top: 0; left: 0; z-index: -2; transform: translate(150px, 40px); filter: blur(2px)">
              <Tree teamId={1676} />
            </div>
          </div>
    </div>
    <div class="half">
        <h1>A social media collection app for FRC Teams</h1>
        <p>Make a customized link profile to share all of your social medias, links, or cool projects!</p>
        <button>Make a Profile</button>
        <button>View Profiles</button>
    </div>
</div>

<style>
    .main-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
    }

    .half {
        text-align: center;
        align-content: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0;
        height: 100%;
    }
</style>
