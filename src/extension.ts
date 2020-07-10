// vscode module contains the API for creating the extensions
import * as vscode from "vscode";
import * as fs from "fs";
const path = require("path");

// The activate function is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  // To register a command use {vscode.commands.registerCommand("commandId",()=>{})}
  // To make the command available in the command pallet add your command in the package.json
  /**
   * contributes:{
   * commands:[{
   * "command":"commandId",
   * "title":"The title of the command"
   * }]} */
  //  If your extension is not activated then the command will not work
  // Add
  /**
   * "activationEvents":[
   * "onCommand:commandId"
   * ]
   */


  console.log("Extension Activated");
  // Get the path to the extension
  const extensionPath = context.extensionPath;
  console.log("Path", extensionPath);
  let disposable = vscode.commands.registerCommand(
    "firstextension.start",
    () => {
      vscode.window.showInformationMessage("The extension is started");
    }
  );

  vscode.commands.registerCommand("firstextension.key", () => {
    vscode.window.showInformationMessage("Keybinding is working");
  });

  vscode.commands.registerCommand("catcoding.start", () => {
    const pannel = vscode.window.createWebviewPanel(
      "catcoding",
      "Cat Coding",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    setTimeout(() => {
      pannel.webview.postMessage({
        message: "Maxwells Loves Java and Javascript",
      });
    }, 5000);
    pannel.webview.html = getWebviewContent();
    pannel.webview.onDidReceiveMessage(
      ({ message }) => {
        vscode.window.showInformationMessage(message);
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(disposable);

  function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Snippet Generator</title>

        <style>
        * {
          margin:0px;
          padding:0px;
          box-sizing:border-box;
        }

        html,body {
          width:100%;
          height:100%;
        }

        body {
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-top:32px;
        }

          button {
            padding:8px 16px;
            font-size: var(--vscode-editor-font-size);
            background :var(--vscode-button-background);
            border:var(--vscode-checkbox-border);
            color: var(--vscode-button-foreground);
          }
          button:hover{
            background: var(--vscode-button-hoverBackground);
          }

          button:focus{
            outline:none;
          }

          input[type="text"]{
            background:var(--vscode-input-background);
            border:1px solid var(--vscode-button-background);
            color: var(--vscode-input-foreground);
          }

          input[type="text"]:focus{
            outline:none;
            border: 1px solid var(--vscode-button-hoverBackground);
          }

          ul {
            margin-top:32px;
            list-style:none;
            display:flex;
            flex-direction:column;
            align-items:center;
            width:100%;
          }

          ul li {
            padding:1rem;
            background:var(--vscode-dropdown-background);
            margin-top:4px;
            width:90%;
          }
          ul li span {
            color : color: var(--vscode-button-foreground);;
            font-size: var(--vscode-editor-font-size);
            font-weight:var(--vscode-editor-font-weight);
            font-family:var(--vscode-editor-font-family);
          }

        </style>
    </head>
    <body>
          <button>Add Snippet</button>
          <div style="display:flex; flex-direction:column; margin-top:32px;">
            <input type="text" placeholder="Enter Text ... " style="padding:8px 16px; font-size:1.5rem"/>
          </div>

          <ul>
            <li><span>List Item One</span></li>
            <li><span>List Item Two</span></li>
            <li><span>List Item Three</span></li>
            <li><span>List Item Four</span></li>
            <li><span>List Item Five</span></li>
            <li><span>List Item One</span></li>
            <li><span>List Item Two</span></li>
            <li><span>List Item Three</span></li>
            <li><span>List Item Four</span></li>
            <li><span>List Item Five</span></li>
            <li><span>List Item One</span></li>
            <li><span>List Item Two</span></li>
            <li><span>List Item Three</span></li>
            <li><span>List Item Four</span></li>
            <li><span>List Item Five</span></li>
            <li><span>List Item One</span></li>
            <li><span>List Item Two</span></li>
            <li><span>List Item Three</span></li>
            <li><span>List Item Four</span></li>
            <li><span>List Item Five</span></li>
            <li><span>List Item One</span></li>
            <li><span>List Item Two</span></li>
            <li><span>List Item Three</span></li>
            <li><span>List Item Four</span></li>
            <li><span>List Item Five</span></li>
          </ul>
    </body>
    </html>`;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("The extension has been deactivated");
}
