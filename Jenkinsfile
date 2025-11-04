pipeline{
    agent any

    environment {
        // DockerHub credentials
        DOCKERHUB = credentials('dockerhub')
        // Images
        BACKEND_IMAGE = "onboard_forms_backend"
        FRONTEND_IMAGE = "onboard_forms_frontend"
        // Database credentials
        DB_HOST = 'mysql'
        DB_USER = 'root'
        DB_PASSWORD = 'onboardforms123'
        DB_NAME = 'onboardforms'
    }

    stages {
        stage('Checkout Code'){
            steps{
                echo "Cloning the repository..."
                git branch: 'main', url: 'https://github.com/Sarah-Wambui/OnBoardForms.git'
            }
        }
        stage('DockerHub Login') {
            steps {
                sh '''
                    echo "Logging in to DockerHub..."
                    echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin
                    echo "Login successful!"
                '''
            }
        }
        stage('Build Backend Image'){
            steps{
                dir('onBoardForms'){
                    sh "docker build -t $DOCKERHUB_USR/$BACKEND_IMAGE:latest ."
                }
            }
        }
        stage('Build Frontend Image'){
            steps{
                dir('onboardui'){
                    sh "docker build -t $DOCKERHUB_USR/$FRONTEND_IMAGE:latest ."
                }
            }
        }
        stage('Push Images to Docker Hub'){
            steps{
                sh "docker push $DOCKERHUB_USR/$BACKEND_IMAGE:latest"
                sh "docker push $DOCKERHUB_USR/$FRONTEND_IMAGE:latest" 
            }
        }
        stage('Deploy Containers'){
            steps {
                sh '''
                docker pull $DOCKERHUB_USR/$BACKEND_IMAGE:latest
                docker pull $DOCKERHUB_USR/$FRONTEND_IMAGE:latest

                docker stop onboard_forms_backend || true && docker rm onboard_forms_backend || true
                docker stop onboard_forms_frontend || true && docker rm onboard_forms_frontend || true

                docker run -d --name onboard_forms_backend \
                    -e DB_HOST=$DB_HOST \
                    -e DB_USER=$DB_USER \
                    -e DB_PASSWORD=$DB_PASSWORD \
                    -e DB_NAME=$DB_NAME \
                    -p 5000:5000 \
                    $DOCKERHUB_USR/$BACKEND_IMAGE:latest

                docker run -d --name onboard_forms_frontend \
                    -p 3000:3000 $DOCKERHUB_USR/$FRONTEND_IMAGE:latest    
                '''
            }
        }
        stage('Clean Up Local Docker'){
            steps{
                sh 'docker system prune -f'
            }
        }
    } 

    post {
        success {
            echo "✅ Pipeline finished successfully!"
        }
        failure {
            echo "❌ Pipeline failed — check logs!"
        }
        always {
            cleanWs()
        }
    }   
}