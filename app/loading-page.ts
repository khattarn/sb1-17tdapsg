import { NavigatedData, Page } from '@nativescript/core';
import { Navigator } from './navigation/navigator';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    setTimeout(() => {
        Navigator.navigate('home-page', { clearHistory: true });
    }, 2000);
}