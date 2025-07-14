import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatAiService {
  private apiUrl =
    'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1';
  private apiKey = '';

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for Shipping System queries.',
        },
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
