import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'llm-app';
  prompt: string = '';
  response: string | null = null;

  constructor(private http: HttpClient) {}

  generateResponse() {
    const body = { prompt: this.prompt, model: 'mistral' };
    this.http.post<{ response: string }>('http://localhost:4000/generate', body)
      .subscribe({
        next : (res : any)=>{
          this.response = res.local_response
          console.log(res);
        },
        error : (error : any)=>{
          this.response = 'Error fetching response.'
        }
      }
      );
  }
}
