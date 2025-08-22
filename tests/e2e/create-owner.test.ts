import { describe, it, beforeAll, afterAll, afterEach, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/buildApp";
import { db } from "../../src/drizzle/conn";
import { except } from "drizzle-orm/gel-core";

let app: ReturnType<typeof buildApp>;

// Hooks para todo o arquivo
beforeAll(async () => {
  app = buildApp();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

const new_user_data = {
  name: "André Dias",
  email: "diaso.andre@test.com",
  password: "123456789",
  cpf: "12345678902",
  cep: "12345678",
  birth_date: "2007-05-02",
};

describe("Onwer Life Cicle (/owners)", async () => {
  await db.execute("TRUNCATE owner CASCADE");
  afterEach(async () => {
    await db.execute("TRUNCATE owner CASCADE");
  });
  it("must create a new owner", async () => {
    const response = await request(app.server)
      .post("/owners")
      .send({ owner: new_user_data });

    expect(response.status).toBe(201);
    expect(response.body.owner_id).toBeDefined();
  });

  it("must authenticate a owner", async () => {
    await request(app.server).post("/owners").send({ owner: new_user_data });
    const response = await request(app.server).put("/owners/auth").send({
      email: new_user_data.email,
      password: new_user_data.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.owner_id).toBeDefined();
  });

  it("must return owner data", async () => {
    const createResponse = await request(app.server)
      .post("/owners")
      .send({ owner: new_user_data });
    console.log(
      "Resposta recebida da API:",
      JSON.stringify(createResponse.body, null, 2)
    );

    expect(createResponse.status).toBe(201);
    const ownerId = createResponse.body.owner_id;

    const response = await request(app.server).get(`/owners/${ownerId}`);
    expect(response.status).toBe(200);
    expect(response.body.owner.id).toBe(ownerId);
  });
});
