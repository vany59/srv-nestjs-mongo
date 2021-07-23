export interface EnvironmentKeys {
  PORT: number;
  PREFIX: string;
  HOST: string;
  NAME: string;

  ACCESS_EXP: number;
  REFRESH_EXP: number;
  PASSWORD_HASH_SALT: number;
  TOKEN_ENCRYPT_SECRET: string;

  DB_HOST: string;
  DB_USER: string;
  DB_PORT: number;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  UPLOAD_DEST: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASS: string;
  CACHE_TTL: number;

  ROOT_USER: string;
  ROOT_PASSWORD: string;
}
