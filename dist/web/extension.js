/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const vscode = __webpack_require__(1);

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	let quoteList = vscode.commands.registerCommand(
		"extension.quoteList", (args) => quoteListHandler("auto", args)
	);
	context.subscriptions.push(quoteList);
	let quoteListInput = vscode.commands.registerCommand(
		"extension.quoteListInput", () => quoteListHandler("input")
	);
	context.subscriptions.push(quoteListInput);
}

function deactivate() {}

function quoteListHandler(type, args) {
	let config = vscode.workspace.getConfiguration("quoteList");
	if (type == "input") {
		makeEditFromInput(config);
		return;
	}
	let inSep = new RegExp(config.inputSeparator);
	let outSep = escape(config.outputSeparator);
	let q0 = escape(config.quote);
	let q1 = q0;
	let fallbackSeps = config.fallbackSeparators;
	if (args) {
		if ("quoteLeft" in args && "quoteRight" in args) {
			[q0, q1] = [args.quoteLeft, args.quoteRight];
		} else if ("quote" in args) {
			q1 = q0 = args.quote;
		}
		if ("inputSeparator" in args) inSep = new RegExp(args.inputSeparator);
		if ("outputSeparator" in args) outSep = args.outputSeparator;
		if ("fallbackSeparators" in args) fallbackSeps = args.fallbackSeparators;
	}
	makeEdit(inSep, outSep, q0, q1, fallbackSeps);
}

function makeEditFromInput(config) {
	vscode.window.showInputBox({
		ignoreFocusOut: true,
		prompt: "Enter regular expression to match input separator",
		value: config.inputSeparator
	}).then(inSep => {
		if (inSep === undefined) return;
		inSep = new RegExp(inSep);
		vscode.window.showInputBox({
			ignoreFocusOut: true,
			prompt: "Enter string for output separator",
			value: unescape(config.outputSeparator)
		}).then(outSep => {
			if (outSep === undefined) return;
			outSep = escape(outSep);
			vscode.window.showInputBox({
				ignoreFocusOut: true,
				prompt: "Enter string for quote",
				value: unescape(config.quote)
			}).then(q => {
				if (q === undefined) return;
				q = escape(q);
				let sym = config.surroundingPairs;
				if (q in sym) {
					[q0, q1] = [q, sym[q]];
				} else {
					q1 = q0 = q;
				}
				makeEdit(inSep, outSep, q0, q1);
			 })
		 })
	 });
}

function escape(s) {
	let charmap = {
		"n": "\n",
		"r": "\r",
		"f": "\f",
		"t": "\t",
		"b": "\b"
	};
	let escaped = s.replace(/\\(.)/g, function(_, char) {
		return (char in charmap) ? charmap[char] : char;
	});
	return escaped;
}

function unescape(s) {
	let charmap = {
		"\n": "\\n",
		"\r": "\\r",
		"\f": "\\f",
		"\t": "\\t",
		"\b": "\\b"
	};
	let unescaped = s.replace(/./g, function(char) {
		return (char in charmap) ? charmap[char] : char;
	});
	return unescaped;
}

function makeEdit(inSep, outSep, q0, q1, fallbackSeps) {
	let editor = vscode.window.activeTextEditor;
	if (!editor) return;
	let doc = editor.document;
	editor.edit(edit => {
		for (let sel of editor.selections) {
			let text = doc.getText(sel);
			let quotedText = quoteList(text, inSep, outSep, q0, q1, fallbackSeps);
			edit.replace(sel, quotedText);
		}
	})
}

function quoteList(text, inSep, outSep, q0, q1, fallbackSeps) {
	let quotedText = "";
	let items = text.split(inSep);
	if (items.length == 1 && fallbackSeps) {
		for (let fInSep in fallbackSeps) {
			items = text.split(new RegExp(fInSep));
			if (items.length > 1) {
				outSep = fallbackSeps[fInSep];
				break;
			}
		}
	}
	if (items.length == 1) {
		return items[0];
	}
	for (let [i, item] of items.entries()) {
		let start = item.match(/^\s*/)[0];
		let end = item.match(/\s*$/)[0];
		item = item.trim();
		let s = (i < items.length - 1) ? outSep : "";
		quotedText += start + q0 + item + q1 + s + end;
	}
	return quotedText;
}

module.exports = {
	activate,
	deactivate
}


/***/ }),
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map