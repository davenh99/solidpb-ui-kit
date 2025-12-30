export declare function debounce<F extends (...args: any[]) => void>(fn: F, ms?: number): (...args: Parameters<F>) => void;
