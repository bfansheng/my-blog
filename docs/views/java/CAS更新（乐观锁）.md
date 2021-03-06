---
title: CAS更新（乐观锁）
date: 2020-04-07
categories: 
 - Java
tags: 
 - Java
---

[TOC]

## CAS

**更新某个值时先检查下该值有没有发生变化**，如果**没有发生变化则更新**，否则放弃更新。

CAS的基本思想是认为当前环境中的并发并没有那么高，比较乐观的看待整个并发。

> compare and swap，解决多线程并行情况下使用锁造成性能损耗的一种机制，CAS操作包含三个操作数——内存位置（V）、预期原值（A）和新值(B)。如果内存位置的值与预期原值相匹配，那么处理器会自动将该位置值更新为新值。否则，处理器不做任何操作。无论哪种情况，它都会在CAS指令之前返回该位置的值。CAS有效地说明了“我认为位置V应该包含值A；如果包含该值，则将B放到这个位置；否则，不要更改该位置，只告诉我这个位置现在的值即可。

例：

```java
    public static AtomicInteger a = new AtomicInteger(1);

    public static void main(String[] args){
        new Thread(() -> {
            // 定义变量 a = 1
            System.out.println(String.format("操作线程: %s, a = %s", Thread.currentThread(), a));
            try {
                // 等待，以便让干扰线程执行
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // CAS操作（此时a值其实已经修改过了，只是回到了1值）
            boolean isCASSuccess = a.compareAndSet(1,2);
            System.out.println(String.format("操作线程: %s, CAS操作结果: %s", Thread.currentThread(), isCASSuccess));
        },"主线程").start();

        new Thread(() -> {
            try {
                // 让主线程先开始执行
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // a 加 1
            a.incrementAndGet();
            // a 减 1
            a.decrementAndGet();
            System.out.println(String.format("操作线程: %s, a值变化: 1 -> 2 -> 1", Thread.currentThread()));
        },"干扰线程").start();
    }
```

输出：

```
操作线程: Thread[主线程,5,main], a = 1
操作线程: Thread[干扰线程,5,main], a值变化: 1 -> 2 -> 1
操作线程: Thread[主线程,5,main], CAS操作结果: true
```

### 数据库CAS更新

伪代码：

```java
// 从会议池获取未使用的会议
MeetingPool meeting = meetingPoolService.getNoUseMeeting();

// cas更新
MeetingPool updateMeeting = new MeetingPool();
// 新值，更新会议为已使用
updateMeeting.setUseStatus(UseStatus.USE);

// 更新时条件带上旧值（即未使用），保证该条记录旧值没被其他线程修改
QueryWrapper<MeetingPool> filter = new QueryWrapper<MeetingPool>().eq(MeetingPool.ID, meeting.getId())
    .eq(MeetingPool.USE_STATUS, meeting.getUseStatus());
if (meetingPoolService.update(updateMeeting, filter)) {
    // cas更新成功
} else {
    // cas更新失败
}
```

## ABA问题

如果另一个线程修改V值假设原来是A，先修改成B，再修改回成A。当前线程的CAS操作无法分辨当前V值是否发生过变化。

> 通俗来讲就是你大爷还是你大爷，你大妈已经不是你大妈了

```java
    private static AtomicStampedReference<Integer> atomicStampedRef =
            new AtomicStampedReference<>(1, 0);

    public static void main(String[] args) {
        new Thread(() -> {
            // 获取当前版本戳
            int stamp = atomicStampedRef.getStamp();
            System.out.println(String.format("操作线程: %s, a = %s", Thread.currentThread(),
                    atomicStampedRef.getReference(), stamp));
            try {
                // 等待，以便让干扰线程执行
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // 此时expectedReference(期望值)未发生改变，但是stamp(版本)已经被修改了,所以CAS失败
            boolean isCASSuccess = atomicStampedRef.compareAndSet(1, 2, stamp, stamp + 1);
            System.out.println(String.format("操作线程: %s, CAS操作结果: %s", Thread.currentThread(), isCASSuccess));
        }, "主线程").start();

        new Thread(() -> {
            try {
                // 让主线程先开始执行
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            atomicStampedRef.compareAndSet(1, 2, atomicStampedRef.getStamp(),
                    atomicStampedRef.getStamp() + 1);
            atomicStampedRef.compareAndSet(2, 1, atomicStampedRef.getStamp(),
                    atomicStampedRef.getStamp() + 1);
            System.out.println(String.format("操作线程: %s, a值变化: 1 -> 2 -> 1", Thread.currentThread()));
        }, "干扰线程").start();

    }
```

输出：

```
操作线程: Thread[主线程,5,main], a = 1
操作线程: Thread[干扰线程,5,main], a值变化: 1 -> 2 -> 1
操作线程: Thread[主线程,5,main], CAS操作结果: false
```

## 参考

1. [JAVA中CAS-ABA的问题解决方案AtomicStampedReference](https://www.jianshu.com/p/8b227a8adbc1)
2. [什么是ABA问题？](https://www.zhihu.com/question/23281499)