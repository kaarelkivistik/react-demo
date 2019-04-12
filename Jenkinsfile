pipeline {
  agent any
  stages {
    stage('build') {
      agent {
        docker {
          image 'node:11-alpine'
        }

      }
      steps {
        sh '''printenv
yarn
yarn run build'''
      }
    }
  }
}