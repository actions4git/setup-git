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
🔑 Configures Git to use `github.token` when pushing/pulling from `github.server_url` \
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

⚠️ Support for choosing a `git-version` is not yet implemented. Contributions are welcome! ❤️

### Outputs

<!-- prettier-ignore-start -->
[safe directories]: https://git-scm.com/docs/git-config/2.35.2#Documentation/git-config.txt-safedirectory
<!-- prettier-ignore-end -->
