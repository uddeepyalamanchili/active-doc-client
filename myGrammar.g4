grammar myGrammar;

inputSentence
    : (emptyLine* | mustClause) end? NL* EOF
    ;

mustClause
    : functions must have functionExpression
    | abstractFunctions must have abstractFunctionExpression
    | constructors must have constructorExpression
    | classes must have classExpression
    | parameters must have parameterExpression
    | declarationStatements must have declarationStatementExpression
    | subclasses must have subclassExpression
    ;

/*
    Constants
*/
SPACE
    : (' ' | '\t')+
    ;


words
    : '"' (word '||' | word '&&')* word '"'
    ;

word
    :  Alphabet+
    |  '!' Alphabet+
    |  '...' Alphabet+
    |  '!...' Alphabet+
    |  Alphabet+ '...'
    |  '!' Alphabet+ '...'
    |  '...' Alphabet+ '...'
    |  '!...' Alphabet+ '...'
    ;

combinatorialWords
    : '"' (Alphabet | symbols | SPACE)+ '"'
    ;

symbols
    : '.' | '=' | '>' | '<' | '(' | ')' | ',' | '\'' | '&'
    ;

Alphabet
    : [a-zA-Z0-9_-]
    ;
end
    : '.'
    ;

NL
    : '\r' | '\n'
    ;

emptyLine
    : NL
    ;

comments
    : '"'(Alphabet | symbols | SPACE)+'"'
    ;

/*
    connectors
*/

must
    : 'must '
    ;

of
    : 'of '
    ;


and
    :  'and '
    ;

or
    :  'or '
    ;

have
    : 'have '
    ;

withWord
    : 'with '
    ;


binary
    : and | or
    ;

LPAREN
    : '('
    ;

RPAREN
    : ')'
    ;

/*
    ------------------
*/

/*
    names
*/

NAME
    : 'name '
    ;

names
    : NAME nameCondition?
    ;

nameCondition
    : words SPACE
    ;


/*
    annotations
*/

ANNOTATION
    : 'annotation '
    ;

annotations
    : ANNOTATION annotationCondition?
    ;

annotationCondition
    : combinatorialWords SPACE
    ;


/*
    extensions
*/

EXTENSION
    : 'extension '
    ;

SUPERCLASS
    : 'Superclass'
    ;

extensions
    : EXTENSION extensionCondition
    ;

extensionCondition
    : of ( words SPACE | SUPERCLASS)
    ;


/*
    implements
*/

IMPLEMENTATION
    : 'implementation '
    ;

INTERFACE
    : 'Interface '
    ;

implementations
    : IMPLEMENTATION implementationCondition
    ;

implementationCondition
    : of ( words SPACE | INTERFACE )
    ;


/*
    functions
*/

FUNCTION
    : 'function '
    ;

functions
    : FUNCTION functionCondition? functionOf?
    ;

functionOf
    : of classes
    ;

functionCondition
    : withWord functionExpression
    ;

functionExpression
    : LPAREN functionExpression RPAREN
    | left=functionExpression op=binary right=functionExpression
    | ( annotations | specifiers | visibilities | types | names | parameters | returnValues
        | declarationStatements | expressionStatements | comments)
    | functionExpression SPACE
    ;

/*
    abstractFunctions
*/

AbstractFunctions
    : 'abstract function '
    ;

abstractFunctions
    : AbstractFunctions abstractFunctionCondition? abstractFunctionOf?
    ;

abstractFunctionOf
    : of classes
    ;

abstractFunctionCondition
    : withWord abstractFunctionExpression
    ;

abstractFunctionExpression
    : LPAREN abstractFunctionExpression RPAREN
    | left=abstractFunctionExpression op=binary right=abstractFunctionExpression
    | ( annotations | specifiers | visibilities | types | names | parameters )
    | abstractFunctionExpression SPACE
    ;


/*
    constructors
*/

CONSTRUCTOR
    : 'constructor '
    ;

constructors
    : CONSTRUCTOR constructorCondition? constructorOf?
    ;

constructorOf
    : of classes
    ;

constructorCondition
    : withWord constructorExpression
    ;

constructorExpression
    : LPAREN constructorExpression RPAREN
    | left=constructorExpression op=binary right=constructorExpression
    | ( annotations | specifiers | visibilities | names | parameters | returnValues | declarationStatements
        | expressionStatements  | comments )
    | constructorExpression SPACE
    ;

/*
    parameters
*/

PARAMETER
    :  'parameter '
    ;

parameters
    : PARAMETER parameterCondition?
    ;

parameterCondition
    : withWord parameterExpression
    ;

parameterExpression
    : LPAREN parameterExpression RPAREN
    | left=parameterExpression op=binary right=parameterExpression
    | ( types | names )
    | parameterExpression SPACE
    ;


/*
    types
*/

TYPES
    : 'type '
    ;

types
    : TYPES typeCondition?
    ;

typeCondition
    : combinatorialWords SPACE
    | words SPACE
    ;


/*
    specifiers only static
*/

SPECIFIER
    :  'specifier '
    ;

specifiers
    : SPECIFIER specifierCondition?
    ;

specifierCondition
    : words SPACE
    ;

/*
    visibility (also specifier) public/protected/private
*/

VISIBILITY
    :  'visibility '
    ;

visibilities
    : VISIBILITY visibilityCondition?
    ;

visibilityCondition
    : words SPACE
    ;


/*
    return values
*/

ReturnValue
    :  'return value '
    ;

returnValues
    : ReturnValue returnValueCondition?
    ;

returnValueCondition
    : combinatorialWords SPACE
    ;


/*
    declarationStatements
*/

DeclarationStatement
    : 'declaration statement '
    ;

declarationStatements
    : DeclarationStatement declarationStatementCondition? declarationStatementOf?
    ;

declarationStatementOf
    : of (classes | functions | constructors)
    ;

declarationStatementCondition
    : withWord declarationStatementExpression
    ;

declarationStatementExpression
    : LPAREN declarationStatementExpression RPAREN
    | left=declarationStatementExpression op=binary right=declarationStatementExpression
    | ( annotations | specifiers | visibilities | types | names | initialValues | comments)
    | declarationStatementExpression SPACE
    ;


/*
    expressions
*/

ExpressionStatement
    :  'expression statement '
    ;

expressionStatements
    : ExpressionStatement expressionStatementCondition? expressionStatementOf?
    ;

expressionStatementOf
    : of (functions | constructors | constructors)
    ;

expressionStatementCondition
    : withWord expressionStatementExpression
    ;

expressionStatementExpression
    : LPAREN expressionStatementExpression RPAREN
    | left=expressionStatementExpression op=binary right=expressionStatementExpression
    | (comments | value)
    | expressionStatementExpression SPACE
    ;

/*
    values
*/

VALUE
    :  'value '
    ;

value
    : VALUE valueCondition?
    ;

valueCondition
    : combinatorialWords SPACE
    ;

/*
    init values
*/

InitialValue
    :  'initial value '
    ;

initialValues
    : InitialValue initialValueCondition? initialValueOf?
    ;

initialValueOf
    : of declarationStatements
    ;

initialValueCondition
    : combinatorialWords SPACE
    ;


/*
    classes
*/

CLASSES
    : 'class '
    ;

classes
    : CLASSES classCondition?
    ;

classCondition
    : withWord classExpression
    ;

classExpression
    : LPAREN classExpression RPAREN
    | left=classExpression op=binary right=classExpression
    | ( annotations | specifiers | visibilities | names | extensions | implementations | functions
            | abstractFunctions | constructors | declarationStatements | returnValues  | comments | subclasses)
    | classExpression SPACE
    ;


/*
    subclasses
*/

SUBCLASSES
    : 'subclass '
    ;

subclasses
    : SUBCLASSES subclassCondition? subclassOf?
    ;

subclassOf
    : of classes
    ;

subclassCondition
    : withWord subclassExpression
    ;

subclassExpression
    : LPAREN subclassExpression RPAREN
    | left=subclassExpression op=binary right=subclassExpression
    | ( annotations | specifiers | visibilities | names | extensions | implementations | functions | subclasses |
            | abstractFunctions | constructors | declarationStatements | returnValues  | comments )
    | subclassExpression SPACE
    ;
