export const syntax = `{
    "fileTypes": ["jsfso"],
    "scopeName": "source.jsfso",
    "name": "jsfso",
    "patterns": [
        {
            "begin": "%EJSCRIPT_START%",
            "end": "%EJSCRIPT_END%",
            "name": "source.jsfso.embedded.html",
            "beginCaptures": {
                "0": { "name": "punctuation.definition.tag.begin.ejscript" }
            },
            "endCaptures": {
                "0": { "name": "punctuation.definition.tag.end.ejscript" }
            },
            "patterns": [
                { "include": "#embedded" }
            ]
        },
        { "include": "source.ts" }
    ],
    "repository": {
        "embedded": {
            "patterns": [
                {
                    "begin": "<%",
                    "end": "%>",
                    "name": "meta.tag.inline.ejscript.html",
                    "beginCaptures": {
                        "0": { "name": "punctuation.definition.tag.begin.ejscript" }
                    },
                    "endCaptures": {
                        "0": { "name": "punctuation.definition.tag.end.ejscript" }
                    },
                    "patterns": [
                        { "include": "#typescript" }
                    ]
                },
                { "include": "text.html.basic" }
            ]
        },
        "typescript": {
            "patterns": [
                { "include": "source.ts" }
            ]
        }
    },
    "uuid": "generated-uuid-for-jsfso-tmlanguage-file",
    "information_for_contributors": "This tmLanguage file defines syntax for jsfso."
}`;