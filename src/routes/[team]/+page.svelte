<script>
    export let data;
    console.log(data);
</script>


{#each data.data as url}
    <a href="{url.url}">Link!</a>
    <br/>
{/each}

