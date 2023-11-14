import assert from "node:assert/strict";
import { $ } from "execa";
import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import { glob } from "glob";

const githubContext = {
  actor: process.env.GITHUB_ACTOR!,
  actor_id: process.env.GITHUB_ACTOR_ID!,
  server_url: process.env.GITHUB_SERVER_URL!,
};

function getNameEmailInput(
  input: string,
  options: { required: true }
): [string, string];
function getNameEmailInput(
  input: string,
  options?: { required?: boolean }
): [string | null, string | null];
function getNameEmailInput(
  input: string,
  options: { required?: boolean } = {}
) {
  const { required = false } = options;
  const githubActionsRe = /^\s*@?github[-_]?actions(?:\[bot\])?\s*$/;
  const meRe = /^\s*@?me\s*$/;
  const short = core.getInput(input);
  let name: string | null;
  let email: string | null;
  if (short) {
    assert.equal(core.getInput(`${input}-name`), "");
    assert.equal(core.getInput(`${input}-email`), "");
    if (githubActionsRe.test(short)) {
      name = "github-actions[bot]";
      email = "41898282+github-actions[bot]@users.noreply.github.com";
    } else if (meRe.test(short)) {
      name = githubContext.actor;
      email = `${githubContext.actor_id}+${githubContext.actor}@users.noreply.github.com`;
    } else {
      const matched = short.match(/^\s*(.+)\s+<(.+)>\s*$/)?.slice(1);
      assert(matched);
      [name, email] = matched;
    }
  } else {
    name = core.getInput(`${input}-name`, { required }) || null;
    email = core.getInput(`${input}-email`, { required }) || null;
  }
  return [name, email];
}

const githubToken = core.getInput("github-token");
const githubServerURL = core.getInput("github-server-url");
const [userName, userEmail] = getNameEmailInput("user");
const safeDirectoryGlobs = core.getMultilineInput("safe-directory");
const safeDirectories = await glob(safeDirectoryGlobs);

if (userName && userEmail) {
  await $({ stdio: "inherit" })`git config --global user.name ${userName}`;
  await $({ stdio: "inherit" })`git config --global user.email ${userEmail}`;
}

const prefix = new URL(githubServerURL).origin + "/";
await $({
  stdio: "inherit",
})`git config --global http.${prefix}.extraheader ${`AUTHORIZATION: basic ${githubToken}`}`;

for (const safeDirectory of safeDirectories) {
  await $({
    stdio: "inherit",
  })`git config --global --add safe.directory ${safeDirectory}`;
}
