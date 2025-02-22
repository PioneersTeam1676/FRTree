<script>
    let { children, data } = $props();
    let loggedInAs = data.data.loggedInAs;
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

<Navbar loggedInAs={1676} />

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


    .header-pfp {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 1vw;
    }

    /* :root {
        --color-0: #b7c685;
        --color-1: #ccd5ae;
        --color-2: #e9edc9;
        --color-3: #fefae0;
        --color-4: #faedcd;
        --color-5: #d4a373;
        --color-b: #212121;
        --color-w: #ececec;
    } */


    /* .children-loc {
        padding: 10px;
        width: 100%;
        height: 90vh;
    } */

    .header-title {
        padding-left: 10px;
        font-size: 2em;
        color: var(--color1)
    }

    /* :global(h1, h2, h3, h4, h5, h6, p, span) {
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    } */


</style>
