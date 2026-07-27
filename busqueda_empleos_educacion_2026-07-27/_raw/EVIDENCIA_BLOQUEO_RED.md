# Evidencia de bloqueo de red — 2026-07-27 (America/Santiago)

## Prueba 1: WebFetch
WebFetch https://example.com -> HTTP 403 Forbidden (dominio de control neutro).

## Prueba 2: reachability directa (curl), codigo HTTP por host
```
www.empleospublicos.cl -> 000 (000 = CONNECT rechazado por el gateway)
www.bne.cl -> 000 (000 = CONNECT rechazado por el gateway)
junji.cl -> 000 (000 = CONNECT rechazado por el gateway)
integra.cl -> 000 (000 = CONNECT rechazado por el gateway)
www.trabajando.com -> 000 (000 = CONNECT rechazado por el gateway)
cl.indeed.com -> 000 (000 = CONNECT rechazado por el gateway)
www.udec.cl -> 000 (000 = CONNECT rechazado por el gateway)
example.com -> 000 (000 = CONNECT rechazado por el gateway)
www.google.com -> 000 (000 = CONNECT rechazado por el gateway)
```

## Prueba 3: estado del proxy de egreso
```json
{
  "enabled": true,
  "port": 46333,
  "caBundlePath": "/root/.ccr/ca-bundle.crt",
  "hasSystemCa": true,
  "noProxy": "localhost,127.0.0.1,::1,127.0.0.0/8,0.0.0.0/8,::,169.254.0.0/16,anthropic.com,.anthropic.com,*.anthropic.com,registry.npmjs.org,jsr.io,npm.jsr.io,pypi.org,files.pythonhosted.org,index.crates.io,proxy.golang.org,host.docker.internal,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,100.64.0.0/10,.svc.cluster.local,*.svc.cluster.local",
  "selective": false,
  "standalone": false,
  "toolScoped": false,
  "javaTrustStorePath": "/root/.ccr/java-truststore.p12",
  "readmePath": "/root/.ccr/README.md",
  "gitConfigInjection": true,
  "gitSshRewrite": true,
  "recentRelayFailures": [
    {
      "ts": "2026-07-27T16:13:50.436Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "ucsc.cl:443"
    },
    {
      "ts": "2026-07-27T16:13:50.820Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "mideuc.cl:443"
    },
    {
      "ts": "2026-07-27T16:19:35.340Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.empleospublicos.cl:443"
    },
    {
      "ts": "2026-07-27T16:19:35.504Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.bne.cl:443"
    },
    {
      "ts": "2026-07-27T16:19:35.858Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "junji.cl:443"
    },
    {
      "ts": "2026-07-27T16:19:36.269Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "integra.cl:443"
    },
    {
      "ts": "2026-07-27T16:19:36.624Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.trabajando.com:443"
    },
    {
      "ts": "2026-07-27T16:19:36.982Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "cl.indeed.com:443"
    },
    {
      "ts": "2026-07-27T16:19:37.374Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.udec.cl:443"
    },
    {
      "ts": "2026-07-27T16:19:37.776Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "example.com:443"
    },
    {
      "ts": "2026-07-27T16:19:38.169Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.google.com:443"
    },
    {
      "ts": "2026-07-27T16:20:20.183Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.empleospublicos.cl:443"
    },
    {
      "ts": "2026-07-27T16:20:20.531Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.bne.cl:443"
    },
    {
      "ts": "2026-07-27T16:20:20.961Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "junji.cl:443"
    },
    {
      "ts": "2026-07-27T16:20:21.306Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "integra.cl:443"
    },
    {
      "ts": "2026-07-27T16:20:21.673Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.trabajando.com:443"
    },
    {
      "ts": "2026-07-27T16:20:22.257Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "cl.indeed.com:443"
    },
    {
      "ts": "2026-07-27T16:20:22.586Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.udec.cl:443"
    },
    {
      "ts": "2026-07-27T16:20:22.939Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "example.com:443"
    },
    {
      "ts": "2026-07-27T16:20:23.235Z",
      "kind": "connect_rejected",
      "detail": "gateway answered 403 to CONNECT (policy denial or upstream failure)",
      "host": "www.google.com:443"
    }
  ]
}
```

## Conclusion
La politica de egreso de la organizacion deniega CONNECT a todo host externo.
WebSearch funciona (se ejecuta del lado del servidor, no por este proxy).
WebFetch NO funciona: ninguna pagina de oferta puede reabrirse.
Por regla del README del proxy, las denegaciones 403/407 NO se reintentan ni se eluden: se reportan.
