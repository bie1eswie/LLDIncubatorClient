export class ResetPassword {
   newPassword: string;
   email: string;
   confirmPassword: string;

   constructor(email: string,
        password: string,confirm: string){
          this.email = email;
          this.newPassword = password;
          this.confirmPassword = confirm;
        }
}
