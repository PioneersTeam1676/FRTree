<script>
    import { onMount } from "svelte";

    let { data } = $props();
    console.log(data);

    let formData = $state({
        team_full_name: null,
        pfp: null,
        description: null,
        primary_col: null,
        secondary_col: null,
        location: null,
        team_num: null
    });

    let loaded = $state(false);

    function isWhite(str) {
        // fiddle this value to set stricter rules for what is white.
        var whiteLimit = 255/2, 
            r,g,b;
        
        r = parseInt("0x"+str.substring(1,3));
        g = parseInt("0x"+str.substring(3,5));
        b = parseInt("0x"+str.substring(5,7));
        if(r < whiteLimit || b < whiteLimit || g < whiteLimit) {
            return false;
        } 
        return true;    
    }
    
    onMount(async () => {
        // Ensure data is defined before accessing its properties
        if (data?.data?.info?.[0]) {
            formData = {...data.data.info[0]};
            loaded = true;
        }

        let colorPreviewPrimary = document.getElementById("primary_preview");
        let colorPreviewSecondary = document.getElementById("secondary_preview");
        let colorInputPrimary = document.getElementById("primary_color");
        let colorInputSecondary = document.getElementById("secondary_color");

        const p = () => {
            colorPreviewPrimary.innerText = formData.primary_col;
            colorPreviewPrimary.style.backgroundColor = formData.primary_col;
            colorPreviewPrimary.style.color = isWhite(formData.primary_col) ? "black" : "white";
        }

        const s = () => {
            colorPreviewSecondary.innerText = formData.secondary_col;
            colorPreviewSecondary.style.backgroundColor = formData.secondary_col;
            colorPreviewSecondary.style.color = isWhite(formData.secondary_col) ? "black" : "white";
        }

        colorInputPrimary.addEventListener("input", p);
        colorInputSecondary.addEventListener("input", s);

        p();
        s();
    });

</script>

<div class="main" style:display={loaded ? "block" : "none"}>
    <h1>Edit page for team {formData.team_num}</h1>

    <form>
        <div class="input-group">
            <label for="team_full_name">Team Full Name</label>
            <input id="team_full_name" type="text" bind:value={formData.team_full_name} />
        </div>
        
        <div class="input-group">
            <label for="pfp">Profile Picture URL</label>
            <input id="pfp" type="url" bind:value={formData.pfp} />
        </div>

        <div class="input-group">
            <label for="description">Description</label>
            <input id="description" type="text" bind:value={formData.description} />
        </div>

        <div class="input-group">
            <label for="primary_color">Primary Color</label>
            <div>
                <span id="primary_preview" class="color-preview"></span>
                <input id="primary_color" type="color" bind:value={formData.primary_col} />
            </div>
        </div>

        <div class="input-group">
            <label for="secondary_color">Secondary Color</label>
            <div>
                <span id="secondary_preview" class="color-preview"></span>
                <input id="secondary_color" type="color" bind:value={formData.secondary_col} />
            </div>
        </div>

        <div class="input-group">
            <label for="location">Location</label>
            <input id="location" type="text" bind:value={formData.location} />
        </div>

    </form>
    <button class="btn btn-danger">Save Changes</button>
    <button class="btn btn-1">Clear Changes</button>
</div>

{#if !loaded}
    <h1>Loading</h1>
{/if}

<style>

    .main {
        padding: 20px;
    }
    
    .color-preview {
        color: white;
        border-radius: 5px;
        padding: 0px 5px;
    }

</style>