export type Action =
  | {
      type: 'HOME';
    }
  | {
      type: 'TIME_START';
      interval: ReturnType<typeof setInterval>;
      time: number;
    }
  | {
      type: 'TIME_END';
    }
  | {
      type: 'TIME_UPDATE';
      time: number;
    };
