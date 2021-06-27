export interface EnvironmentKeys {
  PORT: number;
  PREFIX: string;
  HOST: string;
  NAME: string;

  PASSWORD_HASH_SALT: number;
  TOKEN_ENCRYPT_SECRET: string;

  DB_HOST: string;
  DB_USER: string;
  DB_PORT: number;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  UPLOAD_DEST: string;
}
