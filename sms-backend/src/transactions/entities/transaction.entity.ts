import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TransactionStatus {
  Delivered = 'Delivered',
  Pending = 'Pending',
  Failed = 'Failed',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column('text')
  message: string;

  @Column({ type: 'varchar', length: 100 })
  sender: string;

  @Column('datetime')
  timestamp: Date;

  @Column({
    type: 'varchar',
    default: TransactionStatus.Pending,
  })
  status: TransactionStatus;

  @Column('float', { nullable: true })
  cost: number;
}
