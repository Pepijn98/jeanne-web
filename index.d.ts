import Vue from "vue";
import { AxiosStatic } from "axios";
import { SnackbarConfig } from "buefy/types/components";

declare module "*.vue" {
    import Vue from "vue";
    const _default: Vue;
    export default _default;
}

declare global {
    interface Window {
        /*
         * onNuxtReady - plugins/vue-typer.ts
         */
        onNuxtReady(cb: Function): void;
    }

    /*
     * setItems     - plugins/vue-typer.ts
     * removeItems  - plugins/global-utils.ts
     */
    interface Storage {
        /** Set multiple storage items */
        setItems(items: Object): void;
        /** Remove multiple storage items */
        removeItems(items: Array<string>): void;
    }
}

/*
 * $getResource - plugins/resource/index.ts
 * $http        - middleware/utils.ts
 * $utils       - middleware/utils.ts
 */
declare module "vue/types/vue" {
    interface Vue {
        /** Request resource data from the api */
        $getResource(method: string): Promise<any>
        $http: AxiosStatic;
        $sentry: any;
        $utils: {
            /** Check if an Object is empty */
            isEmptyObject(obj: Object): boolean;
            /** Show snackbar specific for error messages */
            alertError(errorMessage: string): void;
            /** Show a buefy snackbar with my own default values */
            snackbar(options: SnackbarConfig): void;
            /** An async forEach function */
            foreachAsync(array: ArrayLike<any>, cb: Function): Promise<void>;
            /** Sleep x milliseconds */
            sleep(ms: number): Promise<void>;
            /** Show "not available" alert */
            notAvailable(): void;
            /** Encode an object */
            encode(object: Object): string;
        }
    }
}
