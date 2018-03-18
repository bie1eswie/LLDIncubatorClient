import { UserRoleView } from '../../utilities/userRoleView';
import { Role } from '../../utilities/role';

export class User {
    Username: string;
    Password: string;
    RememberMe: boolean;
    id: number;
    userRoleViews: UserRoleView[];
    role: number;

    constructor(username: string,
        password: string) {
        this.Username = username;
        this.Password = password;
        this.RememberMe = false;
    }
}
