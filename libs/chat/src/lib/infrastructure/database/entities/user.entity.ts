import { BaseEntity } from '../base/base.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column()
    email!: string;
    @Column()
    phone!: string;
    @Column()
    login!: string;
    @Column({ collation: '' })
    firstName!: string;
    @Column()
    lastName!: string;
    @CreateDateColumn()
    createdAt!: string;
    @UpdateDateColumn()
    updatedAt?: string;
}
