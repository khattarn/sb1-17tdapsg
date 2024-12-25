import { Frame } from '@nativescript/core';

export class Navigator {
    static navigate(to: string, options: { clearHistory?: boolean } = {}) {
        const frame = Frame.topmost();
        if (!frame) {
            console.error('Navigation failed: No frame found');
            return;
        }

        frame.navigate({
            moduleName: to,
            clearHistory: options.clearHistory ?? false,
            animated: true
        });
    }
}