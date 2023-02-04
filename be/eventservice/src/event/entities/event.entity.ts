import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column({ default: 'undefined' })
  title: string;

  @Column('jsonb')
  hoster: { userId: string };

  @Column()
  location: string;

  @Column()
  imageurl: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('jsonb', { default: [] })
  participants: any;

  @Column('jsonb', { default: [] })
  announcements: any;

  @Column('jsonb', { default: [] })
  posts: any;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
