<script lang="ts">
    let team;
    let email;
    let expires = getISODay(getDaysFromNow(2));

    function getDaysFromNow(days: number): Date {
        const oneDay = 1000 * 60 * 60 * 24;
        const date = new Date(Date.now() + oneDay + days);
        return date;
    }

    function getISODay(date: Date): string {
        return date.toISOString().split("T")[0];
    }

    function submit() {
        fetch("/admin/createjoincode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                team, email, expires
            })
        }).then(res => {
            if (res.ok) {
                team = "";
                email = "";
                expires = getISODay(getDaysFromNow(2));
                alert("Join code created successfully");
            } else {
                alert("Failed to create join code");
            }
        });
    }
</script>

    <div class="form">
        <h1>Create a join code</h1>
        <div class="input-group">
            <label for="team">Team Number</label>
            <input bind:value={team} type="number" id="team" />
        </div>
        <div class="input-group">
            <label for="email">Email</label>
            <input bind:value={email} type="email" id="email" />
        </div>
        <div class="input-group">
            <label for="expires">Expires</label>
            <input bind:value={expires} type="date" id="expires" min={getISODay(new Date())}>
        </div>
        <button id="submit" type="submit" onclick={submit}>Submit</button>
    </div>

<style>
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
        width: fit-content;
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
