export const KustoLanguageDefinition: any = {
    name: 'kusto',
    mimeTypes: ['text/kusto'],
    displayName: "Kusto",
    defaultToken: "invalid",
    brackets: [ ['[',']','delimiter.square'],
                ['(',')','delimiter.parenthesis'] ],
    wordDefinition: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    // .slice() call is for creating a shallow copy of the array since bridge.net shoves a $type property on the array which monaco doesn't like.
    promotedOperatorCommandTokens: Kusto.Data.IntelliSense.CslCommandParser.PromotedOperatorCommandTokens.slice(0),
    operatorCommandTokens: Kusto.Data.IntelliSense.CslCommandParser.OperatorCommandTokens.slice(0),
    keywords: [
        'by', 'on', 'contains', 'notcontains', 'containscs', 'notcontainscs', 'startswith', 'has', 'matches', 'regex', 'true',
        'false', 'and', 'or', 'typeof', 'int', 'string', 'date', 'datetime', 'time', 'long', 'real', '​boolean', 'bool'
    ],
    operators: ['+', '-', '*', '/', '>', '<', '==', '<>', '<=', '>=', '~', '!~'],
    builtinFunctions: [
        'countof', 'bin', 'extentid', 'extract', 'extractjson', 'floor', 'iif', 'isnull', 'isnotnull', 'notnull', 'isempty',
        'isnotempty', 'notempty', 'now', 're2', 'strcat', 'strlen', 'toupper',
        'tostring', 'count', 'cnt', 'sum', 'min', 'max', 'avg'],
    tokenizer: {
        root: [
            { include: '@whitespace' },
            { include: '@numbers' },
            { include: '@strings' },
            { include: '@dqstrings' },
            { include: '@literals' },
            { include: '@comments' },
            [/[;,.]/, 'delimiter'],
            [/[()\[\]]/, '@brackets'],
            [/[<>=!%&+\-*/|~^]/, 'operator'],
            [/[\w@#\-$]+/, {
                cases: {
                    '@keywords': 'keyword',
                    '@promotedOperatorCommandTokens': 'operator.sql',
                    '@operatorCommandTokens': 'keyword',
                    '@operators': 'operator',
                    '@builtinFunctions': 'predefined',
                    '@default': 'identifier',
                }
            }],
        ],
        whitespace: [[/\s+/, 'white']],
        comments: [["\\/\\/+.*", "comment"]],
        numbers: [
            [/0[xX][0-9a-fA-F]*/, 'number'],
            [/[$][+-]*\d*(\.\d*)?/, 'number'],
            [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
        ],
        strings: [
            [/H'/, { token: 'string.quote', bracket: '@open', next: '@string' }],
            [/h'/, { token: 'string.quote', bracket: '@open', next: '@string' }],
            [/'/, { token: 'string.quote', bracket: '@open', next: '@string' }]
        ],
        string: [
            [/[^']+/, 'string'],
            [/''/, 'string'],
            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],
        dqstrings: [
            [/H"/, { token: 'string.quote', bracket: '@open', next: '@dqstring' }],
            [/h"/, { token: 'string.quote', bracket: '@open', next: '@dqstring' }],
            [/"/, { token: 'string.quote', bracket: '@open', next: '@dqstring' }]
        ],
        dqstring: [
            [/[^"]+/, 'string'],
            [/""/, 'string'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],

        literals: [[/datetime\(\d{4}-\d{2}-\d{2}(\s+\d{2}:\d{2}(:\d{2}(\.\d{0,3})?)?)?\)/, 'number'],
            [/time\((\d+(s(ec(onds?)?)?|m(in(utes?)?)?|h(ours?)?|d(ays?)?)|(\s*(('[^']+')|("[^"]+"))\s*))\)/, 'number'],
            [/guid\([\da-fA-F]{8}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{4}-[\da-fA-F]{12}\)/, 'number'],
            [/typeof\((int|string|date|datetime|time|long|real|boolean|bool)\)/, 'number']]
    }
};