<script>
  import { onMount } from 'svelte';
  onMount(() => {
    document.title = 'Pi-Links';
  });

</script>

<title>FRTree</title>

<!-- https://crispy-engine-rw7jpq56gpphx9w-5173.app.github.dev/ -->
<div class="main-content">
<h1>FRTree</h1>
<p>Make a customized link profile to share all of your cool projects!</p>
<button>Make a Profile</button>
<button>View Profiles</button>
</div>
<style>
    
:global(html) {color: #3E7B27}
:global(body) {margin:0px; background:#85A947;}

.main-content {
    flex: 1; /* Take up remaining space */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    padding: 20px; /* Add padding to prevent clipping */
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    height: 100vh; /* Full viewport height */
    display: flex;
    flex-direction: column;
}
h1 {
    font-size: 5rem; /* Increased font size for better visibility */
    background: linear-gradient(270deg, #28a745, #007BFF, #6f42c1, #007BFF, #28a745);
    background-size: 800% 800%; /* Large size for smooth gradient movement */
    background-clip: text;
    display: block;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent; /* Ensures text is transparent in WebKit browsers */
    animation: gradientMove 12s linear infinite; /* Smooth left-to-right animation */
    margin: 20px 0;
    text-align: center;
}
button {
    display: flex;
    flex-direction: row;
    justify-content: center; /* Centers the buttons horizontally */
    gap: 20px; /* Space between buttons */
    margin-top: 20px; /* Space above buttons */
    padding-right: 0; /* Removes right padding to prevent clipping */
}
@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
