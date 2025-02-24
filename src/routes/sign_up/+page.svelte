<script>

    import { post } from "$lib/apis";

    let code = $state("");
    let team_num = $state(0);
    let email = $state("");
    let password = $state("");

    let info;

    function submit() {
        console.log("SIGNED UP!");
        post("/sign_up/create", {
            code,
            team_num,
            email,
            password
        }).then(result => {
            if (result.isSuccess()) {
                window.location.href = "../sign_in";
            } else {
                alert("Error: " + result.message);
            }
        });
    }
</script>

<div>
    <p>Currently, registration to FRTree is <em>invitation-only</em>.</p>
    <p>We thank you for your continued interest.</p>
</div>

<form id="main-form" autocomplete="on">
    <div class="input-group">
        <label for="code">Join Code</label>
        <input bind:value={code} type="text" id="code" name="code">
    </div>
    
    <div class="input-group">
        <label for="team_num">Team Number</label>
        <input bind:value={team_num} type="number" id="team_num" name="team_num">
    </div>
    
    <div class="input-group">
        <label for="email">Email</label>
        <input bind:value={email} type="email" id="email" name="email">
    </div>

    <div class="input-group">
        <label for="password">Create a Password</label>
        <input bind:value={password} type="password" id="password" name="password">
    </div>

    <div class="input-group">
        <input type="button" value="submit" onclick={submit}>
    </div>    
</form>