import { BaseEntity } from '../base/base.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('members')
export class MemberEntity extends BaseEntity {
    @Column()
    chatRoomId!: string;
    @CreateDateColumn()
    createdAt!: string;
    @UpdateDateColumn()
    updatedAt?: string;
}
