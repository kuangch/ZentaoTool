import dialog from './BaseDialog.vue'

dialog.install = function (Vue) {
    dialog.$eventBus =new Vue();
    let fragment = document.createElement('div');
    fragment.id='base_dialog';
    document.body.appendChild(fragment);

    new Vue({
        render:h => h(dialog)
    }).$mount('#base_dialog');

    Vue.$openDialog = Vue.prototype.$openDialog = function (attribute,callback) {
        if(!attribute)
            return;
        if(attribute.content.props.dialog_parent){
            attribute.dialog_parent=this;
        }
        dialog.$eventBus.$emit("openDialog",attribute);
    };
    Vue.$closeDialog = Vue.prototype.$closeDialog = function(data){
        dialog.$eventBus.$emit("closeDialog",data);
    }
}
export default dialog