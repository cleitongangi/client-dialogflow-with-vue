<template>
    <div class="container-fluid h-100">
        <div class="row justify-content-center h-100">
            <div class="col-md-8 col-xl-6 chat">
                <div class="card message-card">
                    <div class="card-header msg_head">
                        <div class="d-flex bd-highlight">
                            <div class="img_cont">
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                                <span class="online_icon"></span>
                            </div>
                            <div class="user_info">
                                <span>LD PRINT</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body msg_card_body">
                        <div v-for="message in sendMessageList" id="mensage" :key="message.responseId">

                            <!-- message Sent -->
                            <div class="d-flex justify-content-end mb-4" v-if="message.queryText">
                                <div class="msg_cotainer_send">
                                    {{message.queryText}}
                                    <!--<span class="msg_time_send">8:55 AM, Today</span>-->
                                </div>                            
                            </div>

                            <!-- Components -->
                            <div v-for="(component, index) in message.fulfillmentMessages" :key="index">
                                <!-- Simple Text -->
                                <MessageText v-if="component.text" :text="component.text.text_[0]" />

                                <!-- Simple Response -->                                
                                <MessageText v-if="component.simpleResponses" :text="component.simpleResponses.simpleResponses_[0].displayText" />

                                <!-- Select List -->
                                <MessageListSelect v-if="component.listSelect"
                                    :title="component.listSelect.title"
                                    :subtitle="component.listSelect.subtitle">
                                    <MessageListSelectItem
                                        v-for="item in component.listSelect.items"
                                        :key="item.info.key"
                                        :title="item.title"
                                        :description="item.description"
                                        :image-uri="item.image.imageUri"
                                        :image-title="item.image.accessibilityText"
                                        @click.native="sendMessage(item.info.key)"
                                    />
                                </MessageListSelect>

                                <!-- Basic Card -->
                                <MessageBasicCard
                                        v-if="component.basicCard"
                                        :title="component.basicCard.title"
                                        :subtitle="component.basicCard.subtitle"
                                        :image-uri="component.basicCard.image.imageUri"
                                        :image-title="component.basicCard.image.accessibilityText"
                                        :description="component.basicCard.formattedText"                                        
                                    >
                                    <MessageCardLink
                                        v-for="(button,index) in component.basicCard.buttons"
                                        :key="index"
                                        :uri="button.openUriAction.uri"
                                        :uriTitle="button.title"
                                    />
                                </MessageBasicCard>

                                <!-- Suggestions -->
                                <div v-if="component.suggestions">                                    
                                    <MessageSuggestions
                                        v-for="(suggestion,index) in component.suggestions.suggestions_"
                                        :key="index"
                                        :text="suggestion.title"
                                        @click.native="sendMessage(suggestion.title)"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div class="scrollto"></div>

                    </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <div class="input-group-append">
                                <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
                            </div>
                            <textarea class="form-control type_msg" placeholder="Type your message..." v-model="inputMessage"></textarea>
                            <div class="input-group-append">
                                <span class="input-group-text send_btn" v-on:click="addMessage"><i class="fas fa-location-arrow"></i>></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>    
    import axios from 'axios'
    import MessageText from '@/components/MessageText.vue'
    import MessageListSelect from '@/components/MessageListSelect.vue'
    import MessageListSelectItem from '@/components/MessageListSelectItem.vue'
    import MessageBasicCard from '@/components/MessageBasicCard.vue'
    import MessageCardLink from '@/components/MessageCardLink.vue'
    import MessageSuggestions from '@/components/MessageSuggestions.vue'
    
    
    export default {
        name: 'App',
        components: {
            MessageText,
            MessageListSelect,
            MessageListSelectItem,
            MessageBasicCard,
            MessageCardLink,
            MessageSuggestions
        },
        data() {
            return {
                session:'1',
                inputMessage: '',
                sendMessageList: [],
                info:null,
                error: null,
                loading: true
            }            
        },
        filters: {
            currencydecimal (value) {
            return value.toFixed(2)
            }
        },
        methods: {
            sendMessage(text){
                this.inputMessage = text;
                this.addMessage();
            },
            addMessage() {
                this.loading = true
                this.error = null

                // Send message
                axios
                    .post(this.config.apiEndpoint,
                        { 
                            session: this.session,
                            queryInput:{
                                text:{
                                    text: this.inputMessage,
                                    languageCode: "pt-BR"
                                }                                
                            }
                        }
                    )
                    .then(response => {                        
                        this.processResponse(response)
                    })
                    .catch(error => {
                        console.log(error)
                        this.error = error.message
                    })
                    .finally(() => this.loading = false)

                this.inputMessage = '';
            },
            processResponse(response){
                this.sendMessageList.push(response.data);
                this.info = response.data;

                this.scrollToElement();
            },
            scrollToElement() {
                let el = document.getElementsByClassName('msg_card_body');
                el.scrollTop = el.innerHeight
            }
        }
    }
</script>

<style>
    body, html {
        height: 100%;
        margin: 0;
        background: #7F7FD5;
        background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
        background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    }

    .chat {
        margin-top: auto;
        margin-bottom: auto;
    }

    .message-card {
        height: 700px;
        border-radius: 15px !important;
        background-color: rgba(0,0,0,0.4) !important;
    }

    .contacts_body {
        padding: 0.75rem 0 !important;
        overflow-y: auto;
        white-space: nowrap;
    }

    .msg_card_body {
        overflow-y: auto;
    }

    .card-header {
        border-radius: 15px 15px 0 0 !important;
        border-bottom: 0 !important;
    }

    .card-footer {
        border-radius: 0 0 15px 15px !important;
        border-top: 0 !important;
    }

    .container {
        align-content: center;
    }

    .search {
        border-radius: 15px 0 0 15px !important;
        background-color: rgba(0,0,0,0.3) !important;
        border: 0 !important;
        color: white !important;
    }

        .search:focus {
            box-shadow: none !important;
            outline: 0px !important;
        }

    .type_msg {
        background-color: rgba(0,0,0,0.3) !important;
        border: 0 !important;
        color: white !important;
        height: 60px !important;
        overflow-y: auto;
    }

        .type_msg:focus {
            box-shadow: none !important;
            outline: 0px !important;
        }

    .attach_btn {
        border-radius: 15px 0 0 15px !important;
        background-color: rgba(0,0,0,0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
    }

    .send_btn {
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0,0,0,0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
    }

    .search_btn {
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0,0,0,0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
    }

    .contacts {
        list-style: none;
        padding: 0;
    }

        .contacts li {
            width: 100% !important;
            padding: 5px 10px;
            margin-bottom: 15px !important;
        }

    .active {
        background-color: rgba(0,0,0,0.3);
    }

    .user_img {
        height: 70px;
        width: 70px;
        border: 1.5px solid #f5f6fa;
    }

    .user_img_msg {
        height: 40px;
        width: 40px;
        border: 1.5px solid #f5f6fa;
    }

    .img_cont {
        position: relative;
        height: 70px;
        width: 70px;
    }

    .img_cont_msg {
        height: 40px;
        width: 40px;
    }

    .online_icon {
        position: absolute;
        height: 15px;
        width: 15px;
        background-color: #4cd137;
        border-radius: 50%;
        bottom: 0.2em;
        right: 0.4em;
        border: 1.5px solid white;
    }

    .offline {
        background-color: #c23616 !important;
    }

    .user_info {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 15px;
    }

        .user_info span {
            font-size: 20px;
            color: white;
        }

        .user_info p {
            font-size: 10px;
            color: rgba(255,255,255,0.6);
        }

    .video_cam {
        margin-left: 50px;
        margin-top: 5px;
    }

        .video_cam span {
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-right: 20px;
        }

    .msg_cotainer {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
        border-radius: 25px;
        background-color: #82ccdd;
        padding: 10px;
        position: relative;
    }

    .msg_cotainer_send {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 10px;
        border-radius: 25px;
        background-color: #78e08f;
        padding: 10px;
        position: relative;
    }

    .msg_time {
        position: absolute;
        left: 0;
        bottom: -15px;
        color: rgba(255,255,255,0.5);
        font-size: 10px;
    }

    .msg_time_send {
        position: absolute;
        right: 0;
        bottom: -15px;
        color: rgba(255,255,255,0.5);
        font-size: 10px;
    }

    .msg_head {
        position: relative;
    }

    #action_menu_btn {
        position: absolute;
        right: 10px;
        top: 10px;
        color: white;
        cursor: pointer;
        font-size: 20px;
    }

    .action_menu {
        z-index: 1;
        position: absolute;
        padding: 15px 0;
        background-color: rgba(0,0,0,0.5);
        color: white;
        border-radius: 15px;
        top: 30px;
        right: 15px;
        display: none;
    }

        .action_menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

            .action_menu ul li {
                width: 100%;
                padding: 10px 15px;
                margin-bottom: 5px;
            }

                .action_menu ul li i {
                    padding-right: 10px;
                }

                .action_menu ul li:hover {
                    cursor: pointer;
                    background-color: rgba(0,0,0,0.2);
                }

    @media(max-width: 576px) {
        .contacts_card {
            margin-bottom: 15px !important;
        }
    }
</style>
