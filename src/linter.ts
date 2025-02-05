import * as cp from 'child_process';
import * as vscode from 'vscode';
import * as util from 'util';
import { ProtoError, parseProtoError } from './protoError';

export interface LinterError {
  proto: ProtoError;
  range: vscode.Range;
}

interface ExecResult {
  stdout: string;
  stderr: string;
}

export default class Linter {
  private codeDocument: vscode.TextDocument;

  constructor(document: vscode.TextDocument) {
    this.codeDocument = document;
  }

  public async lint(): Promise<LinterError[]> {
    const errors = await this.runProtoLint();
    if (!errors) {
      return [];
    }

    const lintingErrors: LinterError[] = this.parseErrors(errors);
    return lintingErrors;
  }

  private parseErrors(errorStr: string): LinterError[] {
    let errors = errorStr.split('\n') || [];

    var result = errors.reduce((errors: LinterError[], currentError: string) => {
      const parsedError = parseProtoError(currentError);
      if (!parsedError.reason) {
        return errors;
      }

      const linterError: LinterError = this.createLinterError(parsedError);
      return errors.concat(linterError);
    }, []);

    return result;
  }

  private async runProtoLint(): Promise<string> {
    const currentFile = this.codeDocument.uri.fsPath;
    const exec = util.promisify(cp.exec);
    const cmd = `apilint lint "${currentFile}"`;

    let lintResults: string = "";
    await exec(cmd, {
      cwd: vscode.workspace.rootPath
    }).then((output : ExecResult) => lintResults = output.stdout);

    return lintResults;
  }

  private createLinterError(error: ProtoError): LinterError {
    const linterError: LinterError = {
      proto: error,
      range: this.getErrorRange(error)
    };

    return linterError;
  }

  private getErrorRange(error: ProtoError): vscode.Range {
    return this.codeDocument.lineAt(error.line - 1).range;
  }
}
