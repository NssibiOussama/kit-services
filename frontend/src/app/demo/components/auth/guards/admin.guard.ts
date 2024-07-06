import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      const roles = await this.getRolesFromSessionStorage();
      const isAdmin = roles.includes("ADMIN");

      if (!isAdmin) {
        this.router.navigate(["home"]);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error while getting roles:", error);
      this.router.navigate(["home"]);
      return false;
    }
  }

  private getRolesFromSessionStorage(): Promise<string> {
    return new Promise((resolve, reject) => {
      const roles = sessionStorage.getItem("roles") || "";
      if (roles) {
        resolve(roles);
      } else {
        reject("Roles not found in sessionStorage");
      }
    });
  }
}
