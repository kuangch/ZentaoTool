import backgroundBox from './BackgroundFrame.vue'

backgroundBox.install = function (Vue) {
    Vue.component(backgroundBox.name, backgroundBox);
};
export default backgroundBox
