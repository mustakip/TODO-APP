const expect = require('chai').expect;
const {createKeyValue} = require('../src/utils');

describe('createKeyValue', () => {
  it('should create key value pair of provided input', () => {
    const content = 'name=jhon&password=1234';
    const expectedOutput = {
      name: 'jhon',
      password: '1234'
    };
    const actualOutput = createKeyValue(content);
    expect(expectedOutput).to.deep.equal(actualOutput);
  });
});
