<script>
    import { post } from "$lib/apis";

    let email = $state("");
    let password = $state("");

    async function submit() {
        const res = await post("/sign_in/create", {
            email,
            password
        });
        if (res.isSuccess()) {
            const sessionId = res.data.sessionId;
            const onedayfromnow = new Date(Date.now() + 1000 * 60 * 60 * 24);
            document.cookie = `sessionId=${sessionId}; expires=${onedayfromnow.toUTCString()}; path=/;`;
            window.location.href = "/";
        } else {
            alert("Error: " + res.message);
        }
    }
</script>

<div class="main">
    <div class="form">
        <h1>Sign in</h1>
        <div class="input-group">
            <label for="email">Email</label>
            <input bind:value={email} id="email" type="text" />
        </div>

        <div class="input-group">
            <label for="password">Password</label>
            <input bind:value={password} id="password" type="password" />
        </div>
        <button id="submit" onclick={submit}>Submit</button>
    </div>
</div>

<style>
    .main {
        margin: auto;
        width: 100%;
        height: 100%;
    }

    h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
    }

    label,
    input,
    button {
        font-size: 1.5em;
    }

    .form {
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        width: min-content;
        text-align: center;
        padding: 20px;
        border-radius: 10px;
        border: 1.25px solid var(--color3);
        background-color: var(--color2);
    }

    .input-group {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
        margin-bottom: 2px;
    }
</style>
