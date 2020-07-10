// vscode module contains the API for creating the extensions
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

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

  let ds = vscode.commands.registerCommand("firstextension.start", () => {
    vscode.window.showInformationMessage("Webview extension started");

    const pannel = vscode.window.createWebviewPanel(
      "webview",
      "Webview Extension",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    pannel.webview.html = getWebviewContent(context, pannel);
  });

  context.subscriptions.push(ds);

  // Load the webview.html file
  function getWebviewContent(
    context: vscode.ExtensionContext,
    pannel: vscode.WebviewPanel
  ) {
    const imgLocationOnDisk = vscode.Uri.file(
      path.join(context.extensionPath, "resources", "assets", "img.jpg")
    );

    const imgUri = pannel.webview.asWebviewUri(imgLocationOnDisk);

    const cssUri = pannel.webview.asWebviewUri(
      vscode.Uri.file(
        path.join(context.extensionPath, "resources", "style.css")
      )
    );

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Snippet Generator</title>
      </head>
      <link rel="stylesheet" href="${cssUri}">
      <body>
          <img src="${imgUri}">
        <button>Add Snippet</button>
        <div style="display: flex; flex-direction: column; margin-top: 32px;">
          <input
            type="text"
            placeholder="Enter Text ... "
            style="padding: 8px 16px; font-size: 1.5rem;"
          />
        </div>
    
        <h1></h1>
        <ul>
          <li><span>List Item One</span></li>
          <li><span>List Item Two</span></li>
          <li><span>List Item Three</span></li>
        </ul>
        <script></script>
      </body>
    </html>
    `;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("The extension has been deactivated");
}

/*
 * Example of loading js from another file : External files
 * const extensionPath = context.extensionPath;
 * const scriptPathOnDisk = vscode.Uri.file(path.join(extensionPath,"media","main.js"));
 * const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
 *
 * in html
 * <script src="${scriptUri}"/>
 */
