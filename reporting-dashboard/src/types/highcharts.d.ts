declare module 'highcharts/modules/map' {
  import Highcharts from 'highcharts';
  function module(H: typeof Highcharts): void;
  export default module;
}

declare module 'highcharts/highcharts-more' {
  import Highcharts from 'highcharts';
  function module(H: typeof Highcharts): void;
  export default module;
}

// Extend Highcharts point interface to include boxplot specific properties
declare module 'highcharts' {
  interface Point {
    high?: number;
    low?: number;
    median?: number;
    q1?: number;
    q3?: number;
    category?: string;
  }
} 