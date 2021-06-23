<template>
    <button type="button" class="btn btn-primary mx-1">{{text}}</button>    
</template>

<style>

</style>

<script>
export default {
    name: 'MessageSuggestions',
    props: {
        text: {
            type: String,
            default: null
        }
    }
}
</script>
