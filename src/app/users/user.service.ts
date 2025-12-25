import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/userprofile';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly baseUrl = '/api/users';

    constructor(private readonly http: HttpClient) { }

    getUsers(): Observable<UserProfile[]> {
        return this.http.get<UserProfile[]>(this.baseUrl);
    }

    upsertUser(profile: UserProfile): Observable<UserProfile> {
        return this.http.put<UserProfile>(`${this.baseUrl}/${profile.id}`, profile);
    }

    deactivateUser(userId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${userId}`);
    }
}
