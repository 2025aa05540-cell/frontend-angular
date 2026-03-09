import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="logo">🏢</span>
        <span class="brand-name">EmployeeHub</span>
      </div>
      <span class="tagline">CRUD Project</span>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo { font-size: 24px; }
    .brand-name {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .tagline {
      font-size: 13px;
      opacity: 0.8;
    }
  `]
})
export class AppComponent {}
