import App from '../App';

test('test', () => {
  const draft = { name: 'bob' };
  const table = { name: 'jim' };
  // console.log(Object.assign(draft, table));
  // expect(Object.assign(draft, table)).toEqual({ name: 'jim' });
  expect({ table }).toEqual({ table: { name: 'jim' } });
});
