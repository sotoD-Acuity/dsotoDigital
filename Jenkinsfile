pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"  // Add Python 3 to the PATH
    }

    stages {
        stage('Terminate Previous Python Process') {
            steps {
                script {
                    // Terminate any existing Python process
                    sh 'pkill -f "python3 app.py"'
                }
            }
        }

        stage('Run Flask App') {
            steps {
                script {
                    // Assume Python 3 is installed on the Jenkins server
                    sh 'python3 app.py'
                }
            }
        }
    }
}