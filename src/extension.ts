import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel('Taplo TOML');
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('toml');
    context.subscriptions.push(diagnosticCollection);

    // Formatter
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('toml', {
            provideDocumentFormattingEdits(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
                return new Promise((resolve, reject) => {
                    const child = cp.spawn('taplo', ['fmt', '-'], {
                        env: { ...process.env } // Inherit env to find taplo in PATH
                    });

                    let stdout = '';
                    let stderr = '';

                    child.stdout.on('data', (data: Buffer) => {
                        stdout += data.toString();
                    });

                    child.stderr.on('data', (data: Buffer) => {
                        stderr += data.toString();
                    });

                    child.on('close', (code: number) => {
                        if (code === 0) {
                            const fullRange = new vscode.Range(
                                document.positionAt(0),
                                document.positionAt(document.getText().length)
                            );
                            resolve([vscode.TextEdit.replace(fullRange, stdout)]);
                        } else {
                            outputChannel.appendLine(`Format error: ${stderr}`);
                            vscode.window.showErrorMessage('Taplo format failed. See output for details.');
                            reject();
                        }
                    });

                    child.on('error', (err: Error) => {
                        vscode.window.showErrorMessage(`Failed to spawn taplo: ${err.message}`);
                        reject(err);
                    });

                    child.stdin.write(document.getText());
                    child.stdin.end();
                });
            }
        })
    );

    // Linter removed as per user request
}

export function deactivate() {}
