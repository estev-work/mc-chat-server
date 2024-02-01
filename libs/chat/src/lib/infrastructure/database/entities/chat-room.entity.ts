import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('chat_rooms')
export class ChatRoomEntity extends BaseEntity {
    @Column()
    name!: string;
    @Column()
    type!: number;
    @CreateDateColumn()
    createdAt!: string;
    @UpdateDateColumn()
    updatedAt?: string;
}
