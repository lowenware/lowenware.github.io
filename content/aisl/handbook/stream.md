---
title: "Stream"
date: 2020-03-21T10:45:53+01:00
draft: false
description: AISL stream documentation
weight: 140

author: "Ilja K."
details: "Receive and send data"
sticky: false
publication: false
comments: false
---

```c
/* @file aisl/types.h */

typedef struct aisl_stream * AislStream;
```

A pointer of this type represents a sequence of a request from 
[AislClient](/aisl/handbook/client/) and a response from the application. First by 
handling events you can get any or all the data from the HTTP request being
parsed, and then write the response to the stream.

Each stream has own extandable internal buffer that is used to store the 
response. When you write to the stream using one of the appropriate functions,
the date is being written to this buffer first.

Application must respect the order of write calls to keep response structure: 
response code, headers, body. For more information refer description of
[response functions](#response-functions).

`AislStream` can be a source of the following [events](/aisl/handbook/events-model/#type-aislevent):

*   `AISL_EVENT_STREAM_OPEN`
*   `AISL_EVENT_STREAM_HEADER`
*   `AISL_EVENT_STREAM_INPUT`
*   `AISL_EVENT_STREAM_REQUEST`
*   `AISL_EVENT_STREAM_OUTPUT`
*   `AISL_EVENT_STREAM_CLOSE`
*   `AISL_EVENT_STREAM_ERROR`

## Control Functions
*   [aisl_is_secure](#function-aisl_get_secure)
*   [aisl_get_server](#function-aisl_get_server)
*   [aisl_get_client](#function-aisl_get_client)
*   [aisl_get_instance](#function-aisl_get_instance)
*   [aisl_get_http_version](#function-aisl_get_http_version)
*   [aisl_set_context](#function-aisl_set_context)
*   [aisl_get_context](#function-aisl_get_context)
*   [aisl_set_output_event](#function-aisl_set_output_event)
*   [aisl_get_output_event](#function-aisl_get_output_event)

##   Response Functions:
*   [aisl_response](#function-aisl_response)
*   [aisl_header](#function-aisl_header)
*   [aisl_header_printf](#function-aisl_header_printf)
*   [aisl_header_vprintf](#function-aisl_header_vprintf)
*   [aisl_printf](#function-aisl_printf)
*   [aisl_vprintf](#function-aisl_vprintf)
*   [aisl_write](#function-aisl_write)
*   [aisl_puts](#function-aisl_puts)
*   [aisl_flush](#function-aisl_flush)
*   [aisl_reject](#function-aisl_reject)

---

### Function aisl\_get\_server

Gets [AislServer](/aisl/handbook/server/) associated with `AislStream`

```c
AislServer
aisl_get_server(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

Associated [AislServer](/aisl/handbook/server/)

---

### Function aisl\_get\_get\_client

Gets [AislClient](/aisl/handbook/client/) associated with `AislStream`

```c
AislClient
aisl_get_client(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

Associated [AislClient](/aisl/handbook/client/)

---

### Function aisl\_get\_instance

Gets [AislInstance](/aisl/handbook/instance/) associated with `AislStream`

```c
AislInstance
aisl_get_instance(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

Associated [AislInstance](/aisl/handbook/instance/)


---

### Function aisl\_is\_secure

Checks if stream is secured with HTTPS

```c
bool aisl_is_secure(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

*   `true` — when stream is secure
*   `false` — when stream is unsecure

---

### Function aisl\_get\_http\_version

Gets an HTTP version requested by client

```c
AislHttpVersion
aisl_get_http_version(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

[AislHttpVersion](/aisl/handbook/enumerations/#type-aislhttpversion) constant

---

### Function aisl\_set\_context

Stores user-defined context pointer inside stream object. That pointer can
be obtained from `AislStream` object during its life time. It is up to developer,
how to use `AislStream` context.

```c
void
aisl_set_context(AislStream stream, void *context);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `context` — data pointer

#### Return value

Returns no value.

---

### Function aisl\_get\_context

Gets previously stored with [aisl_set_context](#function-aisl_set_context) context pointer.

```c
void *
aisl_get_context(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

Previously stored context pointer

---

### Function aisl\_set\_output\_event

Switches triggering of `AISL_EVENT_STREAM_OUTPUT` on and off. Initial value for
any `AislStream` is `false`, so event is not triggered by default. Developer
may want to use that event for sending chunks of big files.

```c
void
aisl_set_output_event(AislStream stream, bool value);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `value` — true to enable and false to disable event triggering

#### Return value

Returns no value.

---

### Function aisl\_get\_output\_event

Gets current state of `AISL_EVENT_STREAM_OUTPUT` switch.

```c
bool
aisl_get_output_event(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

*   `true` — when event triggering is enabled
*   `false` — when event triggering is disabled

---

### Function aisl\_response

Starts an HTTP response with user defined status code and content length.
If content length is unknown at this stage, it could be calculated automatically
during response output if `AISL_AUTO_LENGTH` passed, otherwise it is
the best practice to provide content length in a very begining with this call.

Function must be called just once for a stream before any other response
function.

```c
AislStatus
aisl_response(AislStream stream, AislHttpResponse status_code, uint64_t content_length);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `status_code` — constant from [AislHttpResponse](/aisl/handbook/enumerations/#type-aislhttpresponse) enumeration
*   `content_length` — content length in bytes or `AISL_AUTO_LENGTH` to calculate it on the fly

#### Return value

*   `AISL_SUCCESS` — when data was written to the buffer sucessfully
*   `AISL_IDLE` — when response was already started
*   `AISL_MALLOC_ERROR` — when buffer reallocation failed

---

### Function aisl\_header

Writes HTTP header at the end of a stream buffer. This function should be called
only before any data was written to a response body.

```c
int
aisl_header(AislStream stream, const char *key, const char *value);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `key` — HTTP header key
*   `value` — HTTP header value

#### Return value

Length of data written to the stream buffer, or -1 if memory allocation or 
stream workflow error occured

---

### Function aisl\_header\_printf

Writes an HTTP header with a formatted value at the end of a stream buffer.

This function could be called only before any data was written to a response body.

This function works similar to `printf` standard library function.

```c
int
aisl_header_printf(AislStream stream, const char *key, const char *format, ...);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `key` — HTTP header key
*   `format` — format string for value
*   `...` — comma separated variable number of arguments

#### Return value

Length of data written to the stream buffer, or -1 if memory allocation or stream workflow error occured

---

### Function aisl\_header\_vprintf

Writes HTTP header with a formatted value at the end of a stream buffer, just
like [aisl_header_printf](#function-aisl_header_printf), with exception that it
uses `va_list` macro instead of a variable number of arguments.

This function could be called only before any data was written to a response body.

This function works similar to `vprintf` standard library function.

```c
int
aisl_header_vprintf(AislStream stream, const char *key, const char *format, va_list args);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `key` — HTTP header key
*   `format` — format string for value
*   `args` — `va_list` arguments macro

#### Return value

Length of data written to the stream buffer, or -1 if memory allocation or stream workflow error occured

---

### Function aisl\_printf

Writes a formatted body (content) of an HTTP response at the end of a stream buffer.

After a call of this function, you may not use header output calls anymore.

This function works similar to `printf` standard library function.

```c
int
aisl_printf(AislStream stream, const char *format, ...);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `format` — output format string
*   `...` — comma separated variable number of arguments

#### Return value

Length of data written to the stream buffer, or -1 if memory allocation or stream workflow error occured

---

### Function aisl\_vprintf

Writes a formatted body (content) of an HTTP response at the end of a stream
buffer, just like [aisl_printf](#function-aisl_printf), with exception except that it uses 
`va_list` instead of a variable number of arguments.

This function works similar to `printf` standard library function.

```c
int
aisl_vprintf(AislStream stream, const char *format, va_list args);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `format` — output format string
*   `args` — `va_list` arguments macro

#### Return value

Length of data written to the stream buffer, or -1 if memory allocation or stream workflow error occured

---

### Function aisl\_write

Writes a part of an HTTP response content of the given length at the end of a stream buffer.

```c
int
aisl_write(AislStream stream, const char *data, int d_len);
```

#### Arguments

*   `stream` — `AislStream` pointer
*   `data` — a pointer to a data array
*   `d_len` — a length of the data to be written

#### Return value

Length of data written to the stream buffer, or -1 if memory allocation or stream workflow error occured

---

### Function aisl\_puts

Writes a NULL-terminated string as a part of an HTTP response content at the end of a stream buffer.

```c
int
aisl_puts(const char *str_data, AislStream stream);
```

#### Arguments

*   `str_data` — a pointer to a NULL-terminated string
*   `stream` — `AislStream` pointer

#### Return value

Length of data written to the stream buffer, or -1 if memory allocation or stream workflow error occured

---

### Function aisl\_flush

```c
AislStatus
aisl_flush(AislStream stream);
```

Initiates transmission of a stream buffer if it was not started before. At this
stage `Content-Type`, `Content-Length`, `Connection` and `Server` headers will
be added to a response if they were not added manualy before. If `AISL_AUTO_LENGTH`
were given as a `content_length` to an `aisl_response`, it will be automatically
calculated from a stream buffer size.

After this call all other response functions will return -1.

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

*   `AISL_SUCCESS` — when operation was successful
*   `AISL_MALLOC_ERROR` — when system run out of memory

---

### Function aisl\_reject

Rejects the stream and closes client connection.

```c
void
aisl_reject(AislStream stream);
```

#### Arguments

*   `stream` — `AislStream` pointer

#### Return value

Returns no value.

---
