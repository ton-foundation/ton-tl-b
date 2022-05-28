{
    const makeNode = (type, body = {}) => ({
        type,
        ...location(),
        ...body,
    });

    const safeFirst = list => list ? list[0] : null;
    const safeLast = list => list ? list[list.length - 1] : null;
}

// Root
Start = __ program:TLProgram __ { return program }

TLProgram  = declarations: Declarations { return declarations }

//
// Combinator declarations
//

Declarations = declarations:(Declaration)* { return makeNode('Declarations', { declarations }) };
Declaration = __ id:LcIdent selector:Selector __ args: Arg* __ "=" __ type: UcIdent __ ";" __ { return makeNode('Declaration', { id, selector, returnType: type, args })}

//
// Arguments
//

Attribute = "@" id: LcIdent { return id }
ArgNameId = LcIdent { return makeNode('NameId', { value: text(), attribute: null }) }
ArgNameIdAttributed = id: LcIdent attr: Attribute { return makeNode('NameId', { value: id, attribute: attr }) }
ArgName = ArgNameIdAttributed / ArgNameId

// 
// Types
//

ExpressionFlag = "##" __ int: Integer { return makeNode('ExpressionFlag', { bits: int }) }
ExpressionFlag2 = ("#<=" / "#<" ) __ int: Integer { return makeNode('ExpressionFlag', { bits: Math.ceil(Math.log2(int)) }) }
ExpressionInteger = int: Integer { return makeNode('ExpressionInteger', {value:int}) }
ExpressionConstructor = LcIdent { return makeNode('ExpressionConstructor', {value:text()}) }
ExpressionCombinator = UcIdent { return makeNode('ExpressionCombinator', {value:text()}) }
ExpressionType = expr: (ExpressionConstructor / ExpressionCombinator / ExpressionInteger / ExpressionParen / ExpressionReference / ExpressionFlag2 / ExpressionFlag) __ {return expr}
ExpressionParen = "(" __ expression: Expression __ ")" { return makeNode('ExpressionParen', {expression})}
Expression = (ExpressionType)*
ExpressionReference = "^" __ type: ExpressionType { return makeNode('ExpressionReference', { ref: type })}

Arg = name: ArgName ":" type: ExpressionType __ { return makeNode('Argument', { argName: name, argType: type } )}

//
// Selectors
//

Selector = SelectorBinEmpty / SelectorBin / SelectorHex
SelectorBin = "$" id: Bin { return '$' + id }
SelectorBinEmpty = "$_" { return '$_' }
SelectorHex = "#" id: Hex { return '#' + id }

//
// Utilities
// 

Comment
  = "//" comment:[^\r\n]* ("\n" / EOF)

Ws "whitespace"
  = " "
  / "\t"
  / "\r"
  / "\n"

__ "skip whitespace and comments"
  = (Ws / Comment)*

LcLetter = letter:[a-z] { return letter }
UcLetter = letter:[A-Z] { return letter }
Digit = digit:[0-9] { return Number(digit) }
HexDigit = hexDigit:[0-9a-f] { return hexDigit }
BinDigit = binDigit:[01] { return binDigit }
Letter = LcLetter / UcLetter
IdentChar = Letter / Digit / "_"
Hex = (HexDigit)* { return text() }
Bin = (BinDigit)* { return text() }
Integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

LcIdent = LcLetter IdentChar* { return text() }
UcIdent = UcLetter IdentChar* { return text() }

EOF = !.