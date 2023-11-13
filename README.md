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

🔢 Lets you pick a specific version of Git to use (if needed) \
⚡ Defaults to using the system version of Git \
📂 Lets you add additional [safe directories] \
🔑 Properly configures Git to use the `github.token` by default \
👤 Sets up <b>@github-actions\[bot\]</b> as the default Git author

## Usage

![GitHub Actions](https://img.shields.io/static/v1?style=for-the-badge&message=GitHub+Actions&color=2088FF&logo=GitHub+Actions&logoColor=FFFFFF&label=)

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
      - run: git commit --message 'Prettier'
      - run: git push
```
