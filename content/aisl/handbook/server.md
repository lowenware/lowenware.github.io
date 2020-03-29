---
title: "Server"
date: 2020-03-21T10:45:44+01:00
draft: false
description: "AISL server documentation"
weight: 120

author: "Ilja K."
details: "Built-in HTTP server"
sticky: false
publication: false
comments: false
---

```c
/* @file aisl/types.h */

typedef struct aisl_server * AislServer;
```

Pointer of this type represents HTTP server. Memory allocation and release
are done inside the library according to provided [configuration](/aisl/handbook/configuration/)
for [aisl_new](/aisl/handbook/instance/#function-aisl_new) function.

## Events

`AislServer` can be a source of the following [events](/aisl/handbook/events-model/#type-aislevent):

*   `AISL_EVENT_SERVER_READY`
*   `AISL_EVENT_SERVER_ERROR`

## Functions

*   [aisl_server_get_instance](#function-aisl_server_get_instance)
*   [aisl_server_get_address](#function-aisl_server_get_address)
*   [aisl_server_get_ssl](#function-aisl_server_get_ssl)

---

### Function aisl\_server\_get\_instance

Gets [AislInstance](/aisl/handbook/instance/) associated with `AislServer`

```c
AislInstance
aisl_server_get_instance(AislServer server);
```

#### Arguments

*   `server` — `AislServer` pointer

#### Return value

Associated [AislInstance](/aisl/handbook/instance/)

---

### Function aisl\_server\_get\_address

Copies server address and port to provided sockaddr_in structure

```c
void
aisl_server_get_address(AislServer server, struct sockaddr_in *address);
```

#### Arguments

*   `server` — an `AislServer` pointer
*   `address` — a pointer to an output structure

#### Return value

Returns no value.

---

### Function aisl\_server\_get\_ssl

Checks if server works on HTTPS (secure) or HTTP (unsecure) protocol

```c
bool
aisl_server_get_ssl(AislServer server);
```

#### Arguments

*   `server` — `AislServer` pointer

#### Return value

*   `true` — if server is secure
*   `false` — if server is unsecure

---

