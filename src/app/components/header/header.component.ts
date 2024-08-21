import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService, ProductService } from '@services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn!: Observable<boolean>;

  constructor(private auth: AuthService, public product: ProductService, private router: Router) {
    this.isLoggedIn = auth.isLoggedIn$;
  }

  async logout() {
    await this.auth.logUserOut();
    await this.router.navigate(['/', 'auth', 'login']);
  }

  searchProducts(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.router.navigate(['/', 'home'], { queryParams: { search: searchValue || null } });
  }
}
