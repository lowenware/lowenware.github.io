---
title: "How to Try"
date: 2020-03-19T16:44:29+01:00
draft: false
description: "How to try LeOS"
weiht: 110

author: "Ilja K."
sticky: true
publication: false
navigation: false
comments: false
details: "With QEMU"
---

Before you start make sure you have following tools:
* [GIT](https://git-scm.com/)
* [Rust](https://rust-lang.org/) compiler
* Wrapper [cargo-xbuild](https://github.com/rust-osdev/cargo-xbuild)
* [QEMU](https://qemu.org/) processor emulator
* GNU [Make](https://www.gnu.org/software/make/)

## How to start

1. Clone LeOS Kernel repository:
```shell
git clone https://github.com/lowenware/leos-kernel.git
```
2. Compile it:
```shell
cd leos-kernel
make
```
3. Run
```shell
make run
```
