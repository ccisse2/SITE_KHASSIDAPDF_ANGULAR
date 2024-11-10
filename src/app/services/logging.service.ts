import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logServerUrl = 'https://votre-api-de-logs.com/logs';

  constructor(private http: HttpClient) {}

  log(message: string): void {
    this.sendLogToServer('log', message);
  }

  error(message: string): void {
    console.error(`ERROR: ${new Date().toISOString()} - ${message}`);
    this.sendLogToServer('error', message);
  }

  private sendLogToServer(level: string, message: string): void {
    const logPayload = {
      timestamp: new Date().toISOString(),
      level,
      message
    };
    this.http.post(this.logServerUrl, logPayload).subscribe();
  }
}
