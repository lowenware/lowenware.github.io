---
title: "Enumerations"
date: 2020-03-21T10:47:03+01:00
draft: false
description: AISL various enumerations documentation
weight: 150

author: "Ilja K."
details: "Additional types and constants"
sticky: false
publication: false
comments: false
---

* Type [AislStatus](#type-aislstatus)
* Type [AislHttpVersion](#type-aislhttpversion)
* Type [AislHttpMethod](#type-aislhttpmethod)
* Type [AislHttpResponse](#type-aislhttpresponse)

## Type AislStatus

Enumeration of following constants:

* `AISL_SUCCESS`: successfully executed operation,
* `AISL_IDLE`: operation was not executed or nothing significant was done,
* `AISL_INPUT_ERROR`: some input data provided for operation is incorrect,
* `AISL_EXTCALL_ERROR`: external call has failed,
* `AISL_SYSCALL_ERROR`: system call has failed,
* `AISL_MALLOC_ERROR`: memory allocation has failed.

## Function aisl\_status\_to\_string

Converts `AislStatus` constant to NULL-terminated string.

```c
const char *
aisl_status_to_string(AislStatus status);
```

### Arguments

*   `status` — `AislStatus` constant

### Return value

NULL-terminated string representation of  `AislStatus`

---

## Type AislHttpVersion

Enumeration of following constants:


* `AISL_HTTP_0_9`
* `AISL_HTTP_1_0`
* `AISL_HTTP_1_1`
* `AISL_HTTP_2_0`
```

## Function aisl\_http\_version\_to\_string

Converts `AislHttpVersion` constant to NULL-terminated string.

```c
const char *
aisl_http_version_to_string(AislHttpVersion version);
```


#### Arguments

*   `version` — `AislHttpVersion` constant

#### Return value

NULL-terminated string representation of `AislHttpVersion`

---

## Type AislHttpMethod

Enumeration of following constants:

* `AISL_HTTP_METHOD_UNKNOWN`
* `AISL_HTTP_GET`
* `AISL_HTTP_PUT`
* `AISL_HTTP_POST`
* `AISL_HTTP_HEAD`
* `AISL_HTTP_TRACE`
* `AISL_HTTP_DELETE`
* `AISL_HTTP_OPTIONS`
* `AISL_HTTP_CONNECT`
* `AISL_HTTP_PRI`

#### Function aisl\_http\_method\_to\_string

Converts `AislHttpMethod` constant to NULL-terminated string.

```c
const char *
aisl_http_method_to_string(AislHttpMethod method);
```


#### Arguments

*   `method` —  AislHttpMethod constant

#### Return value

NULL-terminated string representation of `AislHttpMethod`

---

## Type AislHttpResponse

Enumeration of following constants:

* `AISL_HTTP_CONTINUE`
* `AISL_HTTP_SWITCHING_PROTOCOLS`
* `AISL_HTTP_OK`
* `AISL_HTTP_CREATED`
* `AISL_HTTP_ACCEPTED`
* `AISL_HTTP_NON_AUTHORITATIVE_INFORMATION`
* `AISL_HTTP_NO_CONTENT`
* `AISL_HTTP_RESET_CONTENT`
* `AISL_HTTP_PARTIAL_CONTENT`
* `AISL_HTTP_MULTIPLE_CHOICES`
* `AISL_HTTP_MOVED_PERMANENTLY`
* `AISL_HTTP_FOUND`
* `AISL_HTTP_SEE_OTHER`
* `AISL_HTTP_NOT_MODIFIED`
* `AISL_HTTP_USE_PROXY`
* `AISL_HTTP_UNUSED`
* `AISL_HTTP_TEMPORARY_REDIRECT`
* `AISL_HTTP_BAD_REQUEST`
* `AISL_HTTP_UNAUTHORIZED`
* `AISL_HTTP_PAYMENT_REQUIRED`
* `AISL_HTTP_FORBIDDEN`
* `AISL_HTTP_NOT_FOUND`
* `AISL_HTTP_METHOD_NOT_ALLOWED`
* `AISL_HTTP_NOT_ACCEPTABLE`
* `AISL_HTTP_PROXY_AUTHENTICATION_REQUIRED`
* `AISL_HTTP_REQUEST_TIMEOUT`
* `AISL_HTTP_CONFLICT`
* `AISL_HTTP_GONE`
* `AISL_HTTP_LENGTH_REQUIRED`
* `AISL_HTTP_PRECONDITION_FAILED`
* `AISL_HTTP_REQUEST_ENTITY_TOO_LARGE`
* `AISL_HTTP_REQUEST_URI_TOO_LONG`
* `AISL_HTTP_UNSUPPORTED_MEDIA_TYPE`
* `AISL_HTTP_REQUESTED_RANGE_NOT_SATISFIABLE`
* `AISL_HTTP_EXPECTATION_FAILED`
* `AISL_HTTP_INTERNAL_SERVER_ERROR`
* `AISL_HTTP_NOT_IMPLEMENTED`
* `AISL_HTTP_BAD_GATEWAY`
* `AISL_HTTP_SERVICE_UNAVAILABLE`
* `AISL_HTTP_GATEWAY_TIMEOUT`
* `AISL_HTTP_VERSION_NOT_SUPPORTED`

#### Function aisl\_http\_response\_to\_string

Converts `AislHttpResponse` constant to NULL-terminated string.

```c
const char *
aisl_http_response_to_string(AislHttpResponse code);
```

#### Arguments

*   `code` — `AislHttpResponse` constant

#### Return value

A NULL-terminated string representation of `AislHttpResponse`

---
