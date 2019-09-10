<template>
    <div ref="trigger"></div>
</template>

<script>

    /**
     * Determines when an element is visible and triggers an event.
     * */

    export default {

        name: 'Trigger',

        props: {

            /**
             * Options to configure the Intersection Observer
             * (specifically circumstances under which the observer's callback will be invoked).
             * */
            options: {
                type: Object,
                default: function(){
                    return {
                        /**
                         * Reference object, which we use to base the visibility of our watched element.
                         * It might be any ancestor of the object or our browser viewport if we pass null.
                         * */
                        root: null,
                        /**
                         * Value that can vary from 0 to 1 and tells us at what percent of the target’s visibility the observer callback should be executed,
                         * with 0 meaning as soon as even one pixel is visible and 1 meaning the whole element must be visible
                         * */
                        threshold: 0,
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

            /**
             * A callback for IntersectionObserver().
             * Fires when the observed element passes the specified threshold.
             * @param {Array} entry - array of all elements that are watched by the observer
             * @fires triggerIntersected
             * */
            handleIntersect(entry){

                // Emit event if the observed element became visible.
                if(entry.isIntersecting){

                    // Enable loading animation
                    this.$store.commit('enableLoading');

                    /**
                     * This event will be caught by the parent component
                     * and used to trigger a function which loads more cells.
                     * @event triggerIntersected
                     * */
                    this.$emit("triggerIntersected");
                }

            }

        },

        mounted() {

            // Create an instance of Intersection Observer
            this.observer = new IntersectionObserver( entries => {
                this.handleIntersect(entries[0]);
            }, this.options);

            // Attach the observer to component
            this.observer.observe(this.$refs.trigger);

        },

        beforeDestroy() {
            // Stop watching for the component intersection before it gets destroyed
            this.observer.disconnect();
        }

    }

</script>