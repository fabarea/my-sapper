<script context="module">
    export function preload(page, { user }) {
        return { user };
    };
</script>
<script>
    import Signup from '../components/Signup.svelte';
    import Login from '../components/Login.svelte';
    import Logout from '../components/Logout.svelte';
    import { stores } from '@sapper/app';
    const { session } = stores();

    export let user;
</script>

{#if !user}
    <Signup/>
    <Login/>
{:else}
    <Logout/>
{/if}
