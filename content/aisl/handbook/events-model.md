---
title: "Events Model"
date: 2020-03-21T10:45:23+01:00
draft: false
description: "AISL events model documentation"
weight: 100

author: "Ilja K."
details: "Callbacks are the core of your app"
sticky: false
publication: false
comments: false

---

When application allocates new [AislInstance](/aisl/doc/instance), it shall 
provide a [callback](#type-aislcallback) that will handle events triggered by
AISL.

```c
/* @file aisl/types.h */

#define AISL_CALLBACK(x) ((AislCallback) x)

typedef void
(* AislCallback) (const struct aisl_evt *evt, void *p_ctx);
```

First argument `const struct aisl_evt *evt` contains all necessary data for event
handling.

Second argument is a user-defined pointer, that AISL will pass through form
[configuration](/aisl/doc/configuration/) structure.

```c

struct aisl_evt {
	void         *source;
	AislEvent     code;
	AislStatus    status;
};

```

Application should check `code` value and cast `source` pointer as an 
appropriate type. Property `status` let application to
know the [status](/aisl/doc/enumerations/#type-aislstatus) of operation that
triggered the event.

## Server events

Events that has [AislServer](/aisl/doc/server/) as their source.

* `AISL_EVENT_SERVER_READY` - server started at defined interface and port
* `AISL_EVENT_SERVER_ERROR` - error occured during server workflow

## Client events

Events that has [AislClient](/aisl/doc/client/) as their source.

* `AISL_EVENT_CLIENT_CONNECT` - client connected
* `AISL_EVENT_CLIENT_DISCONNECT` - client disconnected

## Stream events

Events that has [AislStream](/aisl/doc/stream/) as their source.

* `AISL_EVENT_STREAM_OPEN` - HTTP request initiated by client
* `AISL_EVENT_STREAM_HEADER` - HTTP header received from client
* `AISL_EVENT_STREAM_INPUT` - A chunk of HTTP request body received from client
* `AISL_EVENT_STREAM_REQUEST` - HTTP request has been received, clients awaits for response
* `AISL_EVENT_STREAM_OUTPUT` - AISL is ready to send next amount of data
* `AISL_EVENT_STREAM_CLOSE` - resources allocated for stream are about to be released
* `AISL_EVENT_STREAM_ERROR` - error occured during communication

Event payload received in a callback can be also type casted in several cases
for additional data:

* `struct aisl_evt_open *` for `AISL_EVENT_STREAM_OPEN` event

```c
struct aisl_evt_open {
	struct aisl_evt   evt;           /**< generic #aisl_evt structure */
	const char       *path;          /**< HTTP request path */
	const char       *query;         /**< HTTP request query (GET params) */
	AislHttpMethod    http_method;   /**< HTTP request method */
};
```

* `struct aisl_evt_header *` for `AISL_EVENT_STREAM_HEADER` event

```c
struct aisl_evt_header {
	struct aisl_evt   evt;           /**< generic #aisl_evt structure */
	const char       *key;           /**< low case HTTP header name */
	const char       *value;         /**< HTTP header string */
};
```

* `struct aisl_evt_input *` for `AISL_EVENT_STREAM_INPUT` event

```c
struct aisl_evt_input {
	struct aisl_evt   evt;           /**< generic #aisl_evt structure */
	const char       *data;          /**< a pointer to received data array */
	int32_t           size;          /**< data array size */
};
```

## Functions

* [aisl_event_to_string](#function-aisl_event_to_string)

---

### Function aisl\_event\_to\_string

Converts `AislEvent` constant to a NULL-terminated string representation.

```c
const char *
aisl_event_to_string(AislEvent evt);
```

#### Arguments

*   **evt** — `AislEvent' constant

#### Return value

A NULL-terminated string representation of `AislEvent`

---
