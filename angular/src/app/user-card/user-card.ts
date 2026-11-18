import { Component, input, output } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
      <p>{{ user().address.city }}</p>
      <button (click)="toggled.emit(user().id)">
        {{ favorite() ? '★ Quitar favorito' : '☆ Favorito' }}
      </button>
    </div>
  `,
  styles: `.card{border:1px solid #ccc;border-radius:8px;padding:12px;margin:8px 0}`,
})
export class UserCard {
  user = input.required<User>();
  favorite = input(false);
  toggled = output<number>();
}
