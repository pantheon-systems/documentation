set -ex

USERNAME=pantheonsystems
IMAGE=documentation

docker build -t $USERNAME/$IMAGE:latest .
