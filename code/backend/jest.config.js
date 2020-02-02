module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: process.env.NODE_ENV === 'production' ? '(/__tests__/.*|(\\.|/)(it-test|spec))\\.ts?$' : '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
};
