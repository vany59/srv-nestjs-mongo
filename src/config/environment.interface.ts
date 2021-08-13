export interface EnvironmentKeys {
  PORT: number;
  PREFIX: string;
  HOST: string;
  NAME: string;
  SCOPE: string;

  ACCESS_EXP: number;
  REFRESH_EXP: number;
  PASSWORD_HASH_SALT: number;
  TOKEN_ENCRYPT_SECRET: string;
  AUTH_TYPE: string;

  DB_HOST: string;
  DB_USER: string;
  DB_PORT: number;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  UPLOAD_BUCKET_NAME: string;
  MAX_IMAGE_SIZE: number;
  MAX_VIDEO_SIZE: number;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASS: string;
  CACHE_TTL: number;

  ROOT_USER: string;
  ROOT_PASSWORD: string;
}
