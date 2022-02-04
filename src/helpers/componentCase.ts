import camelCase from 'lodash/camelCase';

const componentCase = (string: string) => string.charAt(0).toUpperCase() + camelCase(string.slice(1));

export default componentCase;
