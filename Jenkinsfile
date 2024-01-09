pipeline {
    agent any

    stages {
        stage('Run Flask App') {
            steps {
                script {
                    // Assume Python is already installed on the Jenkins server
                    sh 'python3 app.py'
                }
            }
        }
    }
}