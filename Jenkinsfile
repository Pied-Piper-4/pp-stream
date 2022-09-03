pipeline {
  agent any

  tools {nodejs "recent"}

  stages {

    stage('Build') {
      steps {
        sh 'npm install'
      }
    }


    stage('Test') {
      steps {
        sh 'echo Testing done'
      }
    }

     stage('PP Services ') {
      steps {
        withEnv(['PATH+EXTRA=/usr/sbin:/usr/bin:/sbin:/bin']) {
          sh '''
            echo Deployment starting
            chmod +x ./deploy.sh
            ./deploy.sh
          '''
        }
      }
    }
  }
}
