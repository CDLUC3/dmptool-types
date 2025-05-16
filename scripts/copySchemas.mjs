import cpy from 'cpy';

await cpy(['schemas/*.json'], 'dist/schemas', {
  parents: true,
});
