import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../environments/environment';


export abstract class UserService {
   abstract list(): Observable<User[]>;
   abstract create(user: User): Observable<void>;
   abstract delete(id: string): Observable<void>;
   abstract put(id: string, user: User): Observable<void>;
}

interface Request<T> {
  data: T;
}

export class ProdUserService implements UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<Request<User[]>>(`${environment.apiUrl}/users`).pipe(map(req => req.data));
  }
  create(user: User): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users`, user);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
  }
  put(id: string, user: User): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/users/${id}`, user);
  }

}

export class StubUserService implements UserService {

  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([
    { _id: '1', email: 'bob@example.com', password: 'bob' },
    { _id: '2', email: 'alice@example.com', password: 'alice' },
  ]);

  list(): Observable<User[]> {
    return this.users;
  }

  create(user: User): Observable<void> {
    const newUser: User = { _id: `${this.users.value.length + 1}`, ...user};
    this.users.next(this.users.value.concat(newUser));
    return of();
  }

  delete(id: string): Observable<void> {
    this.users.next(this.users.value.filter(user => user._id !== id));
    return of();
  }

  put(id: string, updatedUser: User): Observable<void> {
    this.users.next(this.users.value.filter(user => user._id !== id).concat(updatedUser));
    return of();
  }

}


export interface User {
  _id: string;
  email: string;
  password: string;
}
