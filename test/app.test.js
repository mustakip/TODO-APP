const expect = require('chai').expect;
const { resolveRequestedRoute, send } = require('../src/handlers');

describe('send', () => {
  beforeEach(() => {
    documentBody = '';
    res = {
      statusCode: 200,
      write: content => (documentBody = content),
      end: () => {}
    };
  });

  it('send should give status code 200 by default', () => {
    send(res, 'ok');
    expect(res)
      .to.have.property('statusCode')
      .equals(200);
  });
  it('send should set given status code to response', () => {
    send(res, 'page not found', 404);
    expect(res)
      .to.have.property('statusCode')
      .equals(404);
  });
  it('should add given content to documentBody', () => {
    send(res, 'page not found', 404);
    expect(documentBody).equals('page not found');
  });
});

describe('resolveRequestedRoute', () => {
  it('should return resolved route', () => {
    const requestUrl = '/index.html';
    const expectedOutput = './public/index.html';
    const actualOutput = resolveRequestedRoute(requestUrl);
    expect(expectedOutput).equals(actualOutput);
  });
  it('should return resolved route', () => {
    const requestUrl = '/';
    const expectedOutput = './public/index.html';
    const actualOutput = resolveRequestedRoute(requestUrl);
    expect(expectedOutput).equals(actualOutput);
  });
});
