<script>
    let { children } = $props();
    import logo from "$lib/assets/LinkTreeLogo-02.png";
    import "./global.css";

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

<div class="header">
    <a href="/"><img class="logo-img" src={logo} alt="logo" /></a>
    <a href="/"><div class="header-title font">FRTree</div></a>
    <div class="search-bar">
        <input
            onkeydown={search}
            placeholder="Enter text"
            class="input-field"
            type="text"
        />
        <label for="input-field" class="input-label">Search for a team</label>
        <span class="input-highlight"></span>
    </div>
    <div class="button-container">
        <a href="/gallery"><button class="btn btn-1 font">Gallery</button></a>
        <button class="btn btn-1 font">Sign Up</button>
        <button class="btn btn-1 font">Sign In</button>
        <a href="https://team1676.com"
            ><img
                class="header-pfp"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAGF-l7-mM82_wzV3-rb20GXvq8nDm-8dFzEYPBY9%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=258c65eef72ceda28dcc447625cfa9c935e781108d34fd1d1affe361e8c6aa90&ipo=images"
                alt="profile pic"
            /></a
        >
    </div>
</div>

<div class="children">
    {@render children()}
</div>

<style>

    .children {
        width: 100%;
        height: 90%;
        max-height: 90%;
        background-color: var(--color3);
    }

    /* Font */
    .font {
        font-family:
            Helvetica Neue,
            Helvetica,
            Arial,
            sans-serif;
    }

    .header {
        display: flex;
        align-items: center; /* Center vertically */
        width: 100vw;
        height: 10vh;
        background-color: var(--color5);
    }

    .logo-img {
        margin-left: 0.7vw;
        height: 60px;
    }

    .header-pfp {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 1vw;
    }

    /* Input container */
    .search-bar {
        position: relative;
        margin: 20px;
    }

    /* Input field */
    .input-field {
        display: block;
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: none;
        border-bottom: 2px solid var(--color1);
        outline: none;
        background-color: transparent;
        color: white;
    }

    /* Input label */
    .input-label {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 16px;
        color: transparent;
        pointer-events: none;
        transition: all 0.3s ease;
    }

    /* Input highlight */
    .input-highlight {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 0;
        background-color: var(--color1);
        transition: all 0.3s ease;
    }

    /* Input field:focus styles */
    .input-field:focus + .input-label {
        top: -14px;
        font-size: 14px;
        color: var(--color1);
    }

    .input-field:focus + .input-label + .input-highlight {
        width: 110%;
        /* background-color: var(--color2) */
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

    .children-loc {
        padding: 10px;
        width: 100%;
        height: 90vh;
    }

    .header-title {
        padding-left: 10px;
        font-size: 2em;
        color: var(--color1);
    }

    :global(h1, h2, h3, h4, h5, h6, p, span) {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    /* :global(p, span) {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
    } */
</style>
