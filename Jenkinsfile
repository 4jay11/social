pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "social:latest"
        CONTAINER_NAME = "social"
    }

    stages {
        stage('Cleanup Previous Build') {
            steps {
                script {
                    // Check if the container exists, stop and remove it if found
                    def containerExists = sh(
                        script: "docker ps -a --filter name=${CONTAINER_NAME} --format '{{.Names}}'",
                        returnStdout: true
                    ).trim()

                    if (containerExists == CONTAINER_NAME) {
                        echo "Stopping and removing existing container: ${CONTAINER_NAME}"
                        sh "docker stop ${CONTAINER_NAME}"
                        sh "docker rm ${CONTAINER_NAME}"
                    } else {
                        echo "No existing container found with name: ${CONTAINER_NAME}"
                    }

                    // Check if the image exists, remove it if found
                    def imageExists = sh(
                        script: "docker images -q ${DOCKER_IMAGE}",
                        returnStdout: true
                    ).trim()

                    if (imageExists) {
                        echo "Removing existing Docker image: ${DOCKER_IMAGE}"
                        sh "docker rmi ${DOCKER_IMAGE}"
                    } else {
                        echo "No existing image found with name: ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/4jay11/social.git'  // Adjust URL
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Prepare Docker Context') {
            steps {
                script {
                    // Create docker_build folder and copy necessary files
                    sh 'mkdir -p docker_build/frontend/build'
                    sh 'cp -r frontend/build docker_build/frontend/build'
                    sh 'cp -r backend docker_build/backend'
                    sh 'cp Dockerfile docker_build/'  // Copy Dockerfile into docker_build
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using docker_build as the context
                    sh "docker build -t ${DOCKER_IMAGE} docker_build"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container with the newly built image
                    sh "docker run -d --name ${CONTAINER_NAME} -p 8000:8000 ${DOCKER_IMAGE}"
                }
            }
        }
    }

    post {
        success {
            echo "Build and deployment successful!"
        }
        failure {
            echo "Build failed. Check logs for details."
        }
    }
}
