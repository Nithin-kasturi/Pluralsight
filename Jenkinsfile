pipeline{
    agent any
    environment{
        APP_NAME="node-devops"
        DOCKER_PASS="dockerpass"
        DOCKER_USER="nithin8"
        RELEASE="1.0.0"
        IMAGE_NAME="${DOCKER_USER}"+"/"+"${APP_NAME}"
        IMAGE_TAG="${RELEASE}-${BUILD_NUMBER}"
        PATH="/home/nithin/Pluralsight/k8s/manifests"
    }
    stages{
        stage("CHeckout SCM"){
            //Clone repository to jenkins workspace
            steps{
            git branch: 'main', url: 'https://github.com/Nithin-kasturi/Pluralsight.git'    

            }

        }
        stage("Build"){
            steps{
                sh 'npm install'
            }
        }
        stage("Test"){
            steps{
                sh "node test.js"
            }
        }
        stage("Build and push to docker"){
            steps {
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        docker_image = docker.build "${IMAGE_NAME}"
                    }

                    docker.withRegistry('',DOCKER_PASS) {
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            }

        }
        stage("Update image in deployment.yaml") {
            steps {
                sh """
                    sed -i 's|image: nithin8/node-devops:.*|image: nithin8/node-devops:${IMAGE_TAG}|' ${PATH}/deployment.yaml
                """
            }
        }

        stage("Deploy Helm chart"){
            steps{
                sh """
                    kubectl apply -f /home/nithin/Pluralsight/k8s/manifests/deployment.yaml
                    kubectl apply -f /home/nithin/Pluralsight/k8s/manifests/service.yaml
                    kubectl apply -f /home/nithin/Pluralsight/k8s/manifests/ingress.yaml
                    
                """
            }
        }
    }
}
