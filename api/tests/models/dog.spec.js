const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Cannot connect to database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name, weight, height and lifeSpan', () => {
      it('Should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('Invalid name!')))
          .catch(() => done());
      });
      it('Recieves a valid value', () => {
        Dog.create({ name: 'Affenpinscher' });
      });
    });
  });
  
  it("Should throw an error if weight is null", (done) => {
    Dog.create({})
      .then(() => done(new Error("It requires a weight value")))
      .catch(() => done());
  });
  it("Recieves a valid value", () => {
    Dog.create({ weight: "23" });
  });

  it("Should throw an error if height is null", (done) => {
    Dog.create({})
      .then(() => done(new Error("It requires a height value")))
      .catch(() => done());
  });
  it("Recieves a valid value", () => {
    Dog.create({ weight: "63" });
  });

  it("Should throw an error if lifespan is null", (done) => {
    Dog.create({})
      .then(() => done(new Error("It requires a height value")))
      .catch(() => done());
  });
  it("Recieves a valid value", () => {
    Dog.create({ weight: "18" });
  });
});
