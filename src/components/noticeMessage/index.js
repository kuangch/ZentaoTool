import Message from './noticeMessage.vue'


Message.install = function (Vue) {
    Message.$eventBus = new Vue();
    let fragment = document.createElement('div');
    fragment.id = 'notice_message';
    document.body.appendChild(fragment);

    new Vue({
        render: h => h(Message)
    }).$mount('#notice_message');

    Vue.$notice_message = Vue.prototype.$notice_message = function (data) {
        Message.$eventBus.$emit("notice_message", data);
    }
    Vue.$close_message = Vue.prototype.$close_message = function (data) {
        Message.$eventBus.$emit("close_message", data);
    }
};
export default Message
