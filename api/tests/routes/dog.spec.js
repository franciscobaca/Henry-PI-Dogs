const session = require('supertest-session');
const app = require('../../src/app');
const { Dog, conn } = require('../../src/db');

const agent = session(app);

const dog = {
  name: 'Affenpinscher',
};

describe('Dog Route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Cannot connect to  dabase:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('Should get status 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});