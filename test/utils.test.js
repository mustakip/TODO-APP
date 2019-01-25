const expect = require('chai').expect;
const { createKeyValue, redirectTo } = require('../src/utils');

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

describe('redirectTo', () => {
  it('should set property statuscode and location of response', () => {
    const res = {
      headers: {},
      statusCode: 200,
      setHeader: (header, value) => (res.headers[header] = value),
      end: () => {}
    };

    redirectTo(res, '/home');
    expect(res)
      .to.have.property('headers')
      .to.deep.equal({ Location: '/home' });
    expect(res)
      .to.have.property('statusCode')
      .equals(302);
  });
});
