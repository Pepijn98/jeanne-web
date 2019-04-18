import Vue from "vue";
import { SnackbarConfig } from "buefy/types/components";

// Add $utils to the Vue prototype with all the utility functions
Vue.prototype.$utils = {
    isEmptyObject: (obj: Object): boolean => {
        let name = undefined;
        for (name in obj)
            return false;
        return true;
    },
    alertError: (errorMessage: string): void => Vue.prototype.$utils.snackbar({ message: errorMessage || "Unkown error", type: "is-danger" }),
    snackbar: (options: SnackbarConfig): void => {
        Vue.prototype.$snackbar.open({
            message: options.message,
            type: options.type,
            position: options.position || "is-top-right",
            duration: options.duration || 5000,
            container: options.container,
            actionText: options.actionText || "✘",
            queue: options.queue || false,
            indefinite: options.indefinite || false,
            onAction: options.onAction
        });
    },
    foreachAsync: async (array: ArrayLike<any>, cb: Function): Promise<void> => {
        for (let index = 0; index < array.length; index++) {
            await cb(array[index], index, array);
        }
    },
    sleep: (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms)),
    notAvailable: () => {
        Vue.prototype.$dialog.alert({
            title: "Not available",
            message: "This function is currently not available, check back later.",
            hasIcon: true,
            icon: "info-circle",
            iconPack: "fa"
        });
    },
    encode: (object: Object): string => {
        let string = "";
        for (const [key, value] of Object.entries(object)) {
            string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return string.substring(1);
    }
};
