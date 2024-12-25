import { Observable, ApplicationSettings } from '@nativescript/core';

interface User {
    id: string;
    name: string;
    surname: string;
    phone: string;
    email?: string;
    isAdmin?: boolean;
}

export class AuthService extends Observable {
    private static instance: AuthService;
    private _isLoggedIn = false;
    private _currentUser: User | null = null;
    private _users: User[] = [];
    private readonly ADMIN_PHONE = '0000000000';
    private _otpStore: { [phone: string]: string } = {};

    private constructor() {
        super();
        this._loadUsers();
        this._ensureAdminExists();
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private _ensureAdminExists(): void {
        if (!this._users.some(user => user.isAdmin)) {
            this._users.push({
                id: 'admin',
                name: 'Admin',
                surname: 'User',
                phone: this.ADMIN_PHONE,
                email: 'admin@chefstable.com',
                isAdmin: true
            });
            this._saveUsers();
        }
    }

    get isAdmin(): boolean {
        return !!this._currentUser?.isAdmin;
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    set isLoggedIn(value: boolean) {
        if (this._isLoggedIn !== value) {
            this._isLoggedIn = value;
            this.notifyPropertyChange('isLoggedIn', value);
        }
    }

    get currentUser(): User | null {
        return this._currentUser;
    }

    private _loadUsers(): void {
        const usersJson = ApplicationSettings.getString('users', '[]');
        this._users = JSON.parse(usersJson);
    }

    private _saveUsers(): void {
        ApplicationSettings.setString('users', JSON.stringify(this._users));
    }
    
    generateOTP(phone: string): string {
        const user = this._users.find(u => u.phone === phone);
        if (!user) {
            throw new Error('Phone number not registered');
        }
        
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this._otpStore[phone] = otp;
        
        // OTP expires after 5 minutes
        setTimeout(() => {
            delete this._otpStore[phone];
        }, 5 * 60 * 1000);
        
        return otp;
    }
    
    verifyOTP(phone: string, otp: string): boolean {
        if (this._otpStore[phone] === otp) {
            delete this._otpStore[phone];
            const user = this._users.find(u => u.phone === phone);
            if (user) {
                this._currentUser = user;
                this.isLoggedIn = true;
                return true;
            }
        }
        throw new Error('Invalid OTP');
    }

    registerUser(userData: Omit<User, 'id'>): void {
        const existingUser = this._users.find(user => user.phone === userData.phone);
        if (existingUser) {
            throw new Error('Phone number already registered');
        }

        const newUser: User = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9)
        };

        this._users.push(newUser);
        this._saveUsers();
        this._currentUser = newUser;
        this.isLoggedIn = true;
    }

    logout(): void {
        this._currentUser = null;
        this.isLoggedIn = false;
    }

    // Debug method to view stored users
    debugViewUsers(): User[] {
        this._loadUsers();
        return this._users;
    }

    deleteUser(userId: string): void {
        if (!this.isAdmin) {
            throw new Error('Unauthorized: Admin access required');
        }
        if (userId === 'admin') {
            throw new Error('Cannot delete admin user');
        }
        this._users = this._users.filter(user => user.id !== userId);
        this._saveUsers();
    }
}