import { NavigatedData, Page, Observable, Frame, alert } from '@nativescript/core';
import { AuthService } from './services/auth.service';
import { PreferencesService } from './services/preferences.service';
import { Navigator } from './navigation/navigator';

class ProfileViewModel extends Observable {
    private preferencesService: PreferencesService;

    constructor() {
        super();
        this.preferencesService = PreferencesService.getInstance();
    }

    onLogoutTap() {
        AuthService.getInstance().logout();
        Navigator.navigate('home-page', { clearHistory: true });
    }
    
    onHomeTap() {
        Navigator.navigate('home-page', { clearHistory: true });
    }

    onEditProfileTap() {
        Navigator.navigate('preferences-page');
    }

    onFavoritesTap() {
        alert("Favorites coming soon!");
    }

    onOrderHistoryTap() {
        alert("Order history coming soon!");
    }
    
    onViewUsersTap() {
        const users = AuthService.getInstance().debugViewUsers();
        alert({
            title: "Registered Users",
            message: JSON.stringify(users, null, 2),
            okButtonText: "OK"
        });
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new ProfileViewModel();
}