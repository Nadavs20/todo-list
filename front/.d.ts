declare module "@reduxjs/toolkit" {
  export interface PayloadAction<T> {
    type: string;
    payload?: T;
    error?: boolean;
    meta?: any;
  }
}
