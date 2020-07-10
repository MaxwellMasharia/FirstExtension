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

    pannel.webview.html = getWebviewContent(pannel);
  });

  context.subscriptions.push(ds);

  // Get the resource Uri
  function getResourceUri(pannel: vscode.WebviewPanel, ...paths: string[]) {
    return pannel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, ...paths))
    );
  }

  // Read the svg files
  function readFileData(...paths: string[]) {
    const filePath = path.join(context.extensionPath, ...paths);
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  }
  // Load the webview.html file
  function getWebviewContent(pannel: vscode.WebviewPanel) {
    const imgUri = getResourceUri(pannel, "resources", "assets", "img.jpg");
    const cssUri = getResourceUri(pannel, "resources", "style.css");
    const deleteIconUri = getResourceUri(
      pannel,
      "resources",
      "assets",
      "delete.svg"
    );
    const expandIconUri = getResourceUri(
      pannel,
      "resources",
      "assets",
      "expand.svg"
    );
    const editIconUri = getResourceUri(
      pannel,
      "resources",
      "assets",
      "edit.svg"
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
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          <img src="${imgUri}">
        <button>Add Snippet</button>
        <div style="display: flex; flex-direction: column; margin-top: 32px;">
          <input
            type="text"
            placeholder="Enter Text ... "
            style="padding: 8px 16px; font-size: 1.5rem;"
          />
        </div>
    
        <ul>
          <li><span>List Item One</span> ${readFileData("resources","assets","delete.svg")}</li>
          <li><span>List Item One</span> ${readFileData("resources","assets","expand.svg")}</li>
          <li><span>List Item One</span> ${readFileData("resources","assets","edit.svg")}</li>
        </ul>

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
