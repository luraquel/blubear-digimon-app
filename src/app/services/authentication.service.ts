import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}
  /**
   * Logs in a user with the provided email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves with the user's authentication information.
   */
  async login(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
  /**
   * Logs out the user by signing them out.
   * @returns A promise that resolves when the user is successfully signed out.
   */
  async logout() {
    return await this.auth.signOut();
  }
  /**
   * Registers a new user with the provided email, password, and display name.
   *
   * @param email - The email address of the user.
   * @param password - The password for the user.
   * @param displayName - The display name for the user.
   * @returns A Promise that resolves to the result of the registration.
   */
  async register(email: string, password: string, displayName: string) {
    const result = await this.auth.createUserWithEmailAndPassword(
      email,
      password,
    );
    if (result.user) {
      await this.updateUserProfile(result.user, { displayName });
      await this.sendVerificationEmail(result.user);
    }
    return result;
  }

  /**
   * Sends a password reset email to the specified email address.
   * @param email - The email address to send the password reset email to.
   * @returns A Promise that resolves when the password reset email is sent.
   */
  async resetPassword(email: string) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  /**
   * Retrieves the current user's authentication state.
   * @returns An Observable that emits the current user's authentication state.
   */
  getCurrentUser() {
    return this.auth.authState;
  }
  private async updateUserProfile(
    user: firebase.User,
    profile: { displayName?: string; photoURL?: string },
  ) {
    return user.updateProfile(profile);
  }
  private async sendVerificationEmail(user: firebase.User) {
    return user.sendEmailVerification();
  }
}
