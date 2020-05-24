---
title: "How to Try"
date: 2020-03-19T16:44:29+01:00
draft: false
description: "How to try LeOS"
weight: 110

author: "Ilja K."
sticky: true
publication: false
navigation: false
comments: false
details: "With QEMU"
---

At this moment you can try LeOS using [QEMU](https://qemu.org/) emulator. For development and 
debug simplicity this is currently the only supported platform. When LeOS kernel is ready, it will
be ported to real hardware, which is supposed to be
- [Pine64](https://www.pine64.org/),
- [Raspberry Pi](https://www.raspberrypi.org/).

## Tools you need

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
