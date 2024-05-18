export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        MainButton: {
          isVisible: boolean;
          hide: () => void;
          show: () => void;
          setParams: ({ text: string }) => void;
        };
        close: () => void;
        initDataUnsafe?: {
          user: unknown;
          query_id: unknown;
        };
        ready: () => void;
        sendData: (str: string) => void;
        onEvent: (actionName: string, onSendData: unknown) => void;
        offEvent: (actionName: string, onSendData: unknown) => void;
      };
    };
  }
}
