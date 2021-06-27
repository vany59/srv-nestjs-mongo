import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid'

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: string;

  constructor(props: Partial<UserEntity>){
    Object.assign(this, props)
    this.id = this.id || v4()
    this.isActive = this.isActive || true
    this.createdAt = this.createdAt || (+new Date()).toString()
  }
}