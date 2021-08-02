import { BaseEntity } from '@utils/dto';
import { Expose } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class ClientEntity extends BaseEntity {
  @Column()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  grants: string[];

  @Column()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  scopes: string[];

  @Column()
  @IsArray()
  @IsString({ each: true })
  @Expose()
  redirectUris: string[];

  @Column()
  @IsNumber()
  @Expose()
  accessTokenLifeTime: number;

  @Column()
  @IsNumber()
  @Expose()
  refreshtokenLifeTime: number;

  @Column()
  @IsString()
  @Expose()
  clientId: string;

  @Column()
  @IsString()
  @Expose()
  company: string;

  constructor(props: Partial<ClientEntity>) {
    super(props);
    Object.assign(this, props);
  }
}
