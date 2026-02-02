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

- [x] Avatar
- [x] AlertDialog
- [x] Button
- [x] Card
- [x] Checkbox
- [x] Container
- [x] DateInput
- [x] DropdownMenu
- [x] FileInput
- [x] Form
- [x] Image
- [x] Input
- [x] Link
- [ ] List
- [x] Modal
- [x] NumberInput
- [x] SearchInput
- [x] Select
- [x] Slider
- [x] Switch
- [x] Tabs
- [x] Tag
- [x] TagArea
- [x] TextArea
- [x] Toast
- [x] Tooltip
- [ ] Kanban
- [x] ThemeSwitch
- [x] ColorPicker
- [x] Navbar
- [x] Drawer
- [ ] Table

### TODO dark theme

- [ ] Avatar
- [ ] AlertDialog
- [ ] Button
- [ ] Card
- [ ] Checkbox
- [ ] Container
- [ ] DateInput
- [ ] DropdownMenu
- [ ] FileInput
- [ ] Form
- [ ] Image
- [ ] Input
- [ ] Link
- [ ] List
- [ ] Modal
- [ ] NumberInput
- [ ] SearchInput
- [ ] Select
- [ ] Slider
- [ ] Switch
- [ ] Tabs
- [ ] Tag
- [ ] TagArea
- [ ] TextArea
- [ ] Toast
- [ ] Tooltip
- [ ] Kanban
- [ ] ThemeSwitch
- [ ] ColorPicker
- [ ] Navbar
- [ ] Drawer
- [ ] Table

### TODO (more thorough/complex implementation)

- [ ] DropdownMenu (complex groups etc check kobalte)
- [ ] List (draggable, will be a challenge to integrate with virtualised)
- [ ] Kanban (will be a bit of a beast)
