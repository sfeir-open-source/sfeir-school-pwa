export const capitalize = ([s, ...tring]) => [s.toUpperCase(), ...tring].join('');
export const splitEmail = string => (string ? string.split('@')[0] : '');
