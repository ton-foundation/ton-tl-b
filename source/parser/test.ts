import fs from 'fs';
import { generate, Parser, ParserOptions } from "pegjs";
const parser = generate(fs.readFileSync(__dirname + '/grammar.pegjs', 'utf-8'));

const source = fs.readFileSync(__dirname + '/test.tlb', 'utf-8');
console.warn(JSON.stringify(parser.parse(source), null, 2));