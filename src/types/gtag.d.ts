export {};

declare global {
  interface Window {
    gtag: Gtag.Gtag;
    dataLayer: any[];
  }
}

declare namespace Gtag {
  type Gtag = (
    command: "config" | "set" | "event",
    targetId: string,
    config?: ControlParams | EventParams | ConfigParams
  ) => void;

  interface ControlParams {
    groups?: string;
  }

  interface ConfigParams {
    page_title?: string;
    page_path?: string;
    page_location?: string;
    send_page_view?: boolean;
    [key: string]: any;
  }

  interface EventParams {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
}
