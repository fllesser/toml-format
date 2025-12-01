# TOML Format

A simple VS Code extension that uses the system's `taplo` for formatting TOML files.

## Features

- **Formatting**: Uses `taplo fmt` to format TOML documents.
- **Lightweight**: Only focuses on formatting, no LSP or other overhead.

## Requirements

- **Taplo CLI**: You must have `taplo` installed on your system and available in your PATH.
  - Install via Cargo: `cargo install taplo-cli --features full`
  - Or check [Taplo documentation](https://taplo.tamasfe.dev/cli/installation.html) for other methods.

## Usage

- Open a `.toml` file.
- Right-click and select **Format Document**.
- Or use the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and search for **Format Document**.
- You can also enable **Format On Save** in your VS Code settings.

## Development & Installation

To compile, package, and install the extension locally, run:

```bash
npm run dev-install
```

Or manually:

```bash
npm run compile && npx vsce package --out toml-format.vsix && ls -la toml-format.vsix && code --install-extension toml-format.vsix
```
