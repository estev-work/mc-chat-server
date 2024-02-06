import { v4 as uuid } from 'uuid';

export class User {
    public readonly id: string = uuid();

    private constructor() {
        console.log('User instance create');
    }

    public static create(user: Partial<User>) {
        const _user = new User();
        return Object.assign(_user, user);
    }
}
