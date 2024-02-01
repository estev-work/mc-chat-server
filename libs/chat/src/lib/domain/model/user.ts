import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export class User {
    public readonly id: string = randomStringGenerator();

    private constructor() {}

    public static create(user: Partial<User>) {
        const _user = new User();
        return Object.assign(_user, user);
    }
}
