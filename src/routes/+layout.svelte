<script>
    let { children } = $props();
    import { onMount } from "svelte";
    onMount(() => {
        document.title = "FRTree";
    });
</script>

<div class="header">
    <a href="/"
        ><img class="logo-img" src="src/LinkTreeLogo-02.png" alt="logo" /></a
    >
    <a href="/"><div class="header-title">FRTree</div></a>
    <div class="search-bar">
        <input placeholder="Enter text" class="input-field" type="text" />
        <label for="input-field" class="input-label">Search for a team</label>
        <span class="input-highlight"></span>
    </div>
    <div class="button-container">
        <a href="/gallery"><button class="btn">Gallery</button></a>
        <button class="btn">Sign Up</button>
        <button class="btn">Sign In</button>
        <a href="https://team1676.com"
            ><img
                class="header-pfp"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAGF-l7-mM82_wzV3-rb20GXvq8nDm-8dFzEYPBY9%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=258c65eef72ceda28dcc447625cfa9c935e781108d34fd1d1affe361e8c6aa90&ipo=images"
                alt="profile pic"
            /></a
        >
    </div>
</div>

<div style="width: 100%; height: 90%; max-height: 90%">
    {@render children()}
</div>

<style>

/* :root {
    --color1: #123524;
    --color2: #3E7B27;
    --color3: #85A947;
    --color4: #EFE3C2;
} */

:root {
    --color1: #007acc;
    --color2: #3e3e42;
    --color3: #2d2d30;
    --color4: #252526;
    --color5: #1e1e1e;
}

.header {
    display: flex;
    align-items: center;    /* Center vertically */
    width: 100vw;
    height: 10vh;
    background-color: var(--color5);
}

.logo-img{
    margin-left: .7vw;
    height: 60px;
}

.button-container {
    display: flex; /* Use flexbox for the button container */
    align-items: center; /* Center buttons vertically */
    margin-left: auto; /* Push the button container to the right */
}


.btn {
    margin-right: 1vw; /* Space between buttons */
    padding: 10px 15px; /* Button padding */
    background-color: var(--color4); /* Button background color */
    border: none; /* Remove default border */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
    transition: 0.3s ease; /* Smooth transition for background color */
    color: var(--color1);
}

.btn:hover {
    background-color: var(--color3); /* Change background color on hover */
    color: var(--color1); /* Change text color on hover (optional) */
}

.btn:active {
    background-color: var(--color2); /* Change background color on hover */
}

.header-pfp {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 1vw;
}

.gallery-btn {
    margin-left: 1vw; /* Space between buttons */
    padding: 10px 15px; /* Button padding */
    background-color: var(--color4); /* Button background color */
    border: none; /* Remove default border */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
    transition: 0.3s ease; /* Smooth transition for background color */
    color: var(--color1);
}

.gallery-btn:hover{
    background-color: var(--color3); /* Change background color on hover */
    color: var(--color1); /* Change text color on hover (optional) */
}

.gallery-btn:active{
    background-color: var(--color2); /* Change background color on click */
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

    :global(html), :global(body) {
        margin: 0;
        width: 100%;
        height: 100%;
    }

    .header {
        display: flex;
        align-items: center; /* Center vertically */
        width: 100vw;
        height: 10%;
        background-color: rgb(216, 196, 171);
    }

    .logo-img {
        margin-left: 0.7vw;
        height: 60px;
    }

    a {
        color: black;
        /* make it not underlined */
        text-decoration: none;
    }

    .button-container {
        display: flex; /* Use flexbox for the button container */
        align-items: center; /* Center buttons vertically */
        margin-left: auto; /* Push the button container to the right */
    }

    .btn {
        margin-right: 1vw; /* Space between buttons */
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

    .header-pfp {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 1vw;
    }

    .gallery-btn {
        margin-left: 1vw; /* Space between buttons */
        padding: 10px 15px; /* Button padding */
        background-color: #fff; /* Button background color */
        border: none; /* Remove default border */
        border-radius: 5px; /* Rounded corners */
        cursor: pointer; /* Pointer cursor on hover */
        transition: background-color 0.3s ease; /* Smooth transition for background color */
    }

    .gallery-btn:hover {
        background-color: #3e7b27; /* Change background color on hover */
        color: white; /* Change text color on hover (optional) */
    }

    .gallery-btn:active {
        background-color: #234716; /* Change background color on click */
    }

    :root {
        --color-0: #b7c685;
        --color-1: #ccd5ae;
        --color-2: #e9edc9;
        --color-3: #fefae0;
        --color-4: #faedcd;
        --color-5: #d4a373;
        --color-b: #212121;
        --color-w: #ececec;
    }

    :global(body) {
        margin: 0;
        width: 100%;
        height: 100%;
    }

    .children-loc {
        padding: 10px;
        width: 100%;
        height: 90vh;
    }

    .header-title {
        padding-left: 10px;
        font-size: 2em;
    }

    .header {
        display: flex;
        align-items: center; /* Center vertically */
        width: 100vw;
        height: 10vh;
        background-color: var(--color-1);
    }

    .logo-img {
        margin-left: 0.7vw;
        height: 60px;
    }

    .button-container {
        display: flex; /* Use flexbox for the button container */
        align-items: center; /* Center buttons vertically */
        margin-left: auto; /* Push the button container to the right */
    }

    .btn {
        margin-right: 1vw; /* Space between buttons */
        padding: 10px 15px; /* Button padding */
        background-color: var(--color-3); /* Button background color */
        border: none; /* Remove default border */
        border-radius: 5px; /* Rounded corners */
        cursor: pointer; /* Pointer cursor on hover */
        transition: background-color 0.3s ease; /* Smooth transition for background color */
        color: var(--color-b);
    }

    .btn:hover,
    .btn:active {
        background-color: var(--color-2); /* Change background color on hover */
    }

    .header-pfp {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 1vw;
    }

    :global(h1, h2, h3, h4, h5, h6, p, span) {
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* :global(p, span) {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
    } */
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
        border-bottom: 2px solid #ccc;
        outline: none;
        background-color: transparent;
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
        background-color: #3e7b27;
        transition: all 0.3s ease;
    }

    /* Input field:focus styles */
    .input-field:focus + .input-label {
        top: -14px;
        font-size: 14px;
        color: #3e7b27;
    }

    .input-field:focus + .input-label + .input-highlight {
        width: 112%;
    }
</style>
