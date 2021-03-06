---
title: Seata解决Spring Cloud分布式事务问题
date: 2020-03-06
categories: 
 - Spring
tags: 
 - Spring Cloud
 - Seata
---

## Seata是什么

Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。

## Seata术语

#### TC - 事务协调者

维护全局和分支事务的状态，驱动全局事务提交或回滚。

#### TM - 事务管理器

定义全局事务的范围：开始全局事务、提交或回滚全局事务。

#### RM - 资源管理器

管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

## 参考资料

1. [Seata官网](https://seata.io/zh-cn/index.html)
2. [使用Seata彻底解决Spring Cloud中的分布式事务问题！](https://zhuanlan.zhihu.com/p/93029043)

