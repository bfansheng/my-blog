---
title: Spring问题合集
date: 2020-06-30
categories: 
 - Spring
tags: 
 - Spring
---

## 1. @Async异步注解导致循环依赖

##### 解决方案

通过上面分析，知道了问题的根本原因，现总结出解决上述`新问题`的解决方案，可分为下面三种方案：

1. 把`allowRawInjectionDespiteWrapping`设置为true

2. 使用`@Lazy`或者`@ComponentScan(lazyInit = true)`解决

3. 不要让`@Async`的Bean参与循环依赖

**参考**：https://cloud.tencent.com/developer/article/1497689