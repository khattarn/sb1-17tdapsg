import { NavigatedData, Page, Observable, alert } from '@nativescript/core';
import { AuthService } from './services/auth.service';
import { Navigator } from './navigation/navigator';

class AdminDashboardViewModel extends Observable {
    private authService: AuthService;
    private _users: any[];

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this._users = this.authService.debugViewUsers();
        this.refresh();
    }

    get users() {
        return this._users;
    }

    refresh() {
        this._users = this.authService.debugViewUsers();
        this.notifyPropertyChange('users', this.users);
    }

    onDeleteUserTap(args: any) {
        const user = this.users[args.index];
        alert({
            title: "Confirm Delete",
            message: `Are you sure you want to delete user ${user.name} ${user.surname}?`,
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result) {
                try {
                    this.authService.deleteUser(user.id);
                    this.refresh();
                } catch (error) {
                    alert({
                        title: "Error",
                        message: error.message,
                        okButtonText: "OK"
                    });
                }
            }
        });
    }

    onLogoutTap() {
        this.authService.logout();
        Navigator.navigate('home-page', { clearHistory: true });
    }
    
    onHomeTap() {
        Navigator.navigate('home-page', { clearHistory: true });
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new AdminDashboardViewModel();
}