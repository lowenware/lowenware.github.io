---
title: "Configuration"
date: 2020-03-21T10:46:43+01:00
draft: false
description: "AISL configuration documentation"
weight: 160

author: "Ilja K."
details: "To set things properly"
sticky: false
publication: false
comments: false
---

AISL must be configured on initial stage using linked structures described
below.

*   [struct aisl_cfg](#struct-aisl_cfg)
*   [struct aisl_cfg_ssl](#struct-aisl_cfg_ssl)
*   [struct aisl_cfg_srv](#struct-aisl_cfg_srv)

---

## struct aisl\_cfg

```c
struct aisl_cfg {
	AislCallback callback;
	void *p_ctx;
	const struct aisl_cfg_srv *srv;
	const struct aisl_cfg_ssl *ssl;
	int srv_cnt;
	int ssl_cnt;
	int client_spool_size;
	int initial_buffer_size;
	int client_accept_limit;
	int client_silence_timeout;
};
```

*   `callback` — address of the event handler function.
*   `p_ctx` — user defined pointer that will be passed to the event handler function.
*   `srv` — array of servers to be handled by AISL.
*   `ssl` — array of SSL certificates for secure servers.
*   `srv_cnt` — size of `srv` array.
*   `ssl_cnt` — size of `ssl` array.
*   `client_spool_size` — Initial size of the spool (number of clients).
*   `initial_buffer_size` — Initial size of communication buffer. Limits maximal length of supported HTTP headers length.
*   `client_accept_limit` — Maximal number of clients to accept at the same time.
*   `client_silence_timeout` — A time while AISL will wait for incoming data from client.

For default recommended configuration `AISL_CFG_DEFAULTS` macro could be used
when define `struct aisl_cfg`.

```c
#define AISL_CFG_DEFAULTS \
	.client_spool_size = 32 \
	, .initial_buffer_size = 16536 \
	, .client_accept_limit = 1024 \
	, .client_silence_timeout = 30 \
```

---

## struct aisl\_cfg\_srv

```c
struct aisl_cfg_srv {
	const char *host;
	uint16_t port;
	bool secure;
};
```

*   `host` — network interface address to listen.
*   `port` — TCP port to start server on.
*   `secure` — set to ~~true~~ to enable SSL for this server, or ~~false~~ otherwise.

---

## struct aisl\_cfg\_ssl

```c
struct aisl_cfg_ssl {
	const char *host;
	const char *key_file;
	const char *crt_file;
};
```

*   `host` — a host name (domain) to apply the SSL certificate.
*   `key_file` — a path to SSL certificate key file.
*   `crt_file` — a path to SSL certificate file

---
