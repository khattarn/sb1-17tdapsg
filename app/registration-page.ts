import { NavigatedData, Page, Observable, alert, Frame } from '@nativescript/core';
import { AuthService } from './services/auth.service';
import { Navigator } from './navigation/navigator';
import { BaseFormModel } from './shared/base-form.model';

class RegistrationViewModel extends BaseFormModel {
    private _name = '';
    private _surname = '';
    private _email = '';  
    private _phone = '';
    private _birthday = new Date();
    private _anniversary = new Date();
    private _showAnniversary = false;
    private _favoriteDish = '';
    private _wishlist = '';
    private _selectedRestaurantIndex = 0;
    private _selectedCuisineIndex = 0;
    
    private _restaurants = ['Bercos', 'Café Delhi Heights', 'Pizza hut'];
    private _cuisines = ['Chinese', 'Indian', 'Multicuisine', 'Mexican'];

    constructor() {
        super();
    }
    
    get name() { return this._name; }
    set name(value) {
        this.setField('name', value, '_name');
    }
    
    get surname() { return this._surname; }
    set surname(value) {
        this.setField('surname', value, '_surname');
    }
    
    get email() { return this._email; }
    set email(value) {
        this.setField('email', value, '_email');
    }
    
    get phone() { return this._phone; }
    set phone(value) {
        this.setField('phone', value, '_phone');
    }
    
    get birthday() { return this._birthday; }
    set birthday(value) {
        this.setField('birthday', value, '_birthday');
    }
    
    get anniversary() { return this._anniversary; }
    set anniversary(value) {
        this.setField('anniversary', value, '_anniversary');
    }

    get showAnniversary() { return this._showAnniversary; }
    set showAnniversary(value) {
        this.setField('showAnniversary', value, '_showAnniversary');
    }
    
    get favoriteDish() { return this._favoriteDish; }
    set favoriteDish(value) {
        this.setField('favoriteDish', value, '_favoriteDish');
    }
    
    get wishlist() { return this._wishlist; }
    set wishlist(value) {
        this.setField('wishlist', value, '_wishlist');
    }
    
    get restaurants() { return this._restaurants; }
    get cuisines() { return this._cuisines; }
    
    get selectedRestaurantIndex() { return this._selectedRestaurantIndex; }
    set selectedRestaurantIndex(value) {
        this.setField('selectedRestaurantIndex', value, '_selectedRestaurantIndex');
    }
    
    get selectedCuisineIndex() { return this._selectedCuisineIndex; }
    set selectedCuisineIndex(value) {
        this.setField('selectedCuisineIndex', value, '_selectedCuisineIndex');
    }

    onRegisterTap() {
        try {
            if (!this.validateRequired(
            {
                name: this._name,
                surname: this._surname,
                phone: this._phone,
                email: this._email
            },
            ['name', 'surname', 'phone', 'email']
            )) {
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this._email)) {
                alert({
                    title: "Invalid Email",
                    message: "Please enter a valid email address",
                    okButtonText: "OK"
                });
                return;
            }

            // Validate phone number
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(this._phone)) {
                alert({
                    title: "Invalid Phone Number",
                    message: "Please enter a valid 10-digit phone number",
                    okButtonText: "OK"
                });
                return;
            }

            // Create guest user with auto-generated password
            const password = Math.random().toString(36).substr(2, 8);
            
            // Show password to user
            alert({
                title: "Your Login Credentials",
                message: `Email: ${this._email}\nPassword: ${password}\n\nPlease save these credentials for future login.`,
                okButtonText: "I've Saved It"
            });

            AuthService.getInstance().registerUser({
                name: this._name,
                surname: this._surname,
                email: this._email,
                password: password,
                phone: this._phone,
                birthday: {
                    day: this._birthday.getDate(),
                    month: this._birthday.getMonth() + 1
                },
                anniversary: {
                    day: this._anniversary.getDate(),
                    month: this._anniversary.getMonth() + 1
                },
                favoriteRestaurant: this._restaurants[this._selectedRestaurantIndex],
                favoriteCuisine: this._cuisines[this._selectedCuisineIndex],
                favoriteDish: this._favoriteDish,
                wishlist: this._wishlist
            });

            alert({
                title: "Success",
                message: "Thank you for registering! Welcome to Chef's Table!",
                okButtonText: "OK"
            }).then(() => {
                Navigator.navigate('home-page', { clearHistory: true });
            });
            
        } catch (error) {
            alert({
                title: "Registration Failed",
                message: error.message,
                okButtonText: "OK"
            });
        }
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new RegistrationViewModel();
}