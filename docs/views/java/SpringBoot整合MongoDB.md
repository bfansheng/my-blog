---
title: SpringBoot整合MongoDB
date: 2019-12-9
categories: 
 - Java
tags: 
 - Spring
 - MongoDB
---

[TOC]

## 1. 添加Maven依赖

pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

## 2. spring配置

### 2.1. java config

```java
@EnableConfigurationProperties(MongoProperties.class)
@Configuration
public class MongoDbConfig {

    @Bean
    public MongoTemplate mongoTemplate(MongoDbFactory mongoDbFactory) {
        return new MongoTemplate(mongoDbFactory);
    }

    @Bean
    public MongoDbFactory mongoDbFactory(MongoProperties properties) {
        MongoClientOptions options = MongoClientOptions.builder()
                .minConnectionsPerHost(30)
                // 默认最大连接数是100
                .connectionsPerHost(1000)
                .build();
        MongoClient client = new MongoClient(properties.getHost(), options);
        return new SimpleMongoDbFactory(client, properties.getMongoClientDatabase());
    }

}
```

### 2.2. application.yml

```yml
spring:
  data:
    mongodb:
      host: 10.17.3.68
      port: 27017
      database: test
```

## 3. CURD和聚合操作

### 3.1. CURD

接口IUserService.java : 

```java
public interface IUserService {

    /**
     * 保存
     *
     * @param user
     */
    void save(User user);

    /**
     * 通过id查询
     *
     * @param id
     * @return
     */
    User getById(Long id);

    /**
     * 通过name查询
     *
     * @param name
     * @return
     */
    User getByName(String name);

    /**
     * 修改
     *
     * @param user
     */
    void update(User user);

    /**
     * 删除
     * 
     * @param id
     */
    void remove(Long id);

}
```

实现UserServiceImpl :

```java
@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void save(User user) {
        mongoTemplate.save(user);
    }

    @Override
    public User getById(Long id) {
        return mongoTemplate.findById(id, User.class);
    }

    @Override
    public User getByName(String name) {
        return mongoTemplate.findOne(Query.query(Criteria.where("name").is(name)), User.class);
    }

    @Override
    public void update(User user) {
        Query query = Query.query(Criteria.where("id").is(user.getId()));
        Update update = new Update().set("name", user.getName()).set("createTime", user.getCreateTime());
        mongoTemplate.updateFirst(query, update, User.class);
    }

    @Override
    public void remove(Long id) {
        mongoTemplate.remove(Query.query(Criteria.where("id").is(id)), User.class);
    }
}
```

### 3.2. 聚合

接口IAggregationService : 

```java
public interface IAggregationService {

    /**
     * 统计文档数
     *
     * @return
     */
    Long count();

    /**
     * 查询大于18岁的文档
     *
     * @return
     */
    List<UserDTO> findAdult();

    /**
     * 简单分页查询
     *
     * @param pageNumber
     * @param pageSize
     * @return
     */
    List<UserDTO> page(long pageNumber, long pageSize);

}
```

实现AggregationServiceImpl : 

```java
@Service
public class AggregationServiceImpl implements IAggregationService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Long count() {
        String count = "count";
        TypedAggregation<User> aggregation = Aggregation.newAggregation(User.class,
                Aggregation.count().as(count));
        AggregationResults<JSONObject> results = mongoTemplate.aggregate(aggregation, JSONObject.class);
        return Optional.ofNullable(results.getUniqueMappedResult())
                .map(object -> object.getLong(count))
                .orElse(0L);
    }

    @Override
    public List<UserDTO> findAdult() {
        TypedAggregation<User> aggregation = Aggregation.newAggregation(User.class,
                Aggregation.match(Criteria.where("age").gte(18)),
                Aggregation.project().andInclude("name", "age"),
                Aggregation.sort(Sort.Direction.DESC, "age"));
        AggregationResults<UserDTO> results = mongoTemplate.aggregate(aggregation, UserDTO.class);

        return results.getMappedResults();
    }

    @Override
    public List<UserDTO> page(long pageNumber, long pageSize) {
        TypedAggregation<User> aggregation = Aggregation.newAggregation(User.class,
                Aggregation.sort(Sort.Direction.ASC, "age", "id"),
                Aggregation.skip((pageNumber - 1) * pageSize),
                Aggregation.limit(pageSize),
                Aggregation.project().andInclude("name", "age"));
        AggregationResults<UserDTO> results = mongoTemplate.aggregate(aggregation, UserDTO.class);

        return results.getMappedResults();
    }
}
```



