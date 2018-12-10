---
title: Contributing
---

# Contributing

## Local Development
_Coming Soon_

## Reporting Issues
When filing a bug report, your issue should contain a title and a clear description of the issue. You should include as much relevant information as possible and a code sample that demonstrates the issue. The goal of a bug report is to make it easy for yourself - and others - to replicate the bug and develop a fix.

Remember, bug reports are created in the hope that others with the same problem will be able to collaborate with you on solving it. Do not expect that the bug report will automatically see any activity or that others will jump to fix it. Creating a bug report serves to help yourself and others start on the path of fixing the problem.

## Pull Requests
### New Features
For new features, please open an issue in the issue tracker to discuss the feature. We'd hate to see you put a lot of effort into something only for it to be rejected for any reason!

If you propose a new feature or drastic change to any existing functionality, please be willing to implement at least some of the code that would be needed to complete the feature.

Please open one pull request per feature. If you're wanting to add or do multiple things, send multiple pull requests.

### Branches
Please create a feature branch. We will not accept pull requests from your master branch.

## Coding Standards
We follow the [PSR-2 coding standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md) - don't worry if your code isn't perfect in this regard, we will apply automatic styling when merging. Being as close as possible to the standard helps when we manually review your code.

## Documentation
Documentation is hosted within it's own [repository](https://github.com/caffeinated/website). Pages are written in markdown and rendered through the use of [VuePress](https://vuepress.vuejs.org/). After installing the necessary dependencies through `yarn`, you can start writing and contributing to the documentation locally by running the `yarn docs:dev` command. This will spin up a server instance and start watching and compiling any newly added or modified markdown file.

When you're happy with your work and are ready to send a pull request, close your server and compile the documentation for production by running `yarn docs:build`. This will generate the static files used on the server.