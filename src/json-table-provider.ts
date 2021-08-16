import * as vscode from 'vscode'
import { renderAppHtml } from './ui-stuff/render'

export class JSONTableProvider implements vscode.CustomTextEditorProvider {
    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new JSONTableProvider(context)
        const providerRegistration = vscode.window.registerCustomEditorProvider(JSONTableProvider.viewType, provider)
        return providerRegistration
    }

    private static readonly viewType = 'vscode-json-table.jsonTableWebView'
    private readonly _extensionUri: vscode.Uri
    private _actions: JsonTableEditorActions | undefined

    constructor(context: vscode.ExtensionContext) {
        this._extensionUri = context.extensionUri
    }

    /**
     * Called when our custom editor is opened.
     *
     *
     */
    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken,
    ): Promise<void> {
        this._actions = new JsonTableEditorActions(document)

        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [],
        }
        webviewPanel.webview.html = renderAppHtml()

        function updateWebview() {
            webviewPanel.webview.postMessage({
                type: 'update',
                text: document.getText(),
            })
        }

        // Hook up event handlers so that we can synchronize the webview with the text document.
        //
        // The text document acts as our model, so we have to sync change in the document to our
        // editor and sync changes in the editor back to the document.
        //
        // Remember that a single text document can also be shared between multiple custom
        // editors (this happens for example when you split a custom editor)

        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.uri.toString() === document.uri.toString()) {
                updateWebview()
            }
        })

        // Make sure we get rid of the listener when our editor is closed.
        webviewPanel.onDidDispose(() => {
            changeDocumentSubscription.dispose()
        })

        // Receive message from the webview.
        webviewPanel.webview.onDidReceiveMessage((e) => {
            switch (e.type) {
                case 'changeJson':
                    this.changeJson(e.payload)
                    return
                case 'addNewRow':
                    this._actions?.addNewRow()
                    return
                default:
                    return
            }
        })

        updateWebview()
    }

    private changeJson(payload: any) {
        const json: Array<any> = this._actions?.getDocumentAsJson()
        const { rowIndex, key, textContent } = payload
        json[rowIndex][key] = textContent
        return this._actions?.updateTextDocument(json)
    }
}

class JsonTableEditorActions {
    private readonly _document: vscode.TextDocument

    constructor(document: vscode.TextDocument) {
        this._document = document
    }

    public addNewRow() {
        const json = this.getDocumentAsJson()
        const column = Object.keys(json[0])
            .map((v) => ({ [v]: '' }))
            .reduce((accum, val) => {
                Object.assign(accum, val)
                return accum
            }, {})
        json.push(column)
        return this.updateTextDocument(json)
    }

    /**
     * Try to get a current document as json text.
     */
    public getDocumentAsJson(): any {
        const text = this._document.getText()
        if (text.trim().length === 0) {
            return {}
        }

        try {
            return JSON.parse(text)
        } catch {
            throw new Error('Could not get document as json. Content is not valid json')
        }
    }

    /**
     * Write out the json to a given document.
     */
    public updateTextDocument(json: any) {
        const edit = new vscode.WorkspaceEdit()

        // Just replace the entire document every time for this example extension.
        // A more complete extension should compute minimal edits instead.
        edit.replace(
            this._document.uri,
            new vscode.Range(0, 0, this._document.lineCount, 0),
            JSON.stringify(json, null, 2),
        )

        return vscode.workspace.applyEdit(edit)
    }
}
