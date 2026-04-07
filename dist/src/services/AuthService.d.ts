export declare class AuthService {
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    static generateToken(payload: object): string;
    static verifyToken(token: string): any;
}
//# sourceMappingURL=AuthService.d.ts.map