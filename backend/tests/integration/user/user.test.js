const supertest = require("supertest");
const app = require("../../../app");
const { connectDB } = require("../../../config/db");
const { setupDB } = require("../utils/affixes");

const request = supertest(app)

const userData = {
  name: "Zell",
  email: "user@gmail.com",
  password: "password",
}

let token
const ednpoint = '/api/users/'
const authToken = `Bearer ${token}`

describe('User route >> /api/users/', () => {
  // Connects to test database
  setupDB();

  describe("Register", () => {

    it("should respond with HTTP 400 for Bad Request", async () => {
      const response = await request.post(ednpoint);
      expect(response.status).toBe(400);
    });
    
    it("should respond with user object for new user", async () => {
      const response = await request
      .post(ednpoint)
      .send(userData)
      expect(response.status).toBe(201);
      expect(response.body._id).toBeTruthy();
      expect(response.body.token).toBeTruthy();
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });

    it("should respond with error message for duplicate email", async () => {
      let response = await request
        .post(ednpoint)
        .send(userData)
      response = await request
        .post(ednpoint)
        .send(userData)
      expect(response.status).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        message: "User already exists"
      }));
    });

    it("should respond with error message for missing parameter", async () => {
      const response = await request
        .post(ednpoint)
        .send({
          name: "Zell",
          email: "testing@gmail.com",
        })
      expect(response.status).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        message: "Please add all fields"
      }))
    });
  });

  describe("Login", () => {
    it("should respond with HTTP 400 & error for request without parameters", async () => {
      const response = await request.post(`${ednpoint}login`);
    
      expect(response.status).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        message: "Invalid credentials"
      }))
    });

    it("should respond with error message for invalid credentials - (email)", async () => {
      let response = await request
        .post(ednpoint)
        .send(userData)

      response = await request
        .post(`${ednpoint}login`)
        .send({
          email: "emmanuel3@gmail.com",
          password: "Password2@",
        })
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
        message: "Invalid credentials"
      }))
    });

    it("should respond with 200 status & user object for authenticated user", async () => {
      let response = await request
        .post(ednpoint)
        .send(userData)

      response = await request
      .post(`${ednpoint}login`)
      .send({
        email: "user@gmail.com",
        password: "password",
      })
      expect(response.status).toBe(200);
      expect(response.body._id).toBeTruthy();
      expect(response.body.token).toBeTruthy();
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      token = response.body.token;
    });

  })
  describe("Current User", () => {
    it("should respond with HTTP 401 for Unauthorized", async () => {
      const response = await request.get(`${ednpoint}me`);
      expect(response.status).toBe(401);
    });
    
    it("should respond with HTTP 200 for Unauthorized", async () => {
      const response = await request.get(`${ednpoint}me`).set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      // expect(response.body.name).toBe(userData.name);
      // expect(response.body.email).toBe(userData.email);

    });
  })
})
