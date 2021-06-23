<!-- https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#listselect -->
<template>        
    <div class="mb-3">
        <h4 v-if="title">{{title}}</h4>
        <!-- <span v-if="subtitle">{{subtitle}}</span> -->
        <div :aria-label="title" class="list-group"><slot /></div>
    </div>
</template>

<style>
</style>

<script>
export default {
    name: 'MessageListSelect',
    props: {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        }
    }
}
</script>
