<script>

    let code = $state("");
    let team_num = $state(0);
    let email = $state("");
    let username = $state("");
    let password = $state("");
    let password_confirm = $state("");

    let formData = $derived({
        code, team_num, email, username, password, password_confirm
    });

    function submit() {
        console.log(formData);
        fetch("/sign_up/ploopy", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // window.location.href = "/";
    }
</script>

<div>
    <p>Currently, registration to FRTree is <em>invitation-only</em>.</p>
    <p>We thank you for your continued interest.</p>
</div>

<form id="main-form" autocomplete="off">
    <div class="input-group">
        <label for="code">Join Code</label>
        <input bind:value={code} type="text" id="code" name="code">
    </div>
    
    <div class="input-group">
        <label for="team_num">Team Number</label>
        <input bind:value={team_num} type="number" id="team_num" name="team_num">
    </div>
    
    <br>

    <div class="input-group">
        <label for="email">Email</label>
        <input bind:value={email} type="email" id="email" name="email">
    </div>

    <div class="input-group">
        <label for="username">Username</label>
        <input bind:value={username} type="text" id="username" name="username">
    </div>

    <br>

    <div class="input-group">
        <label for="password">Create a Password</label>
        <input bind:value={password} type="password" id="password" name="password">
    </div>

    <div class="input-group">
        <label for="password_confirm">Confirm Password</label>
        <input bind:value={password_confirm} type="password" id="password_confirm" name="password_confirm">
    </div>

    <div class="input-group">
        <input type="button" value="submit" onclick={submit}>
    </div>    
</form>