# Shadcn Icon Picker

A sleek and customizable icon picker component for React, built with shadcn/ui and Tabler Icons.

<div align="center">
  <img src="https://raw.githubusercontent.com/emretuna/shadcn-iconpicker-tabler/refs/heads/main/public/preview.gif" width="600" />
</div>

## Features

- 🎨 Modern and responsive UI
- 🔍 Real-time icon search
- ⚡️ Progressive icon loading
- 🎯 Full Tabler icons support
- 🌗 Dark mode compatible
- 🎛️ Highly customizable

## Installation

### Using npm

```shell
npx shadcn@latest add "https://shadcn-iconpicker-tabler.vercel.app/r/icon-picker"
```

### Using pnpm

```shell
pnpm dlx shadcn@latest add "https://shadcn-iconpicker-tabler.vercel.app/r/icon-picker"
```

### Using Yarn

```shell
npx shadcn@latest add "https://shadcn-iconpicker-tabler.vercel.app/r/icon-picker"
```

### Using Bun

```shell
bunx shadcn@latest add "https://shadcn-iconpicker-tabler.vercel.app/r/icon-picker"
```

## Usage

```tsx
import { IconPicker } from "@/components/ui/iconPicker";

export default function Home() {
  return <IconPicker />;
}
```

## Props

| Prop                 | Type                        | Default                 | Description                                                                              |
| -------------------- | --------------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| `value`              | `IconName`                  | -                       | The controlled value of the selected icon                                                |
| `defaultValue`       | `IconName`                  | -                       | The default value of the selected icon                                                   |
| `onValueChange`      | `(value: IconName) => void` | -                       | Callback invoked when an icon is selected                                                |
| `open`               | `boolean`                   | -                       | Controlled open state of the picker                                                      |
| `defaultOpen`        | `boolean`                   | `false`                 | Default open state of the picker                                                         |
| `onOpenChange`       | `(open: boolean) => void`   | -                       | Callback invoked when the open state changes                                             |
| `children`           | `ReactNode`                 | -                       | The trigger element to open the icon picker                                              |
| `searchable`         | `boolean`                   | `true`                  | Whether the icon picker is searchable                                                    |
| `searchPlaceholder`  | `string`                    | "Search for an icon..." | The placeholder for the search input                                                     |
| `triggerPlaceholder` | `string`                    | "Select an icon"        | The text displayed on the default trigger button when no icon is selected                |
| `iconsList`          | `IconList`                  | all tabler icons        | The list of icons to display in the picker                                               |
| `categorized`        | `boolean`                   | `true`                  | Display icons in categories and add categories buttons to scroll to the desired category |
| `modal`              | `boolean`                   | `false`                 | Whether the icon picker is being rendered in a modal                                     |

## Development

### Clone the repository

```shell
git clone https://github.com/emretuna/shadcn-iconpicker-tabler.git
```

### Install dependencies

```shell
npm install
```

### Start development server

```shell
npm run dev
```

## License

MIT © [Emre Tuna](https://github.com/emretuna)

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the UI components
- [Tabler](https://tabler.io/icons) for the icons
- [Next.js](https://nextjs.org) for the framework
- [Alan](https://github.com/alan-crts/) for the awesome work
