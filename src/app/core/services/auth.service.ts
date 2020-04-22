import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo, User } from 'firebase';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: UserInfo;

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  async login(credentials: Credentials): Promise<User> {
    return await this.fireAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(userCredentials => this.userData = userCredentials.user);
  }

  async register(credentials: Credentials): Promise<firebase.auth.UserCredential> {
    return await this.fireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  logout(): any {
    return this.fireAuth.signOut();
  }

  isLoggedIn(): boolean {
    return !!this.userData;
  }

  get user(): UserInfo {
    return this.userData;
  }
}
