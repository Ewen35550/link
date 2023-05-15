import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

config({ path: 'encrypt-db.env' });

@Entity('inspirations')
export class Inspiration {
  @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    transformer: new EncryptionTransformer({
      key: process.env.INSPIRATION_NAME_ENCRYPTION_KEY,
      algorithm: process.env.ENCRYPTION_ALGORITHM,
      ivLength: +process.env.ENCRYPTION_IV_LENGTH,
      iv: process.env.INSPIRATION_NAME_ENCRYPTION_IV,
    }),
  })
  name: string;

  //====================================================
  // Relations
  //====================================================

  //+++++++++++++++
  // Many To One
  //+++++++++++++++
  @ManyToOne(() => User, (user) => user.inspirations, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  //+++++++++++++++
  // One To One
  //+++++++++++++++

  //+++++++++++++++
  // One To Many
  //+++++++++++++++
}
