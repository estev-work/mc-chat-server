import { BaseEntity } from '../base/base.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('messages')
export class MessageEntity extends BaseEntity {
    @Column()
    chatRoomId!: string;
    @Column()
    text!: string;
    @CreateDateColumn()
    createdAt!: string;
    @UpdateDateColumn()
    updatedAt?: string;
}
