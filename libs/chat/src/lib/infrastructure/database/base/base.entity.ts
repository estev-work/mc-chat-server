import { PrimaryColumn } from 'typeorm';

export class BaseEntity {
    @PrimaryColumn('uuid', { name: 'id', type: 'uuid', nullable: false })
    id!: string;
}
