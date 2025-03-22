<script>
    import { post } from "$lib/apis";
    import { docTitle } from "$lib/frontendutil";
    import { toast } from "svelte-hot-french-toast";

    let email = $state("");
    let password = $state("");

    docTitle("Sign In");

    async function submit() {
        const res = await post("/sign_in/create", {
            email,
            password
        });
        if (res.isSuccess()) {
            window.location.href = "/";
        } else {
            alert("Error: " + res.message);
        }
    }

    function submitWrapper() {
        toast.promise(
            submit(),
            {
                loading: "Signing in...",
                success: "Signed in successfully",
                error: "Failed to sign in"
            }
        )
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
        <button id="submit" onclick={submitWrapper}>Submit</button>
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
