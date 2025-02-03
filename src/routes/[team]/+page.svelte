<script>
    export let data;
    console.log(data);
</script>

{#if data.data.length <= 0}
    <h1>This team hasnt signed up yet! If you are this team and would like to you can go <a href="/signup">here</a> or you can tell them to sign up!</h1>
{/if}


{#each data.data as link}
    <a href="{link.url}">{link.description}</a>
    <br/>
{/each}

