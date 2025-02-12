<script>
  import Tree from "../Tree.svelte";
</script>

<!-- https://crispy-engine-rw7jpq56gpphx9w-5173.app.github.dev/ -->
<div class="main-content">
  <div class="half">
    <p>thing goes here</p>
  </div>
  <div class="half">
    <h1 style="font-size:5em">FRTree</h1>
    <p>An efficient and thoughtful social media collection app for FRC Teams</p>
    <div class="row">
      <p class="info">
        Make a customized link profile to share all of your social medias, links,
        or cool projects,
      </p>
      <p class="info">
        Or find the contact information for any of the thousands of FRC teams
      </p>
    </div>
    <div class="row">
      <button class="btn btn-cta">Make a Profile</button>
      <button class="btn btn-cta">View Profiles</button>
    </div>
  </div>
</div>

<style>

  .btn-cta {
    width: 100%;
    font-size: 1.5em;
  }

  .btn {
    padding: 10px 15px; /* Button padding */
    background-color: var(--color-0); /* Button background color */
    border: none; /* Remove default border */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }

  .btn:hover {
    background-color: var(--color-1); /* Change background color on hover */
  }

  .btn:active {
    background-color: var(--color-2); /* Change background color on click */
  }

  .main-content {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    /* border: 2px solid blue; */
    justify-content: space-between;
    display: flex;
  }

  h1, h2 {
    margin: 2px;
  }

  .half {
    width: 100%;
    /* border: 2px solid tomato; */
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .info {
    font-size: 1.5em;
    width: 50%;
    text-align: center;

  }

  .row {
    display: flex;
    justify-content: space-between;
    gap: 10%;
    padding: 5px;
    width: 100%;
    /* border: 2px solid lime; */
  }
</style>
