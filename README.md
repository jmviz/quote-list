# Quote List

Quote each element of a list.

## Usage

Select a comma-separated list. Press `ctrl+shift+'` (macOS: `cmd+shift+'`) or open Command Palette and enter `Quote List`. 

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

### User Input

To specify separators and quotes on the fly from user input, select text and press `alt+shift+'`, or open Command Palette and enter `Quote List by Input`. You will be prompted to provide the input separator (a JavaScript-style regular expression string to match the desired separator in the selection), the output separator (a string to replace each separator in the selection), and the quote (a string to be placed on the left and right of each item in the selection). For example, to convert a tab-separated list into a single-quoted list separated by commas, with each element on a new line:

starting with:

```
a	b	c
```

providing the following values:

| Prompt | Input
| ------ | -----
| Input Separator | `\t`
| Output Separator | `,\n`
| Quote | `'`

yields:

```
'a',
'b',
'c'
```

By default, if you enter `(`, `{`, or `[` as the quote string from user input, that string will be the left quote and the right quote will be `)`, `}`, or `]`, respectively. You can modify this behavior by providing `quoteList.surroundingPairs` in settings.json. The default is:

```
 "quoteList.surroundingPairs": {
    "(": ")",
    "{": "}",
    "[": "]"
 } 
 ```

### Fallback Separators

If `Quote List` is invoked and the default (or keybinding argument, see below) input separator is not found in the selection, a series of fallback separators will be tried. This behavior can be modified by providing `quoteList.fallbackSeparators` in settings.json (or as an argument in a keybinding, see below). This is an object of key-value pairs of strings, where each key is an input separator regular expression and each value is a corresponding output separator string. Each pair is tried in order until one of the input separators is found in the selection. The default is:

```
"quoteList.fallbackSeparators": {
    "\\t": ", ",
    "\\n": ",\n",
    ":": ", ",
    ";": ", ",
    "\\|": ", ",
    "\\^": ", ",
    "~": ", ",
    " +": ", "
}
```


## Custom Keybindings

To create a new keybinding with custom quotes and separators (or override existing keybindings), add the following to keybindings.json, replacing the value for `key` as desired, and replacing the values for each key in `args` (or omitting the key to use the default) as desired:

```
{
    "command": "extension.quoteList",
    "key": "ctrl+alt+shift+'",
    "when": "editorTextFocus && !editorReadonly",
    "args": {
        "quote": "/",
        "inputSeparator": "\\n",
        "outputSeparator": ";",
        "fallbackSeparators": {
            "\\t": ":",
            "\\s+": "|"
        }
    }
}
```

You can create as many keybindings with different `args` for `Quote List` as you like in this way. If you want different left and right quotes, you can specify them like so, in lieu of `args.quote`:

```
"args": {
    "quoteLeft": "<",
    "quoteRight": ">"
}
```