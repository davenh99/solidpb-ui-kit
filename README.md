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
- [ ] BreadCrumbs
- [ ] FilterBar
- [ ] ActivityFeed
- [ ] Pagination
