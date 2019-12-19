---
title: Jenkins部署
date: 2019-10-9
categories: 
 - 技术
tags:
 - Jenkins
---

[TOC]

## github

### jenkins创建任务

![jenkins_0](./assets/jenkins_0.png)

![jenkins_1](./assets/jenkins_1.png)

![jenkins_2](./assets/jenkins_2.png)

![jenkins_3](./assets/jenkins_3.png)

### github钩子

![jenkins_4](./assets/jenkins_4.png)

![jenkins_5](./assets/jenkins_5.png)

## svn

### jar

```bash
node {
   stage('svn更新') { // for display purposes
    checkout([$class: 'SubversionSCM', additionalCredentials: [], excludedCommitMessages: '', excludedRegions: '', excludedRevprop: '', excludedUsers: '', filterChangelog: false, ignoreDirPropChanges: false, includedRegions: '', locations: [[cancelProcessOnExternalsFail: true, credentialsId: 'svn', depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: 'https://192.168.92.71:8443/svn/cms/AppDev/IvyCloudPrint/trunk/CloudPrint/Server/cloud-print-manage@HEAD']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']])
   }
   stage('mvn编译') {
    sh 'mvn clean package -U -DskipTests'
   }
   stage('存档') {
        archiveArtifacts 'target/*.jar,src/main/resources/application.properties'
   }
   stage('上传') {
     sh 'scp target/cloud-print-manage-1.0.0-SNAPSHOT.jar root@10.17.3.233:/root/tmp'
   }
   stage('部署更新') {
     sh 'ssh root@10.17.3.233 "/opt/cloud-print/manage/restart.sh"'
   }
}
```

### web

```bash
node {
   stage('svn更新') { // for display purposes
    checkout([$class: 'SubversionSCM', additionalCredentials: [], excludedCommitMessages: '', excludedRegions: '', excludedRevprop: '', excludedUsers: '', filterChangelog: false, ignoreDirPropChanges: false, includedRegions: '', locations: [[cancelProcessOnExternalsFail: true, credentialsId: 'svn', depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: 'https://192.168.92.71:8443/svn/cms/AppDev/IvyCloudPrint/trunk/CloudPrint/Server/cloud-print-manage-web@HEAD']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']])
   }
   stage('yarn安装') {
    sh 'yarn install'
   }
   stage('yarn编译') {
    sh 'yarn run build'
   }
   stage('打包') {
    sh 'tar -zcvf manage.tar.gz dist/*'
   }
   stage('存档') {
        archiveArtifacts 'manage.tar.gz'
   }
   stage('上传') {
     sh 'scp manage.tar.gz root@10.17.3.233:/root/tmp'
   }
   stage('部署更新') {
     sh 'ssh root@10.17.3.233 "rm -rf /usr/share/nginx/html/* && tar -zxvf /root/tmp/manage.tar.gz -C /usr/share/nginx/html  --strip-components 1"'
   }
}
```

