import Vue from 'vue';
import axios from 'axios';

// Add axios as the main http lib
Vue.prototype.$http = axios;

// Add $utils to the Vue prototype with all the utility functions
Vue.prototype.$utils = {
    /**
     * Check if an Object is empty
     * @param {Object} obj
     * @returns {Boolean}
     */
    isEmptyObject: (obj) => {
        let name;
        // noinspection LoopStatementThatDoesntLoopJS
        for (name in obj)
            return false;
        return true;
    },
    /**
     * Show snackbar specific for error messages
     * @param {String} errorMessage
     */
    alertError: (errorMessage) => Vue.prototype.$utils.snackbar({ message: errorMessage ? errorMessage : 'Unkown error', type: 'is-danger' }),
    /**
     * Show a buefy snackbar with my own default values | [buefy-snackbar](https://buefy.github.io/documentation/snackbar)
     * @param {Object} options - The snackbar options
     * @param {String} options.message - Message text
     * @param {'is-white' | 'is-black' | 'is-light' | 'is-dark' | 'is-primary' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger'} options.type - Type (color) of the action button. Please notice that it is the name of the parent class also
     * @param {'is-top-right' | 'is-top' | 'is-top-left' | 'is-bottom-right' | 'is-bottom' | 'is-bottom-left'} [options.position='is-top-right'] - Which position the snackbar will appear
     * @param {Number} [options.duration=5000] - Visibility duration in miliseconds
     * @param {String} [options.container] - DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed.
     * @param {String|null} [options.actionText='✘'] - Snackbar's button text
     * @param {Boolean} [options.queue=false] - If should queue with others notices (snackbar/toast)
     * @param {Boolean} [options.indefinite=false] - Show the Snackbar indefinitely until it is dismissed
     * @param {Function|null} [options.onAction] - Callback function when the button is clicked
     */
    snackbar: (options) => {
        Vue.prototype.$snackbar.open({
            message: options.message,
            type: options.type,
            position: options.position || 'is-top-right',
            duration: options.duration || 5000,
            container: options.container,
            actionText: options.actionText || '✘',
            queue: options.queue || false,
            indefinite: options.indefinite || false,
            onAction: options.onAction
        });
    },
    /**
     * An async forEach function
     * @param {Iterable} array - Array to loop over
     * @param {Function} callback - Async callback which returns the value, key and original array
     */
    foreachAsync: async (array, callback) => {
        for (let index = 0; index < array.length; index++)
            await callback(array[index], index, array)
    },
    /**
     * Sleep x milliseconds
     * @param {Number} ms - Milliseconds to wait for
     * @return {Promise<void>}
     */
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    /**
     * Show alert
     */
    notAvailable: () => {
        Vue.prototype.$dialog.alert({
            title: 'Not available',
            message: 'This function is currently not available, check back later.',
            hasIcon: true,
            icon: 'info-circle',
            iconPack: 'fa'
        });
    }
};
