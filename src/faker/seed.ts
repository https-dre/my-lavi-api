// File: seed.ts
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker/locale/pt_BR";

// Importe seu schema do Drizzle
import * as schema from "../drizzle/tables";

dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("A variável de ambiente DATABASE_URL não foi definida.");
}

// --- FUNÇÕES AUXILIARES (mesmas de antes) ---
const createBlindIndex = (value: string) =>
  `bidx_${value.replace(/[^a-zA-Z0-9]/g, "")}`;
const generateCPF = () => faker.string.numeric(11);
const generateCNPJ = () => faker.string.numeric(14);

const main = async () => {
  const db = drizzle(process.env.DATABASE_URL!);

  console.log("🚀 Iniciando o processo de seed...");

  try {
    // 1. Limpar dados existentes (em ordem inversa de dependência)
    console.log("🗑️  Limpando tabelas existentes...");
    await db.delete(schema.laundry);
    await db.delete(schema.customer);
    await db.delete(schema.owner);
    console.log("✅ Tabelas limpas.");

    // 2. Gerar dados em memória
    console.log("📝 Gerando novos dados...");

    // Gerar 1 Owner (Dono)
    const ownerData = {
      id: faker.string.uuid() as string,
      name: faker.person.fullName(),
      cpf: generateCPF(),
      email: faker.internet.email().toLowerCase(),
      password: "password123", // Em produção, use um hash!
      birth_date: faker.date.birthdate().toISOString(),
      cep: faker.location.zipCode("#####-###"),
    };
    // Adiciona os campos de blind index
    const completeOwner = {
      ...ownerData,
      cpf_blind_index: createBlindIndex(ownerData.cpf),
      email_blind_index: createBlindIndex(ownerData.email),
    };

    // Gerar 1 Customer (Cliente)
    const customerData = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      is_pj: false,
      doc: generateCPF(),
      password: "password123", // Em produção, use um hash!
    };
    const completeCustomer = {
      ...customerData,
      doc_blind_index: createBlindIndex(customerData.doc),
      email_blind_index: createBlindIndex(customerData.email),
    };

    // Gerar 1 Laundry (Lavanderia)
    const laundryData = {
      id: faker.string.uuid(),
      name: `Lavanderia ${faker.company.name()}`,
      cnpj: generateCNPJ(),
      ownerId: completeOwner.id, // Chave estrangeira
    };
    const completeLaundry = {
      ...laundryData,
      cnpj_blind_index: createBlindIndex(laundryData.cnpj),
    };

    console.log("✅ Dados gerados.");

    // 3. Inserir os novos dados no banco de dados
    console.log("📥 Inserindo dados no banco de dados...");
    await db.insert(schema.owner).values(completeOwner);
    await db.insert(schema.customer).values(completeCustomer);
    await db.insert(schema.laundry).values(completeLaundry);
    console.log("✅ Dados inseridos com sucesso.");

    console.log("\n🎉 Processo de seed concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante o processo de seed:", error);
    process.exit(1);
  } finally {
    // 4. Fechar a conexão com o banco
    console.log("🔌 Conexão com o banco de dados fechada.");
  }
};

main();
