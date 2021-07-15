pipeline {
    environment {
     dockerRegistry = "trunghv/nodejs"
     dockerRegistryCredential = 'docker'
     dockerImage = ''
     VERSION_NAME = 'jay-nodejs-service-test-1.0'
     CONTAINER_NAME = 'jay_nodejs_service_test'
     EXPOSE_PORT="8769"
   }
  agent any
  tools {nodejs "node" }
  stages {
    stage('Cloning Git') {
      steps {
        git branch: 'develop', credentialsId: 'gitlab', url: 'https://gitlab.com/trunghoang250394/jay-service.git'
      }
    }
     stage('Build') {
        steps {
          sh 'npm install'
        }
     }
     stage('Building image') {
       steps{
         script {
           dockerImage = docker.build dockerRegistry + ":$VERSION_NAME"
         }
       }
     }
     stage('Upload Image') {
       steps{
         script {
           docker.withRegistry( '', dockerRegistryCredential ) {
             dockerImage.push()
           }
         }
       }
     }
     stage('Remove Unused docker image') {
       steps{
        sh "docker pull $dockerRegistry:$VERSION_NAME"
        sh "docker stop $CONTAINER_NAME  || true"
         sh "docker rm $CONTAINER_NAME  || true"
         sh "docker run -d \
     --restart=always \
     -p $EXPOSE_PORT:8769 \
     --name $CONTAINER_NAME \
     $dockerRegistry:$VERSION_NAME"
       }
     }
   
  }
}