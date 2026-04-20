import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  FOURNISSEUR = 'fournisseur',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  // ⚠️ Correction : SQLite ne supporte pas enum → utiliser text
  @Column({ type: 'text', default: UserRole.CLIENT })
  role!: UserRole;
}
