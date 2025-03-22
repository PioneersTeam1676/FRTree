<script lang="ts">
    import { docTitle } from "$lib/frontendutil";
    import CreateJoinCode from "./CreateJoinCode.svelte";
    docTitle("Admin Panel")
</script>

<div class="main">
    <CreateJoinCode />
</div>

<style>
    .main {
        margin: auto;
        width: 100%;
        height: 100%;
    }
</style>
