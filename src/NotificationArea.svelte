<script lang="ts">
    
    let notifs = $state([]);

    type Notification = { message: string };

    export function notify(notification: Notification) {
        notifs = [...notifs, notification];
        setTimeout(() => {
            const notifElement = document.querySelector('.notif');
            if (notifElement) {
                notifElement.classList.add('slide-out');
                setTimeout(() => {
                    notifs = notifs.slice(1);
                }, 500); // Match the duration of slideOut animation
            }
        }, 1500);
    }

</script>

{#snippet notif(notification: Notification)}
    <div class="notif slide-in">
        <p>{notification.message}</p>
    </div>
{/snippet}

{#each notifs as notification}
    {@render notif(notification)}
{/each}

<style>
    .notif {
        color: white;
        font-size: 1em;
    }

    .slide-in {
        animation: slideIn 0.5s;
    }

    .slide-out {
        animation: slideOut 0.5s;
    }

    @keyframes slideIn {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slideOut {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(100%);
        }
    }
</style>