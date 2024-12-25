import { Observable } from '@nativescript/core';

export class CityService {
    private static instance: CityService;
    private _selectedCity = 'New York';
    private _availableCities = [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Miami'
    ];

    private constructor() {}

    static getInstance(): CityService {
        if (!CityService.instance) {
            CityService.instance = new CityService();
        }
        return CityService.instance;
    }

    get selectedCity(): string {
        return this._selectedCity;
    }

    set selectedCity(value: string) {
        if (this._selectedCity !== value && this._availableCities.includes(value)) {
            this._selectedCity = value;
        }
    }

    get availableCities(): string[] {
        return this._availableCities;
    }
}