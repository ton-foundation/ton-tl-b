import { Declarations, ExpressionType } from "../parser/types";
import { CodeBuilder } from "./utils/builder";
import { snakeToCamel, snakeToPascal } from 'case-shift';

export function generateTypescript(src: Declarations) {
    const builder = new CodeBuilder();

    function resolveType(src: ExpressionType): string {
        if (src.type === 'ExpressionCombinator') {
            if (src.value === 'Coins') {
                return 'BN';
            }
            if (src.value === 'MsgAddress') {
                return 'Address';
            }
            if (src.value === 'Custom') {
                return 'Cell';
            }
            return src.value;
        } else if (src.type === 'ExpressionConstructor') {
            if (src.value === 'uint64') {
                return 'BN'
            }
            return src.value;
        }

        if (src.type === 'ExpressionReference') {
            return resolveType(src.ref);
        }
        if (src.type === 'ExpressionParen') {
            if (src.expression.length === 2) {
                if (src.expression[0].type === 'ExpressionCombinator' && src.expression[0].value === 'Maybe') {
                    return resolveType(src.expression[1]) + ' | null';
                } else {
                    throw Error('Unsupported epxression');
                }
            } if (src.expression.length === 3) {
                if (src.expression[0].type === 'ExpressionCombinator' && src.expression[0].value === 'Either') {
                    return resolveType(src.expression[1]) + ' | ' + resolveType(src.expression[2])
                }
            } else {
                throw Error('Unsupported epxression');
            }
        }
        return 'unknown';
    }

    // Header
    builder.add(`import BN from "bn.js";`);
    builder.add(`import { Cell, Address, beginCell } from "ton";`);
    builder.add();

    // Declarations
    for (let s of src.declarations) {
        builder.add('export class ' + snakeToPascal(s.id) + ' {');
        builder.inTab(() => {
            for (let a of s.args) {
                builder.add('readonly ' + snakeToCamel(a.argName.value) + ': ' + resolveType(a.argType) + ';');
            }
            builder.add();
            builder.add('toCell() {');
            builder.inTab(() => {
                builder.add('let builder = beginCell()');
                if (s.selector.startsWith('#')) {
                    let val = parseInt(s.selector.slice(1), 16);
                    builder.add('builder.storeUint(' + val + ', 32);');
                }
                for (let a of s.args) {
                    let nm = snakeToCamel(a.argName.value);
                    if (a.argType.type === 'ExpressionCombinator') {
                        if (a.argType.value === 'Coins') {
                            builder.add(`builder.storeCoins(this.${nm});`);
                        }
                        if (a.argType.value === 'MsgAddress') {
                            builder.add(`builder.storeAddress(this.${nm});`);
                        }
                    }
                }
                builder.add('return builder.endCell();');
            });
            builder.add('}');
        });
        builder.add('}');
        builder.add();
    }

    return builder.render();
}