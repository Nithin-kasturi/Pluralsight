pipeline{
    agent any
    stage('Setup Kubernetes Context') {
            steps {
                script {
                    // Assuming kubeconfig is stored at /home/jenkins/.kube/config
                    sh 'export KUBEVIRT_KUBECONFIG=/home/jenkins/.kube/config'
                    sh 'export KUBEVIRT_KUBERNETES_API_SERVER="https://minikube"'
                }
            }
        }
    // environment{
    //     APP_NAME="node-devops"
    //     DOCKER_PASS="dockerpass"
    //     DOCKER_USER="nithin8"
    //     RELEASE="1.0.0"
    //     IMAGE_NAME="${DOCKER_USER}"+"/"+"${APP_NAME}"
    //     IMAGE_TAG="${RELEASE}-${BUILD_NUMBER}"
    //     HELM_CHART_PATH="/home/nithin/Pluralsight/helm/node-devops-chart"
    //     HELM_RELEASE_NAME="node-devops"
    // }
    // stages{
    //     stage("CHecking"){
    //         steps{
    //             sh 'echo "Checked Done"'
    //         }
    //     }
    //     stage("CHeckout SCM"){
    //         //Clone repository to jenkins workspace
    //         steps{
    //         git branch: 'main', url: 'https://github.com/Nithin-kasturi/Pluralsight.git'    

    //         }

    //     }
    //     stage("Build"){
    //         steps{
    //             sh 'npm install'
    //         }
    //     }
    //     stage("Test"){
    //         steps{
    //             sh "node test.js"
    //         }
    //     }
    //     stage("Build and push to docker"){
    //         steps {
    //             script {
    //                 docker.withRegistry('',DOCKER_PASS) {
    //                     docker_image = docker.build "${IMAGE_NAME}"
    //                 }

    //                 docker.withRegistry('',DOCKER_PASS) {
    //                     docker_image.push("${IMAGE_TAG}")
    //                     docker_image.push('latest')
    //                 }
    //             }
    //         }

    //     }
    //     stage("Update tag in values"){
    //         steps{
    //             sh """
    //                     sed -i 's/tag: \".*\"/tag: \"${IMAGE_TAG}\"/' ${HELM_CHART_PATH}/values.yaml
    //                 """
    //         }
    //     }
    //     stage("Deploy Helm chart"){
    //         steps{
    //             sh """
    //                 helm upgrade --install ${HELM_RELEASE_NAME} ${HELM_CHART_PATH}
    //             """
    //         }
    //     }
    // }
}
