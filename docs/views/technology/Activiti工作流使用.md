---
title: Activiti工作流使用
date: 2020-03-06
categories: 
 - Technology
tags: 
 - Activiti
 - 工作流
---

## 定义

### 工作流

>   工作流(Workflow)，就是通过计算机对业务流程自动化执行管理。它主要解决的是“使在多个参与者之间按照某种预定义的规则自动进行传递文档、信息或任务的过程，从而实现某个预期的业务目标，或者促使此目标的实现。

### BPMN

> BPMN：业务流程建模与标注，包括这些图元如何组合成一个业务流程图（Business Process Diagram）；讨论BPMN的各种的用途，包括以何种精度来影响一个流程图中的模型。
>
> BPMN定义了一个业务流程图（Business Process Diagram），该业务流程图基于一个流程图（flowcharting），该流程图被设计用于创建业务流程操作的图形化模型。而一个业务流程模型（Business Process Model），指一个由图形对象（graphical objects）组成的网状图，图形对象包括活动（activities)和用于定义这些活动执行顺序的流程控制器（flow controls）。

### Activiti

> Activiti项目是一项新的基于Apache许可的开源BPM平台，从基础开始构建，旨在提供支持新的BPMN 2.0标准，包括支持对象管理组（OMG），面对新技术的机遇，诸如互操作性和云架构，提供技术实现。

## 使用(集成到springboot)

### Maven配置

dependency:

```xml
 <dependency>
     <groupId>org.activiti</groupId>
     <artifactId>activiti-spring-boot-starter-basic</artifactId>
     <version>${activiti.version}</version>
</dependency>
```

### application.properties

```properties
spring.activiti.check-process-definitions=false
```

### spring config

```java
@Configuration
public class ActivitiConfig extends AbstractProcessEngineAutoConfiguration implements ProcessEngineConfigurationConfigurer {

    @Autowired
    private TaskEventListener taskEventListener;

    @Override
    public void configure(SpringProcessEngineConfiguration processEngineConfiguration) {
        // 添加事件监听
        Map<String, List<ActivitiEventListener>> typedEventListeners = new HashMap<>(5);
        List<ActivitiEventListener> taskEventListeners = Collections.singletonList(taskEventListener);
        typedEventListeners.put(TASK_CREATED.toString(), taskEventListeners);
        typedEventListeners.put(TASK_ASSIGNED.toString(), taskEventListeners);
        typedEventListeners.put(TASK_COMPLETED.toString(), taskEventListeners);
        processEngineConfiguration.setTypedEventListeners(typedEventListeners);

        // 解决部署图片中文乱码问题
        processEngineConfiguration.setActivityFontName("宋体");
        processEngineConfiguration.setLabelFontName("宋体");
    }

}
```

## 常用服务

| 服务              | 用途                                                         |
| ----------------- | ------------------------------------------------------------ |
| RepositoryService | 提供一系列管理流程部署和流程定义的API                        |
| RuntimeService    | 在流程运行时对流程实例进行管理与控制                         |
| TaskService       | 对流程任务进行管理，例如任务提醒、任务完成和创建任务等       |
| FormService       | 表单服务                                                     |
| IdentityService   | 提供对流程角色数据进行管理的API，这些角色数据包括用户组、用户及它们之间的关系 |
| HistoryService    | 对流程的历史数据进行操作，包括查询、删除这些历史数据         |
| ManagementService | 提供对流程引擎进行管理和维护的服务                           |

## 实例：会签

bpmn配置：

```xml
<userTask id="manage" name="经理审核（会签）" activiti:assignee="${jointlyUser}">
    <extensionElements>
        <modeler:initiator-can-complete xmlns:modeler="http://activiti.com/modeler"><![CDATA[false]]></modeler:initiator-can-complete>
    </extensionElements>
    <multiInstanceLoopCharacteristics isSequential="false" activiti:collection="jointlyUserList" activiti:elementVariable="jointlyUser">
        <completionCondition>${nrOfCompletedInstances/nrOfInstances == 1 }</completionCondition>
    </multiInstanceLoopCharacteristics>
</userTask>
```

说明：

- **isSequential**: 指定多实例是按照并行或者串行的方式进行，当isSequential=true时，表示的串行执行，即虽然该节点有多条任务，但只有上一条执行完，才可以执行下一条。当isSequential=false时，表示的并行执行，即该节点下的多条任务可以同时执行，如三个人参与会签，是三个人同时收到待办，任务实例是同时产生的。 
- **activiti:collection**: 执行该会签环节的参与人**集合**。服务中通过变量注入。
- **activiti:elementVariable**: 执行会签的参与人。用于设置`activiti:assignee="${jointlyUser}"`
- **ompletionCondition**: 指定会签环节的结束条件。
  - **nrOfInstances**: 该会签环节中总共有多少个实例 
  - **nrOfActiveInstances**: 当前活动的实例的数量，即还没有 完成的实例数量。
  - **nrOfCompletedInstances**: 已经完成的实例的数量

启动流程：

```java
Map<String, Object> joinlyUserMap = Collections.singletonMap("jointlyUserList",
                Arrays.asList("jointlyUser1", "jointlyUser2", "jointlyUser3"));
String applyUser = "bfans";

identityService.setAuthenticatedUserId(applyUser);
runtimeService.startProcessInstanceByKey("JointlySign", "123", joinlyUserMap);
```

