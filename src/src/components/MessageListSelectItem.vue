<template>
    <a  class="list-group-item list-group-item-action cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
        :href="uri">            
            <h5 class="">{{title}}</h5>
            <img v-if="imageUri" class="" :src="imageUri" :alt="imageTitle">
            <p v-if="description" class="mt-1">{{description}}</p>
    </a>    
</template>

<style type="text/css">
    .cursor-pointer{
        cursor: pointer;
    }
</style>

<script>
export default {
    name: 'MessageListSelectItem',
    props: {
        imageUri: {
            type: String,
            default: null
        },
        imageTitle: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },        
        uri: {
            type: String,
            default: null
        }
    }
}
</script>
