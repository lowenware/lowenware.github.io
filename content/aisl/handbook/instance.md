---
linkTitle: "Instance"
title: "AISL Instance Type and Functions"
date: 2020-03-21T10:45:38+01:00
draft: false
description: "AISL instance documentation"
weight: 110

author: "Ilja K."
details: "Allocation, release and run cycle"
sticky: false
publication: false
comments: false
---

```c
/* @file aisl/types.h */

typedef struct aisl_instance * AislInstance;
```

Pointer of this type represents library engine instance. One instance can
run several independent HTTP servers on different network sockets.

## Functions

*   [aisl_new](#function-aisl_new)
*   [aisl_free](#function-aisl_free)
*   [aisl_run_cycle](#function-aisl_run_cycle)
*   [aisl_sleep](#function-aisl_sleep)

---

### Function aisl\_new

A constructor of AislInstance type.

```c
AislInstance
aisl_new(const struct aisl_cfg *cfg);
```

#### Arguments

*   `cfg` — a pointer to [aisl_cfg](/aisl/handbook/configuration/#structure-aisl_cfg) configuration structure

#### Return value

Pointer to an `AislInstance` or `NULL` if out of memory.

---

### Function aisl\_free

A destructor of `AislInstance` object.

```c
void
aisl_free(AislInstance instance);
```

#### Arguments

*   `instance` — a pointer to an `AislInstance`.

#### Return value

Returns no value.

---

### Function aisl\_run\_cycle

Performs an engine work cycle including all queued read and write sockets
operations, accepts new clients and triggers engine events. Should be called
periodically in a main loop of the application.

```c
AislStatus
aisl_run_cycle(AislInstance instance);
```

#### Arguments

*   `instance` — a pointer to an `AislInstance`.

#### Return value

*   `AISL_SUCCESS` — if some event was triggered
*   `AISL_IDLE` — if no event was triggered
*   `AISL_MALLOC_ERROR` — if system run out of memory
*   `AISL_SYSCALL_ERROR` — if some system call failed

Return value handling should be soft. It is completely safe to continue program execution even if error value was returned.

To preserve CPU time it is recommended to add a delay between
[aisl_run_cycle](#function-aisl_run_cycle) calls, at least if anything but
`AISL_SUCCESS` has been returned. You may want to use
[aisl_sleep](#function-aisl_sleep) for this.

---

### Function aisl\_sleep

This function runs select system call inside on all opened sockets for read or write depending on a stream state for user defined timeout.

```c
AislStatus
aisl_sleep(AislInstance instance, uint32_t usec);
```

#### Arguments

*   `instance` — a pointer to an `AislInstance`.
*   `usec` — a maximum possible timeout in microseconds for execution blocking

#### Return value

*   `AISL_SUCCESS` — if some socket is ready for an operation
*   `AISL_IDLE` — if timed out without any activity on sockets
*   `AISL_SYSCALL_ERROR` — if select() system call failed
---
