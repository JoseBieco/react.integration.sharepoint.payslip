// A file is required to be in the root of the /src directory by the TypeScript compiler
import axios, { AxiosInstance } from "axios";

export class Api {
  private user: string;
  private password: string;
  private baseUrl: string;
  public connection: AxiosInstance;

  constructor(user: string, password:string, url:string) {
    this.user = user;
    this.password = password;
    this.baseUrl = url;

    this.createBaseRequest();
  }

  private authHeader() {
    return {
      Accept: "application/json",
      'Authorization': `Basic ${btoa(`${this.user}:${this.password}`)}`
    };
  }

  private createBaseRequest(): void {
    this.connection = axios.create({
      baseURL: this.baseUrl,
      headers: this.authHeader(),
      withCredentials: true,
    });

    this.connection.interceptors.response.use((response) => {return response;});
  }
}
