---
title: "Asycnhronous Internet Server Library"
linkTitle: "AISL"
description: "Lightweight C library for back end development"
date: 2020-03-17T22:39:27+01:00
draft: false
weight: -70
author: "Ilja K."
details: "Back end solution"
sticky: false
publication: false
navigation: true
comments: false
project:
  github: "lowenware/aisl"
  tag: "aisl"
  version: "1.0.5"
---

AISL stands for Asynchronous Internet Server Library. It offers a unique
approach for back end development, by asynchronous event driven algorithms built
over an HTTP stream. 

## Quick start

By using [git](https://git-scm.com) starting a project with AISL is very easy.

```shell
# start a git repo
mkdir my-new-app && cd "$_" && git init
# add AISL as a submodule
git submodule add https://github.com/lowenware/aisl.git
# initialize and start your application
make -f aisl/Makefile quickstart
```

## License

AISL is free for both commercial and non-commercial use, being distributed under terms of [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/).


## Documentation

AISL is written in pure C and can be compiled as a shared or static library.
It is robust, without dependencies and has clear documented API.
