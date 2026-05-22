console.time("plain");
for (let i = 0; i < 1_000_000; i++) {
  let a = 100000;
}
console.timeEnd("plain");

console.time("separator");
for (let i = 0; i < 1_000_000; i++) {
  let b = 1_00_000;
}
console.timeEnd("separator");