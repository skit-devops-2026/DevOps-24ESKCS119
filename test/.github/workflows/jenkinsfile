pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from Git...'
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                sh 'npm test || node test/app.test.js'
            }
        }
        stage('Build') {
            steps {
                echo 'Building application artifacts...'
                sh 'npm run build || echo "No build step required"'
            }
        }
    }
    post {
        success {
            echo 'Pipeline successfully completed!'
        }
        failure {
            echo 'Pipeline failed. Check build logs.'
        }
    }
}
