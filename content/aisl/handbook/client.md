---
title: "Client"
date: 2020-03-21T10:45:49+01:00
draft: false
description: AISL client documentation
weight: 130

author: "Ilja K."
details: "TCP client representation"
sticky: false
publication: false
comments: false
---

```c
/* @file aisl/types.h */

typedef struct aisl_client * AislClient;
```

Pointer of this type represents HTTP client connected to an [AislServer](/aisl/doc/server/).

`AislClient` can be a source of the following [events](/aisl/doc/events-model/):

*   `AISL_EVENT_CLIENT_CONNECT`
*   `AISL_EVENT_CLIENT_DISCONNECT`

## Functions

*   [aisl_client_get_server](#function-aisl_client_get_server)
*   [aisl_client_get_address](#function-aisl_client_get_address)
*   [aisl_client_get_http_version](#function-aisl_client_get_http_version)
*   [aisl_client_disconnect](#function-aisl_client_disconnect)
*   [aisl_client_is_secure](#function-aisl_client_is_secure)
*   [aisl_client_is_online](#function-aisl_client_is_online)

---

### Function aisl\_client\_get\_server

Gets an [AislServer](/aisl/doc/server/) associated with a valid `AislClient`

```c
AislServer
aisl_client_get_server(AislClient client);
```

#### Arguments

*   `client` — `AislClient` pointer

#### Return value

Associated [AislServer](/aisl/doc/server/)

---

### Function aisl\_client\_get\_address

Copies client's address and port to provided sockaddr\_in structure

```c
void
aisl_client_get_address(AislClient client, struct sockaddr_in *address);
```

#### Arguments

*   `client` — `AislClient` pointer
*   `address` — pointer to an output structure

#### Return value

Returns no value.

---

### Function aisl\_client\_get\_http\_version

Gets the HTTP version of the communication with `AislClient`. For just 
connected clients version is set to default
[AISL_HTTP_1_0](/aisl/doc/enumerations/#type-aislhttpversion).

```c
AislHttpVersion
aisl_client_get_http_version(AislClient client);
```

#### Arguments

*   `client` — `AislClient` pointer

#### Return value

[AislHttpVersion](/aisl/doc/enumerations#type-aislhttpversion) constant

---

### Function aisl\_client\_disconnect

Closes client's socket immediately. Resources will be cleaned up automatically
by [aisl_run_cycle](/aisl/doc/instance/#function-aisl_run_cycle) call.

```c
void
aisl_client_disconnect(AislClient client);
```

#### Arguments

*   `client` — `AislClient` pointer

#### Return value

Returns no value.

---

### Function aisl\_client\_is\_secure

Checks if client works on HTTPS (secure) or HTTP (unsecure) protocol.

```c
bool
aisl_client_is_secure(AislClient client);
```

#### Arguments

*   `client` — `AislClient` pointer

#### Return value

*   `true` — if communication is secure
*   `false` — if communication is unsecure

---

### Function aisl\_client\_get\_is\_online

Checks if connection with client is still up.

```c
bool
aisl_client_is_online(AislClient client);
```

#### Arguments

*   `client` — `AislClient` pointer

#### Return value

*   `true` — if client is connected
*   `false` — if client is not connected

---
