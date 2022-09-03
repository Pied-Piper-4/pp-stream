 #!/bin/bash

ssh root@143.110.185.106<<EOF
    pwd
    cd /root/pp-stream
    git pull
    docker-compose down
    docker-compose up -d --build
    exit
EOF
