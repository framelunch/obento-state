const State = require('./index');

it('Data', done => {
  const { make, extract, isEq } = State.Data;
  expect(make('a/b')).toBe('a/b');
  expect(make('/a/b')).toBe('a/b');
  expect(make('a/b/')).toBe('a/b');
  expect(make('/a/b/')).toBe('a/b');

  expect(extract(['a', 'b', 'c'], ['a', 'b', 'e'])).toEqual(['e']);
  expect(extract(['a', 'b', 'c'], ['a', 'd', 'e'])).toEqual(['d', 'e']);
  expect(extract(['a', 'b', 'c'], ['d', 'b', 'c'])).toEqual(['d', 'b', 'c']);

  expect(isEq('a/b', '/a/b')).toBe(true);
  expect(isEq('a/b', 'a/b/')).toBe(true);
  expect(isEq('a/b', '/a/b/')).toBe(true);
  expect(isEq('a/b', '/a/b/c')).toBe(false);

  done();
});

it('State', done => {
  const state = new State();
  const mock1 = jest.fn();
  const mock2 = jest.fn();

  expect(state.listen).toBeInstanceOf(Function);
  expect(state.wait).toBeInstanceOf(Function);

  state.listen('add:a', val => console.log('add:a', val));
  state.listen('add:b', val => console.log('add:b', val));
  state.listen('add:c', val => console.log('add:c', val));
  state.listen('remove:b', val => {
    state.wait();
    setTimeout(() => {
      console.log('remove:b', val)
      state.notify();
    }, 1000);
  });

  state.listen('state:start', current => console.log('start'));
  state.listen('state:update', current => console.log('update', current));
  state.change('/a/b', [123]);
  state.change('/a/c', [123]);

  setTimeout(() => {
    done();
  }, 2000);
});
