import { NavigatedData, Page, Observable, Frame, alert } from '@nativescript/core';
import { AuthService } from './services/auth.service';
import { Navigator } from './navigation/navigator';
import { BaseFormModel } from './shared/base-form.model';

class LoginViewModel extends BaseFormModel {
    private _phone = '';
    private _otp = '';
    private _showOtpInput = false;

    constructor() {
        super();
    }

    get phone() { return this._phone; }
    set phone(value) {
        this.setField('phone', value, '_phone');
    }

    get otp() { return this._otp; }
    set otp(value) {
        this.setField('otp', value, '_otp');
    }

    get showOtpInput() { return this._showOtpInput; }

    onRequestOTP() {
        try {
            if (!this.validateRequired({ phone: this._phone }, ['phone'])) {
                return;
            }

            // Validate phone number format
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(this._phone)) {
                alert({
                    title: "Invalid Phone Number",
                    message: "Please enter a valid 10-digit phone number",
                    okButtonText: "OK"
                });
                return;
            }

            const otp = AuthService.getInstance().generateOTP(this._phone);
            this._showOtpInput = true;
            this.notifyPropertyChange('showOtpInput', true);

            // In a real app, this would be sent via SMS
            alert({
                title: "OTP Sent",
                message: `Your OTP is: ${otp}`,
                okButtonText: "OK"
            });
        } catch (error) {
            alert({
                title: "Error",
                message: error.message,
                okButtonText: "OK"
            });
        }
    }

    onVerifyOTP() {
        try {
            if (!this.validateRequired({ otp: this._otp }, ['otp'])) {
                return;
            }

            const authService = AuthService.getInstance();
            authService.verifyOTP(this._phone, this._otp);

            if (authService.isAdmin) {
                Navigator.navigate('admin-dashboard', { clearHistory: true });
            } else {
                Navigator.navigate('home-page', { clearHistory: true });
            }
        } catch (error) {
            alert({
                title: "Verification Failed",
                message: error.message,
                okButtonText: "OK"
            });
        }
    }

    onRegisterTap() {
        Navigator.navigate('registration-page');
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new LoginViewModel();
}