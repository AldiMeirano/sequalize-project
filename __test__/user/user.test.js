const server = require("../../server");

describe("POST /resgister", () => {
  it("Should success register", async () => {
    const userData = {
      name: "bapak kau",
      email: "palaotak@gmail.com",
      password: "123456",
    };
    const response = await request(server)
      .post("/api/v1/user/register")
      .send(userData);

    expect(response.status).toBeThurty();
  });
});
