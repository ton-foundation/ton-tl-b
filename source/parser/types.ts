export type Declarations = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'Declarations',
    declarations: Declaration[]
}

export type Declaration = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'Declarations',
    id: string,
    selector: string
    returnType: string
    args: Argument[]
}

export type NameId = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'NameId',
    value: string,
    attribute: string | null
}

export type Argument = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'Argument',
    argName: NameId;
    argType: ExpressionType;
}

export type ExpressionFlag = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'ExpressionFlag',
    bits: number
}

export type ExpressionInteger = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'ExpressionInteger',
    value: number
}

export type ExpressionConstructor = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'ExpressionConstructor',
    value: string
}

export type ExpressionCombinator = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'ExpressionCombinator',
    value: string
}

export type ExpressionParen = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'ExpressionParen',
    expression: ExpressionType[];
}

export type ExpressionReference = {
    start: { offset: number, line: number, column: number },
    end: { offset: number, line: number, column: number },
    type: 'ExpressionReference',
    ref: ExpressionType;
}

export type ExpressionType = (ExpressionConstructor | ExpressionCombinator | ExpressionInteger | ExpressionParen | ExpressionReference | ExpressionFlag);