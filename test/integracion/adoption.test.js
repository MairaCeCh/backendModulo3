import supertest from "supertest";
import { expect } from "chai";
const request = supertest("http://localhost:8080");

describe("Testing de adoption", () => {
  describe("Testing del Router de adoptions", () => {
    it("Endpoint GET /api/adoptions debe traer todas las adopciones", async () => {
      const { status, body } = await request.get("/api/adoptions");
      expect(status).to.equal(200);
      expect(body).to.be.an("array");
    });

    it("Debe traer una adopción por id", async () => {
      let idAdoption = "67e9b54c8a23833836344e72";
      const { status, body } = await request.get(
        `/api/adoptions/${idAdoption}`
      );
      expect(status).to.equal(200);
      expect(body).to.have.property("_id").that.equals(idAdoption);
    });

    it("Debe devolver un error 404 si la adopción no existe", async () => {
      const nonexistentId = "6634e3bb34d1f23b6aa00000"; // ID con formato válido pero inexistente

      const response = await request.get(`/api/adoptions/${nonexistentId}`);

      expect(response.status).to.equal(404);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property(
        "message",
        "Adopción no encontrada"
      );
    });
 //// si la mascota ya fue adoptada, no se puede adoptar de nuevo y genera un error 
    it("Debe crear una adopción", async () => {
      const data = {
        owner: "67eb18a4dc274987bfb69e24",
        pet: "6802d7a9b2f065c3cd950077",
      };

      const owner = data.owner;
      const pet = data.pet;

      const { status, body } = await request.post("/api/adoptions").send(data);
      console.log("🚀 ~ it ~ status:", status);
      console.log("🚀 ~ it ~ body:", body);

      expect(status).to.equal(201);
      expect(body).to.have.property("_id"); // o cualquier otra propiedad que devuelva tu servicio
      expect(body).to.have.property("owner", owner);
      expect(body).to.have.property("pet", pet);
      console.log("🚀 ~ it ~ body:", body);
    });

    it("Debe devolver un error si la mascota ya fue adoptada", async () => {
      const data = {
        owner: "67c9df801cc807987f106968",
        pet: "67c9df801cc807987f10699d",
      };

      await request.post("/api/adoptions").send(data);

      const { status, body } = await request.post("/api/adoptions").send(data);

      expect(status).to.equal(404);
      expect(body)
        .to.have.property("message")
        .that.equals("Mascota no encontrada");
      console.log("🚀 ~ it ~ body:", body);
    });
  });
});
