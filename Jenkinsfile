pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stage('Checkout') {
        steps {
            echo '=== Pulling Angular code from GitHub ==='
            checkout scm
        }
    }

    stage('Install Dependencies') {
        // install npm packages
        steps {
            echo '=== Installing npm packages ==='
            sh 'npm install'
        }
    }

    stage('Build') {
        // build angular for production
        steps {
            echo '=== Building Angular for production ==='
            sh 'npx ng build --configuration production'
        }
    }

    stage('Deploy') {
        // copy files to nginx folder
        // restart nginx
         steps {
            echo '=== Deploying to Nginx ==='
            sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r dist/browser/* /var/www/html/
                sudo systemctl restart nginx
                echo "✅ Frontend deployed!"
            '''
        }
    }

    post {
        success {
            echo '✅ Frontend deployed successfully!'
        }
        failure {
           echo '❌ Frontend deployment failed!'
        }
    }


}