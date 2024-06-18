export const customLanguage: Language = {
  id: 'jsfso',
  fileExtension: '.jsfso',
  initialCode: `const cAgent = new RTL.ContactAgent();
const cEntity = await cAgent.createDefaultContactEntityAsync();
cEntity.name = "BigCompany AS";
        
const pAgent = new RTL.PersonAgent();
const pEntity = await pAgent.createDefaultPersonEntityAsync();
pEntity.firstname = "123";`
}

export interface Language {
  id: string
  fileExtension: string
  initialCode: string
}
