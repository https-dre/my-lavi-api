import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/buildApp";
import { db } from "../../src/drizzle/conn";

let app: ReturnType<typeof buildApp>;

beforeAll(async () => {
  app = buildApp();
  await app.ready();
})

afterAll(async () => {
  await app.close();
  await db.execute("TRUNCATE laundry, owner RESTART IDENTITY CASCADE")
})

describe("GET /ping", () => {
  it('should return { pong: true }', async () => {
    const response = await request(app.server).get('/ping');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ pong: true })
  })
})