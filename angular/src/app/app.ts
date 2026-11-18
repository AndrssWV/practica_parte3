import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { User } from './user.model';
import { UserCard } from './user-card/user-card';
import { filterUsers } from './filter-users';

@Component({
  selector: 'app-root',
  imports: [FormsModule, UserCard],
  template: `
    <h1>Usuarios</h1>
    <input [(ngModel)]="query" placeholder="Buscar por nombre..." />
    <p>Favoritos: {{ favorites().length }}</p>

    @if (loading()) {
      <p>Cargando…</p>
    } @else if (error()) {
      <p style="color:red">{{ error() }}</p>
      <button (click)="load()">Reintentar</button>
    } @else {
      @for (u of filtered(); track u.id) {
        <app-user-card
          [user]="u"
          [favorite]="favorites().includes(u.id)"
          (toggled)="toggleFavorite($event)" />
      } @empty {
        <p>Sin resultados</p>
      }
    }
  `,
})
export class App {
  private http = inject(HttpClient);
  users = signal<User[]>([]);
  query = signal('');
  favorites = signal<number[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  filtered = computed(() => filterUsers(this.users(), this.query()));

  constructor() {
    this.load();
  }

  async load() {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.users.set(
        await firstValueFrom(
          this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        )
      );
    } catch {
      this.error.set('No se pudo cargar los usuarios.');
    } finally {
      this.loading.set(false);
    }
  }

  toggleFavorite(id: number) {
    this.favorites.update(f => (f.includes(id) ? f.filter(x => x !== id) : [...f, id]));
  }
}
