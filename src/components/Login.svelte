<script>
    import { stores } from '@sapper/app';
    const { session } = stores();

    export let handleSubmit = async function(event) {
        if(!event.target.checkValidity()) {
            return;
        }

        const response = await fetch("/login",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: event.target[0].value, password: event.target[1].value})
                });
        if (response.status === 201) {
            // Sets the User to true in the Store so we do not have to refresh the page.
            session.set({ user: true });
        }
    }
</script>
