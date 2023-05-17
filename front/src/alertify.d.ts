declare module "alertifyjs" {
  export interface AlertifyStatic {
    success(message: string): void;
    error(message: string): void;
  }

  const alertify: AlertifyStatic;
  export default alertify;
}
