import{m as s}from"./MonacoView-B4Kc7wWQ.js";import"./index-C4V4pSoy.js";/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.47.0(69991d66135e4a1fc1cf0b1ac4ad25d429866a0d)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/var d=Object.defineProperty,p=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,k=(n,e,i,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of c(e))!a.call(n,o)&&o!==i&&d(n,o,{get:()=>e[o],enumerable:!(r=p(e,o))||r.enumerable});return n},l=(n,e,i)=>(k(n,e,"default"),i),t={};l(t,s);var b={comments:{blockComment:["{/*","*/}"]},brackets:[["{","}"]],autoClosingPairs:[{open:'"',close:'"'},{open:"'",close:"'"},{open:"“",close:"”"},{open:"‘",close:"’"},{open:"`",close:"`"},{open:"{",close:"}"},{open:"(",close:")"},{open:"_",close:"_"},{open:"**",close:"**"},{open:"<",close:">"}],onEnterRules:[{beforeText:/^\s*- .+/,action:{indentAction:t.languages.IndentAction.None,appendText:"- "}},{beforeText:/^\s*\+ .+/,action:{indentAction:t.languages.IndentAction.None,appendText:"+ "}},{beforeText:/^\s*\* .+/,action:{indentAction:t.languages.IndentAction.None,appendText:"* "}},{beforeText:/^> /,action:{indentAction:t.languages.IndentAction.None,appendText:"> "}},{beforeText:/<\w+/,action:{indentAction:t.languages.IndentAction.Indent}},{beforeText:/\s+>\s*$/,action:{indentAction:t.languages.IndentAction.Indent}},{beforeText:/<\/\w+>/,action:{indentAction:t.languages.IndentAction.Outdent}},...Array.from({length:100},(n,e)=>({beforeText:new RegExp(`^${e}\\. .+`),action:{indentAction:t.languages.IndentAction.None,appendText:`${e+1}. `}}))]},g={defaultToken:"",tokenPostfix:".mdx",control:/[!#()*+.[\\\]_`{}\-]/,escapes:/\\@control/,tokenizer:{root:[[/^---$/,{token:"meta.content",next:"@frontmatter",nextEmbedded:"yaml"}],[/^\s*import/,{token:"keyword",next:"@import",nextEmbedded:"js"}],[/^\s*export/,{token:"keyword",next:"@export",nextEmbedded:"js"}],[/<\w+/,{token:"type.identifier",next:"@jsx"}],[/<\/?\w+>/,"type.identifier"],[/^(\s*)(>*\s*)(#{1,6}\s)/,[{token:"white"},{token:"comment"},{token:"keyword",next:"@header"}]],[/^(\s*)(>*\s*)([*+-])(\s+)/,["white","comment","keyword","white"]],[/^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/,["white","comment","number","white"]],[/^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/,["white","comment","number","white"]],[/^(\s*)(>*\s*)(-{3,}|\*{3,}|_{3,})$/,["white","comment","keyword"]],[/`{3,}(\s.*)?$/,{token:"string",next:"@codeblock_backtick"}],[/~{3,}(\s.*)?$/,{token:"string",next:"@codeblock_tilde"}],[/`{3,}(\S+).*$/,{token:"string",next:"@codeblock_highlight_backtick",nextEmbedded:"$1"}],[/~{3,}(\S+).*$/,{token:"string",next:"@codeblock_highlight_tilde",nextEmbedded:"$1"}],[/^(\s*)(-{4,})$/,["white","comment"]],[/^(\s*)(>+)/,["white","comment"]],{include:"content"}],content:[[/(\[)(.+)(]\()(.+)(\s+".*")(\))/,["","string.link","","type.identifier","string.link",""]],[/(\[)(.+)(]\()(.+)(\))/,["","type.identifier","","string.link",""]],[/(\[)(.+)(]\[)(.+)(])/,["","type.identifier","","type.identifier",""]],[/(\[)(.+)(]:\s+)(\S*)/,["","type.identifier","","string.link"]],[/(\[)(.+)(])/,["","type.identifier",""]],[/`.*`/,"variable.source"],[/_/,{token:"emphasis",next:"@emphasis_underscore"}],[/\*(?!\*)/,{token:"emphasis",next:"@emphasis_asterisk"}],[/\*\*/,{token:"strong",next:"@strong"}],[/{/,{token:"delimiter.bracket",next:"@expression",nextEmbedded:"js"}]],import:[[/'\s*(;|$)/,{token:"string",next:"@pop",nextEmbedded:"@pop"}]],expression:[[/{/,{token:"delimiter.bracket",next:"@expression"}],[/}/,{token:"delimiter.bracket",next:"@pop",nextEmbedded:"@pop"}]],export:[[/^\s*$/,{token:"delimiter.bracket",next:"@pop",nextEmbedded:"@pop"}]],jsx:[[/\s+/,""],[/(\w+)(=)("(?:[^"\\]|\\.)*")/,["attribute.name","operator","string"]],[/(\w+)(=)('(?:[^'\\]|\\.)*')/,["attribute.name","operator","string"]],[/(\w+(?=\s|>|={|$))/,["attribute.name"]],[/={/,{token:"delimiter.bracket",next:"@expression",nextEmbedded:"js"}],[/>/,{token:"type.identifier",next:"@pop"}]],header:[[/.$/,{token:"keyword",next:"@pop"}],{include:"content"},[/./,{token:"keyword"}]],strong:[[/\*\*/,{token:"strong",next:"@pop"}],{include:"content"},[/./,{token:"strong"}]],emphasis_underscore:[[/_/,{token:"emphasis",next:"@pop"}],{include:"content"},[/./,{token:"emphasis"}]],emphasis_asterisk:[[/\*(?!\*)/,{token:"emphasis",next:"@pop"}],{include:"content"},[/./,{token:"emphasis"}]],frontmatter:[[/^---$/,{token:"meta.content",nextEmbedded:"@pop",next:"@pop"}]],codeblock_highlight_backtick:[[/\s*`{3,}\s*$/,{token:"string",next:"@pop",nextEmbedded:"@pop"}],[/.*$/,"variable.source"]],codeblock_highlight_tilde:[[/\s*~{3,}\s*$/,{token:"string",next:"@pop",nextEmbedded:"@pop"}],[/.*$/,"variable.source"]],codeblock_backtick:[[/\s*`{3,}\s*$/,{token:"string",next:"@pop"}],[/.*$/,"variable.source"]],codeblock_tilde:[[/\s*~{3,}\s*$/,{token:"string",next:"@pop"}],[/.*$/,"variable.source"]]}};export{b as conf,g as language};
