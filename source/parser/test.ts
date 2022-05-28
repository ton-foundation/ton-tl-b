import fs from 'fs';
import { generate, Parser, ParserOptions } from "pegjs";
import { generateTypescript } from '../generator/generateTypescript';
const parser = generate(fs.readFileSync(__dirname + '/grammar.pegjs', 'utf-8'));

const source = fs.readFileSync(__dirname + '/test.tlb', 'utf-8');
let parsed = parser.parse(source);
console.warn(JSON.stringify(parsed, null, 2));
fs.writeFileSync(__dirname + '/test.gen.ts', generateTypescript(parsed));