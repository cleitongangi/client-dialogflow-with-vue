<template>    
    <div class="d-flex justify-content-start mb-4">
        <div class="msg_cotainer">            
            {{text}}
            <!--<span class="msg_time_send">8:55 AM, Today</span>-->
        </div>                            
    </div>
</template>

<style>

</style>

<script>
export default {
    name: 'MessageText',
    props: {
        text: {
            type: String,
            required: false,
            default: ''
        },
        loading: {
            type: Boolean
        }
    }
}
</script>
