import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config'
import { EnvironmentKeys } from './environment.interface'
import { ConfigurationService } from './config.service'

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  envFilePath:'.env',
  load: [
    (): EnvironmentKeys => {
      if (process.env.PASSOWRD_HASH_SALT && isNaN(parseInt(process.env.PASSWORD_HASH_SALT))) {
        console.error('PASSWORD_HASH_SALT must be a number or leave it as default')
        process.exit(1)
      }
      return {
        PORT: parseInt(process.env.PORT) || 8080,
        PASSWORD_HASH_SALT: parseInt(process.env.PASSWORD_HASH_SALT) || 11,
        TOKEN_ENCRYPT_SECRET: process.env.TOKEN_ENCRYPT_SECRET || 's3cr3t!@#',
        MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
        MYSQL_USER: process.env.MYSQL_USER || 'root',
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '123456',
        MYSQL_PORT: parseInt(process.env.MYSQL_PORT) || 3306,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'filemanager',
        UPLOAD_DEST: process.env.UPLOAD_DEST || 'uploads'
      }
    }
  ]
})

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export default class ConfigurationModule { }
