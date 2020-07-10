// vscode module contains the API for creating the extensions
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

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

    // setTimeout(() => {
    //   pannel.webview.postMessage({
    //     message: "Maxwells Loves Java and Javascript",
    //   });
    // }, 5000);

    pannel.webview.html = getWebviewContent(context);
    // pannel.webview.onDidReceiveMessage(
    //   ({ message }) => {
    //     vscode.window.showInformationMessage(message);
    //   },
    //   undefined,
    //   context.subscriptions
    // );
  });

  context.subscriptions.push(ds);

  // Load the webview.html file
  function getWebviewContent(context: vscode.ExtensionContext) {
    // Get the location of the extension
    const extensionPath = context.extensionPath;
    // console.log("Extension Path : ", extensionPath);
    const webviewFilePath = path.join(extensionPath, "media", "webview.html");
    // console.log("Webview.html Path : ", webviewFilePath);

    return fs.readFileSync(webviewFilePath, { encoding: "utf-8" });
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("The extension has been deactivated");
}
