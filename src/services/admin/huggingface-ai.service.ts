import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HuggingfaceAiService {
  private apiUrl =
    'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1';
  private apiToken = 'YOUR_HUGGINGFACE_API_TOKEN'; // Replace with your actual Hugging Face API token

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    });

    const body = {
      inputs: `User: ${question}\nAI:`,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
