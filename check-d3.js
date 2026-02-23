
try {
  console.log('d3-array/package.json path:', require.resolve('d3-array/package.json'));
} catch (e) {
  console.log('d3-array/package.json not found');
}
try {
  console.log('@types/d3-array/package.json path:', require.resolve('@types/d3-array/package.json'));
} catch (e) {
  console.log('@types/d3-array/package.json not found');
}
