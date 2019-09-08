<template>
    <div ref="trigger"></div>
</template>

<script>

    export default {
        name: 'Trigger',
        props: {
            options: {
                type: Object,
                default: function(){
                    return {
                        root: null,
                        threshold: 0
                    }
                }
            }
        },
        data(){
            return {
                observer: null
            }
        },
        methods: {
            handleIntersect(entry){
                if(entry.isIntersecting){
                    this.$store.commit('enableLoading');
                    this.$emit("triggerIntersected");
                }
            }
        },
        mounted() {
            this.observer = new IntersectionObserver( entries => {
                this.handleIntersect(entries[0]);
            }, this.options);
            this.observer.observe(this.$refs.trigger)
        },
        beforeDestroy() {
            this.observer.disconnect();
        }
    }

</script>