export const customLanguage: Language = {
  id: 'jsfso',
  fileExtension: '.jsfso',
  initialCode: `%EJSCRIPT_START%
<style>.foo { c }</style>
<div></div>
<%
const cAgent = SO.getContactAgent();
const cEntity = await cAgent.createDefaultContactEntityAsync();
cEntity.name = "BigCompany AS";

const pAgent = SO.getPersonAgent();
const pEntity = await pAgent.createDefaultPersonEntityAsync();
pEntity.firstname = "123";

%>
<script> 
let foo: string = 123; 
</script>
%EJSCRIPT_END%`
}

export interface Language {
  id: string
  fileExtension: string
  initialCode: string
}

/* https://shiki.style/themes */
export const themes = [
  'dark-plus',
  'monokai',
  'andromeeda'
]
