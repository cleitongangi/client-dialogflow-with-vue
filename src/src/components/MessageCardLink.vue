<template>    
    <a  class="card-link" :href="uri" target="_blank" rel="noopener noreferrer">{{uriTitle}}</a>
</template>

<style type="text/css">
    .cursor-pointer{
        cursor: pointer;
    }
</style>

<script>
export default {
    name: 'MessageCardLink',
    props: {        
        uri: {
            type: String,
            default: null
        },
        uriTitle: {
            type: String,
            default: null
        }
    }
}
</script>
