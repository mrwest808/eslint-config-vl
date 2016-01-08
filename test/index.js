import { join } from 'path';
import { CLIEngine } from 'eslint';
import expect from 'expect';

const linter = new CLIEngine({
  configFile: join(__dirname, '../eslintrc.json')
});

const msg = str => element => element.message === str;


describe('Lint samples', () => {
  describe('Invalid example', () => {
    const result = linter.executeOnText('console.log("test");');
    var messages = result.results[0].messages;

    it('should treat `no-console` as a warning', () => {
      const expected = 'Unexpected console statement.';
      expect(messages.find(msg(expected))).toBeAn(Object);
    });

    it('should treat `quotes` as an error', () => {
      const expected = 'Strings must use singlequote.';
      expect(messages.find(msg(expected))).toBeAn(Object);
    });

    it('should treat `semi` as an error', () => {
      const expected = 'Extra semicolon.';
      expect(messages.find(msg(expected))).toBeAn(Object);
    });
  });

  describe('Valid example', () => {
    const text = [
      'const add = (a, b) => a + b',
      'add(1, 2)',
    ].join('\n').concat('\n'); // needs to end with a newline

    const result = linter.executeOnText(text);
    const messages = result.results[0].messages;

    it('should contain no warnings or errors', () => {
      expect(messages).toBeAn(Array);
      expect(messages.length).toBe(0);
    });
  });
});
