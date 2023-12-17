# Setup Git environment

🔶 Configure Git for GitHub Actions

<table align=center><td>

```yml
- run: git commit --message 'Automated changes'
# ❌ Please tell me who you are.
# Run
#   git config --global user.email "you@example.com"
#   git config --global user.name "Your Name"
```

<tr><td>

```yml
- uses: actions4git/setup-git@v1
- run: git commit --message 'Automated changes'
# ✅ Committed 3 files
```

</table>

📂 Lets you add additional [safe directories] \
🔑 Configures Git to use `github.token` when pushing/pulling from `github.server_url`
\
👤 Sets up <b>@github-actions\[bot\]</b> as the default Git author

## Usage

![Git](https://img.shields.io/static/v1?style=for-the-badge&message=Git&color=F05032&logo=Git&logoColor=FFFFFF&label=)
![GitHub Actions](https://img.shields.io/static/v1?style=for-the-badge&message=GitHub+Actions&color=2088FF&logo=GitHub+Actions&logoColor=FFFFFF&label=)

**🚀 Here's what you want:**

```yml
on: push
jobs:
  job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions4git/setup-git@v1
      - run: npx --yes prettier --write .
      - run: git add --all
      - run: git commit --message 'Prettier' # ✅
      - run: git push
```

### Inputs

⚠️ Support for choosing a `git-version` is not yet implemented. Contributions
are welcome! ❤️

- **`github-token`:** GitHub token to use for authentication when pulling and
  pushing to the GitHub instance defined by `github-server-url`. By default this
  is unset. You can set this to `github.token` or a personal access token if you
  want to configure GitHub authentication globally.

- **`github-server-url`:** Server URL like `https://github.example.org` to use
  as the scope for the `github-token`. By default this uses `github.server_url`
  which is usually `https://github.com`. You shouldn't need to change this.

- **`user`:** A `Name Here <emailhere@example.org>` AiO user name & email
  string. This is a shortcut alternative to the independant `user-name` and
  `user-email` options that are also available. This defaults to
  <b>@github-actions\[bot\]</b>. You can set this to the special value
  `github-actions` to use the <b>@github-actions\[bot\]</b> user as the author,
  or the special `me` value to use the current `github.actor` user as the
  author.

- **`user-name`:** The name of the user. Should be left unspecified if `user` is
  specified.

- **`user-email`:** The email of the user. Should be left unspecified if `user`
  is specified.

- **`safe-directory`:** A multiline list of globs to add to the Git
  `safe-directory` list. Defaults to the current directory `.`.

### Outputs

TODO!

## Development

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)

**How do I test my changes?**

Open a Draft Pull Request and some magic GitHub Actions will run to test the
action.

<!-- prettier-ignore-start -->
[safe directories]: https://git-scm.com/docs/git-config/2.35.2#Documentation/git-config.txt-safedirectory
<!-- prettier-ignore-end -->
