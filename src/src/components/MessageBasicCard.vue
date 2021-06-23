<template>    
    <div class="card w-50">
        <img v-if="imageUri" class="card-img-top" :src="imageUri" :alt="imageTitle">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <h6 v-if="subtitle" class="card-subtitle">{{subtitle}}</h6>
            <p v-if="description" class="card-text mb-1">{{description}}</p>
            <slot />            
        </div>
    </div>
</template>

<style>

</style>

<script>
export default {
    name: 'MessageBasicCard',
    props: {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        imageUri: {
            type: String,
            default: null
        },
        imageTitle: {
            type: String,
            default: null
        },
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
