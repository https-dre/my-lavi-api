// tests/setup.ts
import { config } from 'dotenv';
import path from 'path';

// Como os testes rodam com NODE_ENV=test, carregamos o .env mas
// nosso código de conexão vai priorizar a DATABASE_URL_TEST
config({ path: path.resolve(process.cwd(), '.env') });