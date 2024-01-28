import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, filter, map, of, tap } from "rxjs";
import { AuthResponse } from "./auth-response.model";
import { HttpClient } from "@angular/common/http";
import { AuthRequest } from "./auth-request.model";
import { CookieService } from 'ngx-cookie-service';
import { User } from "../models/users";
import { Router } from "@angular/router";


/***********************************************************/
/*********!!! REPLACE BELOW WITH YOUR API URL !!! **********/
/***********************************************************/
/* const API_URL = "https://express-api-56k1.onrender.com";
 */
export const API_URL = "http://localhost:3000";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.#auth$ = new ReplaySubject(1);
    // Emit an undefined value on startup for now
    this.#auth$.next(undefined);
  }

  /**
   * @returns An `Observable` that will emit a `boolean` value
   * indicating whether the current user is authenticated.
   * This `Observable` will never complete and must be unsubscribed for when not needed.
   */
  isAuthenticated$(): Observable<boolean> {
    const isAuth = this.cookieService.check('auth');
    // Retourne un Observable de la valeur de l'authentification
    return of(isAuth);
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated `User` object only if there
   * currently is an authenticated user.
   */
  getUser$(): Observable<User | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated user's `token`, only if there
   * currently is an authenticated user.
   */
  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/auth/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest, { withCredentials: true }).pipe(
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`User ${auth.user.email} logged in`);
        return auth.user;
      })
    );
  }

  signUp$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/auth/signup`;
    return this.http.post<AuthResponse>(authUrl, authRequest, { withCredentials: true }).pipe(
      map((auth) => {
        this.router.navigateByUrl("/");
        window.location.reload();
        this.#auth$.next(auth);
        console.log(`User ${auth.user.email} logged in`);
        return auth.user;
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logOut(): Observable<void> {
    /* this.#auth$.next(undefined);
    console.log("User logged out"); */
    const logoutUrl = `${API_URL}/auth/logout`;
    return this.http.get<void>(logoutUrl, { withCredentials: true }).pipe(
      tap(() => {
        this.router.navigateByUrl("/login");
        window.location.reload();
      })
    );
  }
}