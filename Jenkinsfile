pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                checkout scm
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                sh 'node test/app.test.js'
            }
        }
    }
    post {
        success {
            echo 'Pipeline successfully completed!'
        }
    }
}
