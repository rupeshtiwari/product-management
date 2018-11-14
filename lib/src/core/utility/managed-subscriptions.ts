import { Subscription } from 'rxjs/Subscription';

import * as utility from './utility';

export function managedSubscriptions() {
    return new ManageSubscriptions();
}

export class ManageSubscriptions {
    allSubscriptions = [];

    get length() {
        return this.allSubscriptions.length;
    }

    push(subscription: Subscription): void {
        this.allSubscriptions.push(subscription);
    }

    addRange(...subscriptions: Subscription[]): void {
        subscriptions.forEach((s) => this.allSubscriptions.push(s));
    }

    clear(): void {
        this.allSubscriptions
            .filter(s => !utility.isEmpty(s))
            .forEach(s => s.unsubscribe());
        this.allSubscriptions = [];
    }
}
