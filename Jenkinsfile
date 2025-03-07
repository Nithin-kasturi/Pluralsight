pipeline {
    agent any
    stages {
        stage('Setup Kubernetes Context') {
            steps {
                script {
                    // Assuming kubeconfig is stored at /home/jenkins/.kube/config
                    sh 'export KUBEVIRT_KUBECONFIG=/home/jenkins/.kube/config'
                    sh 'export KUBEVIRT_KUBERNETES_API_SERVER="https://minikube"'
                }
            }
        }

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
