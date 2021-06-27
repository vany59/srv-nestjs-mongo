import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid'

@Entity()
export class UploadEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  originalname: string

  @Column()
  name: string

  @Column()
  mime: string

  @Column()
  size: number

  @Column()
  createdAt: string;

  constructor(props: Partial<UploadEntity>) {
    Object.assign(this, props)
    this.id = this.id || v4()
    this.createdAt = this.createdAt || (+new Date()).toString()
  }
}