import { Observable } from '@nativescript/core';

export class BaseFormModel extends Observable {
    protected setField<T>(field: keyof this, value: T, privateField: string) {
        if (this[privateField] !== value) {
            this[privateField] = value;
            this.notifyPropertyChange(field as string, value);
        }
    }

    protected validateRequired(fields: { [key: string]: any }, fieldNames: string[]): boolean {
        const missingFields = fieldNames.filter(field => !fields[field]);
        if (missingFields.length > 0) {
            const message = `Please enter ${missingFields.join(', ')}`;
            alert({
                title: "Error",
                message,
                okButtonText: "OK"
            });
            return false;
        }
        return true;
    }
}