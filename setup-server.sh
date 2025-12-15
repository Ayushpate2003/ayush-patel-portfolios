#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting Production Server Setup...${NC}"

# Check if running as root or with sudo access
if [ "$EUID" -ne 0 ] && ! command -v sudo &> /dev/null; then
  echo -e "${RED}Please run this script with sudo or as root as it installs system packages.${NC}"
  exit 1
fi

# Function to run command with sudo if not root
run_sudo() {
    if [ "$EUID" -ne 0 ]; then
        sudo "$@"
    else
        "$@"
    fi
}

echo "Updating package index..."
run_sudo apt-get update

# Install prerequisites
echo "Installing prerequisites..."
run_sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
echo "Adding Docker GPG key..."
run_sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | run_sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
run_sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo "Setting up Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | run_sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
echo "Installing Docker..."
run_sudo apt-get update
run_sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker service
echo "Starting Docker service..."
run_sudo systemctl start docker
run_sudo systemctl enable docker

# Add current user to docker group
if [ -n "$SUDO_USER" ]; then
    TARGET_USER="$SUDO_USER"
else
    TARGET_USER="$USER"
fi

echo -e "${GREEN}Adding user $TARGET_USER to docker group...${NC}"
run_sudo usermod -aG docker "$TARGET_USER"

echo -e "${GREEN}Docker installed successfully!${NC}"
echo -e "${GREEN}IMPORTANT: You must restart your session or the runner service for group changes to take effect.${NC}"

# Check for github runner service and restart if found
if systemctl list-units --full -all | grep -q "actions.runner"; then
    RUNNER_SERVICE=$(systemctl list-units --full -all | grep "actions.runner" | head -n 1 | awk '{print $1}')
    echo "Found GitHub runner service: $RUNNER_SERVICE"
    echo "Restarting runner service to pick up docker permissions..."
    run_sudo systemctl restart "$RUNNER_SERVICE"
    echo -e "${GREEN}Runner service restarted.${NC}"
else
    echo -e "${RED}Could not automatically find/restart the GitHub runner service.${NC}"
    echo "If you are running the runner as a service, please restart it manually:"
    echo "  sudo systemctl restart actions.runner.<your-runner-name>.service"
    echo "If running interactively, stop it (Ctrl+C) and start it again."
fi
