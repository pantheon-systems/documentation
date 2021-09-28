## Technical Specifications

|                                                                       | Global CDN with Let's Encrypt   | Global CDN with a Custom Certificate  |
|:--------------------------------------------------------------------- |:------------------------------- |:------------------------------------- |
| **Certificate Type**                                                  | Issued by Let's Encrypt         | Bring your own                        |
| **Renewal**                                                           | Automatic                       | Self-managed (up to you)              |
| **Inbound IP**                                                        | Static (shared)                 | Static (shared)                       |
| **Client Support**                                                    | 95.55% of Browsers <br />Some very old browsers not supported <sup> [1](https://caniuse.com/#search=TLS%201.2) [2](https://caniuse.com/#search=SNI)</sup> | 95.55% of Browsers <br />Some very old browsers not supported <sup>[1](https://caniuse.com/#search=TLS%201.2) [2](https://caniuse.com/#search=SNI)</sup> * |
| [**SSL Labs Rating**](https://www.ssllabs.com/ssltest/)               | A+ [with HSTS](/pantheon-yml/#enforce-https-+-hsts)     | A+ [with HSTS](/pantheon-yml/#enforce-https-+-hsts) * |
| **Protocol**                                                          | TLS 1.2 with SNI                | TLS 1.2 with SNI                      |
| **Ciphers**                                                           | No Weak 3DES cipher             | No Weak 3DES cipher                   |
| **Delivery**                                                          | [Global CDN](/global-cdn)  | [Global CDN](/global-cdn)        |
| **Encryption Endpoint**                                               | Application Container           | Application Container                 |

\* The browser compatibility and SSL Labs scores are guaranteed for Pantheon-provided Let’s Encrypt certificates. The same results are typical for a custom certificate from a mainstream CA with mainstream attributes, but not guaranteed.  For custom certificates, compatibility and SSL Labs score depends on attributes of that certificate, such as number of SAN entries, CA and signing algorithm.