---
title: RSA加解密
date: 2019-10-11
categories: 
 - Java
tags: 
 - RSA
---

java使用的RSA格式为pkcs8，跨语言使用时需要注意

## openssl生成公私钥

生成私钥：

```
openssl genrsa -out rsa_private_key.pem 1024
```

根据私钥生成对应的公钥

```
openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key_2048.pub
```

公私钥有pkcs1转为pkcs8

```
openssl rsa -RSAPublicKey_in -in pubkey.pem -pubout > pubkey_pkcs8.pem
openssl pkcs8 -topk8 -inform PEM -in prikey.pem -outform PEM -nocrypt > prikey_pkcs8.pem
```

