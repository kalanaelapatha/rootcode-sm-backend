export class SMResponse<T> {
  constructor(
    public data?: T,
    public statusCode?: number,
    public success?: boolean,
    public errorMessage?: string,
    public errorDescription?: string,
  ) {}
}
