---
title: "LeOS - Embedded OS for ARM 64"
linkTitle: "LeOS"
date: 2020-03-19T12:31:15+01:00
draft: false
description: "LeOS - Löwenware embedded OS for ARM 64"
weight: -80
author: "Ilja K."
details: "Embedded OS for ARM 64"
sticky: false
publication: false
navigation: true
comments: false
project:
  tag: "leos"
  github: "lowenware/leos-kernel"

---

The project of new OS is currently in active development stage. LeOS Kernel is being written from
scratch in Rust programming language with incapsulation of AArch64 assembly. Development process,
as well as operating system itself, is open and free.

## LeOS Goals

* To be modern free and innovative operating system for ARM 64 based computers, tablets and
smartphones
* Focus on embedded design: OS optimised for hardware without redundant drivers and code
* Achieve fast OS startup: less then 10 seconds from power on to graphics shell
* Increase battery life by optimized power consumption
* Be open, secure and protect your privacy
* To provide friendly and comfortable environment for programmers to build and distribute their
software

## Target Hardware

- [QEMU](https://www.qemu.org/) Virtual Device is the base platform for development stage
- [Pine64](https://www.pine64.org/) computers are the main target platform
- [Raspberry Pi](https://www.raspberrypi.org/) secondary target platform
- Custom boards and devices

## Contribution

LeOS project is open! There are plenty of ways how one can become a part of it:

* Join OS design [brainstormings](https://gitter.im/lowenware/Lobby)
* Send a pull request on [GitHub](https://github.com/lowenware/leos-kernel.git)
* Extend project documentation
* Help with porting to new hardware
* Have own idea? [Describe it](/contact/)!

