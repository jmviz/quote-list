const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	
	let quoteListPrimary = vscode.commands.registerCommand(
		'extension.quoteListPrimary', () => quoteListHandler("primary")
	);
	context.subscriptions.push(quoteListPrimary);
	let quoteListSecondary = vscode.commands.registerCommand(
		'extension.quoteListSecondary', () => quoteListHandler("secondary")
	);
	context.subscriptions.push(quoteListSecondary);
	let quoteListTertiary = vscode.commands.registerCommand(
		'extension.quoteListTertiary', () => quoteListHandler("tertiary")
	);
	context.subscriptions.push(quoteListTertiary);
	let quoteListInput = vscode.commands.registerCommand(
		'extension.quoteListInput', () => quoteListHandler("input")
	);
	context.subscriptions.push(quoteListInput);
	let quoteListCustom = vscode.commands.registerCommand(
		'extension.quoteListCustom', (args) => quoteListHandler("custom", args)
	);
	context.subscriptions.push(quoteListCustom);
}

function deactivate() {}

function quoteListHandler(type, args) {
	let config = vscode.workspace.getConfiguration('quoteList');
	let sep = config.separator;
	let q0 = "", q1 = q0;
	let quoteType = type + "Quote";
	if (quoteType in config) q1 = q0 = config[quoteType];
	if (args) {
		if ("quoteLeft" in args && "quoteRight" in args) {
			[q0, q1] = [args.quoteLeft, args.quoteRight];
		} else if ("quote" in args) {
			q1 = q0 = args.quote;
		}
		if ("separator" in args) sep = args.separator;
	}
	if (type == "input") {
		vscode.window.showInputBox({
			ignoreFocusOut: true,
			prompt: 'Enter quote string'
		}).then(q => {
			if (q && q !== undefined && q.length > 0) {
				let sym = config.surroundingPairs;
				if (q in sym) {
					[q0, q1] = [q, sym[q]];
				} else {
					q1 = q0 = q;
				}
				makeEdit(sep, q0, q1);
			}  
		});
	} else {
		makeEdit(sep, q0, q1);
	}
}

function makeEdit(sep, q0, q1) {
	let editor = vscode.window.activeTextEditor;
	if (!editor) return;
	let doc = editor.document;
	editor.edit(edit => {
		for (let sel of editor.selections) {
			let text = doc.getText(sel);
			let quotedText = quoteList(text, sep, q0, q1);
			edit.replace(sel, quotedText);
		}
	})
}

function quoteList(text, sep, q0, q1) {
	let quotedText = "";
	let items = text.split(sep);
	if (items.length == 1) return items[0];
	for (let [i, item] of items.entries()) {
		let start = item.match(/^\s*/)[0];
		let end = item.match(/\s*$/)[0];
		item = item.trim();
		let s = (i < items.length - 1) ? sep : "";
		quotedText += start + q0 + item + q1 + s + end;
	}
	return quotedText;
}

module.exports = {
	activate,
	deactivate
}
