"use strict";

const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const { describe, it } = (exports.lab = Lab.script());
const { Server } = require("../src/server");

describe("Check Server instance", () => {
  it('throw error with message "Server must be instantiated usign new" when you dont specified a new instance', () => {
    expect(() => {
      Server();
    }).to.throw("Server must be instantiated using new");
  });
});
