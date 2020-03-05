# Quote List

Quote each element of a list.

## Usage

Select a comma-separated list. Press `ctrl+shift+'` (macOS: `cmd+shift+'`). 

```
foo, bar baz, https://foo.bar, 🦆
```

becomes

```
"foo", "bar baz", "https://foo.bar", "🦆"
```

For single quotes, use `ctrl+'` (macOS: `cmd+'`). For backticks, use `ctrl+alt+'` (macOS: `cmd+alt+'`). You can also specify custom quotes and separators (see below).

Leading and trailing whitespace (or lack thereof) between items is preserved.

```
foo,bar,baz
```

becomes

```
"foo","bar","baz"
```

and 

```
foo,
bar,
baz
```

becomes

```
"foo",
"bar",
"baz"
```

To specify a quote string on the fly from user input, use `alt+shift+'`. This assumes you want the same string to be the left and right quote, unless the string is in `quoteList.surroundingPairs`. By default, if you enter `(`, `{`, or `[`, that string will be the left quote and the right quote will be `)`, `}`, or `]`, respectively.


## Customization

The defaults for the standard commands are below. For macOS, `cmd` is used in place of `ctrl`. The default quotes and separator are configurable in the extension settings. To adjust the keybindings, search for the command in the Keyboard Shortcuts menu.

| Command                       | Keybinding     | Quote
| ----------------------------- | -------------- | -----------
| `Quote List: Primary Quote`   | `ctrl+shift+'` | `"`
| `Quote List: Secondary Quote` | `ctrl+'`       | `'`
| `Quote List: Tertiary Quote`  | `ctrl+alt+'`   | `` ` ``
| `Quote List: Input Quote`     | `alt+shift+'`  | [user input]

The default for `quoteList.surroundingPairs` is `{"(": ")", "{": "}", "[": "]"}`. You can add to and remove from this by specifying it in settings.json.

To create a new keybinding with custom quote and separator, add the following to keybindings.json, replacing the values for `key`, `args.quote`, and `args.separator` as desired:

```
{
    "command": "extension.quoteListCustom",
    "key": "ctrl+alt+shift+'",
    "when": "editorTextFocus && !editorReadonly",
    "args": {
        "quote": "*",
        "separator": ";"
    }
}
```

You can create as many keybindings with different `args` for `extension.quoteListCustom` as you like in this way. If you want different left and right quotes, you can specify them like so:

```
"args": {
    "quoteLeft": "<",
    "quoteRight": ">",
    "separator": ";"
}
```