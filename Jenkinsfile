pipeline {
    agent any

    environment {
        CI = 'false' // Disable strict CI mode
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git
                git url: 'https://github.com/4jay11/social.git', branch: 'master', credentialsId: '72382d55-c567-4ea2-932f-ec11e88e4041'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Install frontend dependencies and build
                        bat 'npm install || echo npm install failed'
                        bat 'npm run build || echo npm run build failed'
                    }
                }
            }
        }

        stage('Prepare Docker Context') {
            steps {
                script {
                    // Create docker_build folder if it does not exist
                    if (!fileExists('docker_build')) {
                        bat 'mkdir docker_build\\frontend\\build'
                    }

                    // Copy frontend build if necessary
                    if (fileExists('frontend\\build')) {
                        bat 'xcopy frontend\\build\\* docker_build\\frontend\\build /E /I /Y'
                    } else {
                        error 'Build folder does not exist. Check the frontend build step.'
                    }

                    // Copy backend files
                    if (!fileExists('docker_build\\backend')) {
                        bat 'xcopy backend docker_build\\backend /E /I /Y'
                    }

                    // Copy Dockerfile if it does not exist
                    if (!fileExists('docker_build\\Dockerfile')) {
                        bat 'copy Dockerfile docker_build\\'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('docker_build') {
                    script {
                        // Build the Docker image
                        bat "docker build -t social:${env.BUILD_NUMBER} ."
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Remove existing container if it exists
                    bat "docker rm -f social-container || echo 'No existing container to remove.'"
                    // Run the Docker container with the new image
                    bat "docker run -d --name social-container -p 8000:8000 social:${env.BUILD_NUMBER}"
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