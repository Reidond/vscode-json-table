import * as vscode from 'vscode'
import { JSONTableProvider } from './json-table-provider'

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(JSONTableProvider.register(context))
}

export function deactivate() {}
