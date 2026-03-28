### moved to [codeberg](https://codeberg.org/davenh99/solidpb-ui-kit)

## UI components for solidjs, based on daisyui and kobalte

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
