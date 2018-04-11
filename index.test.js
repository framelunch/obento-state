const State = require('./index');
const state = new State();

it('loop basic', done => {
  const mock = jest.fn();

  expect(state.listen).toBeInstanceOf(Function);
  expect(state.wait).toBeInstanceOf(Function);

  done();
});
