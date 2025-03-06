pipeline{
    agent any
    stages{
        stage("CHecking"){
            steps{
                sh 'echo "Checked Done"'
            }
        }
        stage("CHeckout SCM"){
            //Clone repository to jenkins workspace
            steps{
            git branch: 'main', url: 'https://github.com/Nithin-kasturi/Pluralsight/tree/8395046726cbb6b77fb76a57489dbde73087a922/node-devops'    

            }

        }
        stage("Build"){
            steps{
                sh 'npm install'
            }
        }
        stage("Test"){
            steps{
                sh "npm jest"
            }
        }
    }
}
