// vscode module contains the API for creating the extensions
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

// The activate function is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  let currentPannel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand("firstextension.start", () => {
      // Get the column to show the webview in : The current column that has focus
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (currentPannel) {
        vscode.window.showInformationMessage("Extension is Running ... ");
        // If we already have an active pannel just reveal it
        currentPannel.reveal(columnToShowIn);
      } else {
        vscode.window.showInformationMessage("Extension Started");
        currentPannel = vscode.window.createWebviewPanel(
          "webview",
          "Webview Extension",
          vscode.ViewColumn.One,
          { enableScripts: true }
        );
      }

      currentPannel.webview.html = getWebviewContent(currentPannel);

      // Called when the webview pannel is closed
      currentPannel.onDidDispose(
        () => {
          // Stop doing stuff when the pannel is closed
          currentPannel = undefined;
        },
        null,
        context.subscriptions
      );

      // Get state change when the pannels visibility or column changes
      currentPannel.onDidChangeViewState((e) => {
        console.log("View State Change", e.webviewPanel.active);
      });
    })
  );

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
        <button>Add Snippet</button>
        <div style="display: flex; flex-direction: column; margin-top: 32px;">
          <input
            type="text"
            placeholder="Enter Text ... "
            style="padding: 8px 16px; font-size: 1.5rem;"
          />
        </div>
    
        <ul>
          <li><span>List Item One</span> ${readFileData(
            "resources",
            "assets",
            "delete.svg"
          )}</li>
          <li><span>List Item One</span> ${readFileData(
            "resources",
            "assets",
            "expand.svg"
          )}</li>
          <li><span>List Item One</span> ${readFileData(
            "resources",
            "assets",
            "edit.svg"
          )}</li>
        </ul>

      </body>
    </html>
    `;
  }
}

// This method is called when your extension is deactivated
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
