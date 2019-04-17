import { Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue/types/options";

// Extend ComponentOptions with custom properties
export interface ExtendedOptions extends ComponentOptions<Vue> {
    [others: string]: any;
}
