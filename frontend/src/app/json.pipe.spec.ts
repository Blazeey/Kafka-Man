import { JsonPipe } from './json.pipe';

describe('JsonPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonPipe();
    expect(pipe).toBeTruthy();
  });
});
