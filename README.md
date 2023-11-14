# Setup Git environment

🔶 Install and configure Git for GitHub Actions

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

![GitHub Actions](https://img.shields.io/static/v1?style=for-the-badge&message=GitHub+Actions&color=2088FF&logo=GitHub+Actions&logoColor=FFFFFF&label=)

**🚀 Here's what you want:**

```yml
on: push
jobs:
  job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions4git/setup-git@v1
      - run: git clone "https://github.com/$GITHUB_REPOSITORY.git" . # ✅
      - run: npx --yes prettier --write .
      - run: git add --all
      - run: git commit --message 'Prettier' # ✅
      - run: git push # ✅
```

### Inputs

⚠️ Support for choosing a `git-version` is not yet implemented. Contributions
are welcome! ❤️

- **`github-token`:** GitHub token to use for authentication when pulling and
  pushing to the GitHub instance defined by `github-server-url`. By default this
  uses `github.token`. Change this to a personal access token if you intend to
  do things that go beyond the scope of the current repository.

- **`github-server-url`:** Server URL like `https://github.example.org` to use
  as the scope for the `github-token`. By default this uses `github.server_url`
  which is usually `https://github.com`. You shouldn`t need to change this.

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

<!-- prettier-ignore-start -->
[safe directories]: https://git-scm.com/docs/git-config/2.35.2#Documentation/git-config.txt-safedirectory
<!-- prettier-ignore-end -->
