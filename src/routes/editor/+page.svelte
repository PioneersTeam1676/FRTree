<script>
    import { onMount } from "svelte";

    let color1;
    let color1input;

    onMount(() => {
        color1input.addEventListener("change", () => {
            console.log(color1);
        })
    });
</script>

<input bind:this={color1input} bind:value={color1} type="color" id="col1">