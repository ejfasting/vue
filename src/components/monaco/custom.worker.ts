import * as worker from 'monaco-editor/esm/vs/editor/editor.worker'
import type * as monaco from 'monaco-editor'
import {
  createTypeScriptWorkerService,
  type ServiceEnvironment,
  activateAutomaticTypeAcquisition
} from '@volar/monaco/worker.js'

import { getSuperOfficeLanguageModule } from '@superoffice/language-server/src/core/superoffice'

import ts from 'typescript'
import { create as createHtmlService } from 'volar-service-html'
import { create as createCssService } from 'volar-service-css'
import { create as createTypeScriptService } from 'volar-service-typescript'

self.onmessage = () => {
  worker.initialize((ctx: monaco.worker.IWorkerContext) => {
    const env: ServiceEnvironment = {
      workspaceFolder: 'file:///',
      typescript: {
        uriToFileName: (uri: string) => uri.substring('file://'.length),
        fileNameToUri: (fileName: string) => 'file://' + fileName
      }
    }

    activateAutomaticTypeAcquisition(env)
    return createTypeScriptWorkerService({
      typescript: ts,
      compilerOptions: {
        ...ts.getDefaultCompilerOptions(),
        allowJs: true,
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext
      },
      workerContext: ctx,
      env,
      languagePlugins: [getSuperOfficeLanguageModule()],
      servicePlugins: [
        // ...
        createHtmlService(),
        createCssService(),
        //createEmmetService({}),
        ...createTypeScriptService(ts)
        //createCrmscriptService({ sharedService: shared, definitionService: Definition }),
      ]
    })
  })
}
