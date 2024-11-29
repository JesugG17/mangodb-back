import 'dotenv/config';
import { get } from 'env-var';

export const ENV = {
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_USERNAME: get('DB_USERNAME').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),
  SECRET_KEY: get('SECRET_KEY').required().asString()
};