export declare class UserService {
    static createUser(userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<any>;
    static authenticateUser(email: string, password: string): Promise<any>;
    static getUserById(id: string): Promise<any>;
}
//# sourceMappingURL=UserService.d.ts.map