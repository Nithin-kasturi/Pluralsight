pipeline {
    agent any
    stages {

        stage('Deploy Helm Chart') {
            steps {
                script {
                    // Now helm can work as the context is properly configured
                    sh 'helm upgrade --install node-devops /home/nithin/Pluralsight/helm/node-devops-chart'
                }
            }
        }
    }
}
