---
title: "Dotrix"
date: 2021-02-14T20:34:16+01:00
draft: false
description: Dotrix - Game Engine in Rust
weight: -90
author: "Ilja K."
details: "Game Engine in Rust"
sticky: false
publication: false
navigation: true
comments: false
project:
  github: "lowenware/dotrix"
  tag: "dotrix"
  version: "0.2.0"
---

Dotrix is a game engine written in Rust. The core is following an ECS (Entity Component System)
programming pattern. The renderer is based on [WGPU](https://wgpu.rs), that makes possible
crossplatform compilations for Linux, Mac and Windows, using native backends Vulkan, Metal and
Direct X respectively.

The engine is Open Source and available under MIT and Apache licences.

Available features are:

- Rendering pipelines

- Assets management

- Skeletal animation

- SkyBox

- Marching cubes based terrain

- UI using [EGUI](https://github.com/emilk/egui)

## Editor

As soon as Dotrix became functional we've started the implementation of an Editor application
which is also open source and available on GitHub in its own repository
[lowenware/dotrix-editor](https://github.com/lowenware/dotrix-editor).

It is in under heavy development process which is targeted to achieve a major goal: full functional
editor for marching cubes based terrain.

