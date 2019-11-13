{#if href}
    <a on:click class="{classes}" {href} {title}>
        {#if icon}
            <i class="material-icons {iconAlign}">{icon}</i>
        {/if}
        <slot>button</slot>
    </a>
{:else}
    <button on:click class="{classes}" {type} {name} {disabled}>
        {#if icon}
            <i class="material-icons {iconAlign}">{icon}</i>
        {/if}
        <slot>button</slot>
    </button>
{/if}

<script>

    return {
        color: '', // classes
        size: '',
        icon: '',
        iconAlign: 'left',
        floating: false,
        flat: false,
        waves: false,
        wavesColor: 'light',
        type: '',// button or link attr
        href: '',
        name: '',
        disabled: false,
        href: '', // only link attr
        title: ''
    };
</script>

<style>

</style>