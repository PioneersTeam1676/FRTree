<script>
  import Tree from "../Tree.svelte";
</script>

<!-- https://crispy-engine-rw7jpq56gpphx9w-5173.app.github.dev/ -->
<div class="main-content">
  <div class="half">
    <!-- <p>thing goes here</p> -->
    <img alt="Linktree Logo" src="src/lib/assets/LinkTreeLogo-01.png">
  </div>
  <div class="half">
    <h1 style="font-size:5em">FRTree</h1>
    <p>An efficient and thoughtful social media collection app for FRC Teams, by the Pascack Pi-oneers</p>
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
      <button onclick={() => window.location.href="./sign_up"} class="btn btn-1-outline btn-cta">Make a Profile</button>
      <button onclick={() => window.location.href="./gallery"} class="btn btn-1-outline btn-cta">View Profiles</button>
    </div>
  </div>
</div>

<div class="below-mission">
  <div class="below-content">
    <h2 class="mission-h2">Mission Statement</h2>
    <div class="mission-hr"></div>
    <p class="mission-p">
      Our goal with FRTree is to make a standardized social media platform for First Robotics Competition teams. We hope our product will induce collaboration and communication between teams, which is one of the FIRST core values we find so important. The features we add to FRTree will prioritize ease of use, information-first layout, and customizability for team administrators.
    </p>
  </div>
</div>
<div class="below-features">
  <div class="below-content">
    <h2 class="mission-h2">Features</h2>
    <div class="mission-hr"></div>

    <i class="mission-i">Some of these features are still in the works</i>
    <p class="mission-p">
      For anyone looking for information on a team, the feature-rich search will allow you to search for teams either by their code <i>e.g. 1676</i>, by their team name <i>e.g. Pascack Pi-oneers</i>, or by more general information <i>e.g. Pascack Hills, Pi, speaker award</i>.
    </p>
    <p class="mission-p">
      Once you locate the team of interest, you can find plenty of valuable information, like the team name, location, a list of awards, and of course, a list of links that the team administrators have set. Teams can use these links to quickly reach out and contact one another, especially in the chaos of a competition. Like the well-known LinkTree, the links may include social media profiles, websites and blogs, or any other important information.
    </p>
    <p class="mission-p">
      Team administrators can access a secure portal to manage their teams page. They can change the color pallete of their page, modify their description, add or remove links, and much more.
    </p>
  </div>
</div>

<style>

  .below-mission {
    width: 100%;
    padding: 50px 0px;
    display: flex;
    justify-content: center;
    background-color: var(--color3);
  }

  .below-features {
    width: 100%;
    padding: 50px 0px;
    display: flex;
    justify-content: center;
    background-color: var(--color2);
  }


  .below-content {
    width: 75%;
  }

  .mission-h2 {
    text-align: center;
    font-size: 2em;
    margin: 20px 0px;
  }

  .mission-p {
    font-size: 1.25em;
    margin: 10px 0px;
  }

  .mission-hr {
    width: 100%;
    height: 0px;
    border: 1.25px solid var(--color1);
  }

  .btn-cta {
    width: 100%;
    font-size: 1.5em;
  }

  .main-content {
    height: 75%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    /* border: 2px solid blue; */
    display: flex;
    justify-content: space-around;
    padding: 20px 40px;
    background-color: var(--color2);
  }

  .half {
    width: 45%;
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
