export default function (PropType: any, value: any): boolean {
  const type = new PropType();
  const typeKeys = Object.keys(type);

  for (let i = 0; i < typeKeys.length; i += 1) {
    const typeKeyCur = typeKeys[i];

    if (typeof value[typeKeyCur] === 'undefined') {
      console.error(`Property "${typeKeyCur}" is required`);

      return false;
    }

    if (typeof value[typeKeyCur] !== typeof type[typeKeyCur]) {
      console.error(`Property "${typeKeyCur}" must be ${typeof type[typeKeyCur]}, got ${typeof value[typeKeyCur]}`);

      return false;
    }
  }

  return true;
}
