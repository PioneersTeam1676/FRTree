<script>
    let { children } = $props();
    import logo from "$lib/assets/LinkTreeLogo-02.png";
    import "./global.css";
    import Navbar from "../Navbar.svelte";

    import { onMount } from "svelte";
    onMount(() => {
        document.title = "FRTree";
    });

    function search(event) {
        if (event.key === "Enter") {
            console.log(event.target.value);
            window.location.href = `/search/${event.target.value}`;
        }
    }
</script>

<Navbar />

<div class="children">
    {@render children()}
</div>

<style>

    :global(html) {
        background-color: var(--color3);
    }

    .children {
        width: 100%;
        height: 90%;
        max-height: 90%;
        background-color: var(--color3);
    }

   
    :global(html),
    :global(body) {
        margin: 0;
        width: 100%;
        height: 100%;
    }

    a {
        color: black;
        text-decoration: none;
    }

    
    :global(h1, h2, h3, h4, h5, h6, p, span) {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

</style>
