import Vue from "vue"

declare module "vue/types/vue" {
  interface IRequestParameters {
    url: string;
    method?: string;
    body?: any;
  }

  interface Vue {
    $request(obj: IRequestParameters): Promise<any>;
    $alert(msg: string): void;
    $bus: Vue;
  }
}