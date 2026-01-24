## UI components for solidpb

Need to add below to vite.config.ts:

```
optimizeDeps: {
  exclude: ["@solidpb/ui-kit"],
},
```

Also to index.css (refer daisyui docs):

```
@plugin "daisyui" {
  themes: {choose theme} --default, {choose theme} --prefersdark;
}
@source "../node_modules/@solidpb/ui-kit";
```

### TODO light theme

- [x] AlertDialog
- [x] Button
- [x] Card
- [x] Checkbox
- [x] Container
- [x] DateInput
- [x] DropdownMenu
- [] FileInput
- [] Form
- [] Image
- [x] Input
- [] Link
- [] List
- [] Modal
- [] NumberInput
- [] Popover
- [] RelationPicker
- [] SearchInput
- [] Select
- [] Slider
- [] Switch
- [] Tabs
- [] Tag
- [] TagArea
- [] TextArea
- [] Toast
- [] Tooltip

### TODO dark theme

- [] AlertDialog
- [] Button
- [] Card
- [] Checkbox
- [] Container
- [] DateInput
- [] DropdownMenu
- [] FileInput
- [] Form
- [] Image
- [] Input
- [] Link
- [] List
- [] Modal
- [] NumberInput
- [] Popover
- [] RelationPicker
- [] SearchInput
- [] Select
- [] Slider
- [] Switch
- [] Tabs
- [] Tag
- [] TagArea
- [] TextArea
- [] Toast
- [] Tooltip

### TODO (more thorough/complex implementation)

- [] DropdownMenu (complex groups etc check kobalte)
- [] List (draggable, will be a challenge to integrate with virtualised)
