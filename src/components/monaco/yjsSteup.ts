import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor'

export async function setupYjs(editorInstance: monaco.editor.IStandaloneCodeEditor, initialCode: string): Promise<void> {
    const ydocument = new Y.Doc()
    const provider = new WebsocketProvider(
      "ws://127.0.0.1:1234",
      "monaco",
      ydocument
    );

    const ytext = ydocument.getText('monaco');
    //ytext.insert(0, initialCode);
    // Bind Yjs to the editor model
    new MonacoBinding(ytext, editorInstance.getModel(), new Set([editorInstance]), provider.awareness);
}