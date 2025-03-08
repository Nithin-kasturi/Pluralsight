pipeline {
    agent any
    environment {
        APP_NAME = "node-devops"
        DOCKER_PASS = "dockerpass"
        DOCKER_USER = "nithin8"
        RELEASE = "1.0.0"
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        PAT = "/home/nithin/Pluralsight/k8s/manifests"
        HELM_CHART_PATH = "/home/nithin/Pluralsight/helm/node-devops-chart"
        HELM_RELEASE_NAME = "node-devops"
    }
    stages {
        stage("Checkout SCM") {
            steps {
                // Clone repository to Jenkins workspace
                git branch: 'main', url: 'https://github.com/Nithin-kasturi/Pluralsight.git'
            }
        }
        stage("Build") {
            steps {
                sh 'npm install'
            }
        }
        stage("Test") {
            steps {
                sh "node test.js"
            }
        }
        stage("Build and push to docker") {
            steps {
                script {
                    docker.withRegistry('', DOCKER_PASS) {
                        docker_image = docker.build "${IMAGE_NAME}"
                    }

                    docker.withRegistry('', DOCKER_PASS) {
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            }
        }
        stage("Install kubectl") {
            steps {
                sh '''
                    echo 'installing Kubectl & ArgoCD cli...'
                    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                    chmod +x kubectl
                    sudo mv kubectl /usr/local/bin/kubectl
                '''
            }
        }
        stage("Update image in deployment.yaml") {
            steps {
                script {
                    sh '''
                    echo "nithin" | sudo -S sed -i "s|image: nithin8/node-devops:.*|image: nithin8/node-devops:${IMAGE_TAG}|" /home/nithin/Pluralsight/k8s/manifests/deployment.yaml
                    '''
                }
            }
        }

        stage("Deploy Helm chart") {
            steps {
                script {
                    kubeconfig(credentialsId: 'kubeconfig', serverUrl: 'https://127.0.0.1:32769') {
                        sh """
                            kubectl apply -f ${PAT}/deployment.yaml
                            kubectl apply -f ${PAT}/service.yaml
                            kubectl apply -f ${PAT}/ingress.yaml
                        """
                    }
                    // Uncomment and use if you're deploying with Helm
                    // sh """
                    //     helm upgrade --install ${HELM_RELEASE_NAME} ${HELM_CHART_PATH}
                    // """
                }
            }
        }
        
        // New Git Push Step Added Here
        stage("Push Changes to Git") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USER', passwordVariable: 'GITHUB_TOKEN')]) {
                        // Configure Git user for push
                        sh '''
                            git config user.name "Nithin-kasturi"
                            git config user.email "nithinkasturi8@gmail.com"
                        '''
                        // Add and commit any changes (like the updated deployment.yaml)
                        sh '''
                            git status
                            pwd
                            git add .
                            git commit -m "Automated update for image tag ${IMAGE_TAG}"
                            git push https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/Nithin-kasturi/Pluralsight.git HEAD:main
                        '''
                    }
                }
            }
        }
    }
}
