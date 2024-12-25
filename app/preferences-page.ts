import { NavigatedData, Page, Observable, alert } from '@nativescript/core';
import { PreferencesService, UserPreferences } from './services/preferences.service';
import { Navigator } from './navigation/navigator';

class PreferencesViewModel extends Observable {
    private _cuisines = ['Indian', 'Chinese', 'Thai', 'Japanese', 'Italian', 'Mexican', 'American'];
    private _spiceLevels = ['Mild', 'Medium', 'Hot', 'Extra Hot'];
    private _dietaryRestrictions = [
        { id: 'vegetarian', label: 'Vegetarian', selected: false },
        { id: 'vegan', label: 'Vegan', selected: false },
        { id: 'gluten-free', label: 'Gluten-Free', selected: false },
        { id: 'dairy-free', label: 'Dairy-Free', selected: false }
    ];
    private _preferences: UserPreferences;

    constructor() {
        super();
        this._preferences = PreferencesService.getInstance().preferences;
        this._initializeDietaryRestrictions();
    }

    get cuisines() { return this._cuisines; }
    get spiceLevels() { return this._spiceLevels; }
    get dietaryRestrictions() { return this._dietaryRestrictions; }
    get preferences() { return this._preferences; }

    private _initializeDietaryRestrictions() {
        const savedRestrictions = this._preferences.dietaryRestrictions || [];
        this._dietaryRestrictions.forEach(item => {
            item.selected = savedRestrictions.includes(item.id);
        });
    }

    onSaveTap() {
        const selectedRestrictions = this._dietaryRestrictions
            .filter(item => item.selected)
            .map(item => item.id);

        PreferencesService.getInstance().updatePreferences({
            ...this._preferences,
            dietaryRestrictions: selectedRestrictions
        });

        alert({
            title: "Success",
            message: "Your preferences have been saved!",
            okButtonText: "OK"
        }).then(() => {
            Navigator.navigate('profile-page');
        });
    }

    onRestrictionTap(args: any) {
        const restriction = this._dietaryRestrictions[args.index];
        restriction.selected = !restriction.selected;
        this.notifyPropertyChange('dietaryRestrictions', this._dietaryRestrictions);
    }
}