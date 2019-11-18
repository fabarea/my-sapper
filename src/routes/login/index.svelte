<script>
    import {goto, stores} from '@sapper/app';
    import ListErrors from '../../components/ListErrors.svelte';
    import {post} from 'utils.js';

    const {session} = stores();

    let email = '';
    let password = '';
    let errors = null;

    async function submit(event) {
        const response = await post(`auth/login`, {email, password});

        // TODO handle network errors
        errors = response.errors;

        if (response.user) {
            $session.user = response.user;
            goto('/');
        }
    }
</script>

<svelte:head>
    <title>Identification</title>
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Identification</h1>
                <p class="text-xs-center">
                    <a href="/register">Besoin d'un compte?</a>
                </p>

                <ListErrors {errors}/>

                <form on:submit|preventDefault={submit}>
                    <fieldset class="md-form">
                        <input class="form-control"
                               type="email"
							   id="email"
                               bind:value={email}>
                        <label for="email">Email</label>
                    </fieldset>

                    <fieldset class="md-form">
                        <input type="password"
							   id="password"
							   class="form-control"
                               bind:value={password}>
                        <label for="password">Mot de passe</label>
                    </fieldset>

                    <button class="btn btn-lg btn-primary pull-xs-right"
							type="submit" disabled='{!email || !password}'>
                        S'identifier
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
