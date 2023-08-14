# Installing Docker
##### Note: I am expecting you to be using Linux. If you are using Windows or Mac, install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
##### Note: This is also expecting you to be using Ubuntu/Debian or anything bases on them with the APT package manager. If you are using something different please visit the [Docker Documentation](https://docs.docker.com/engine/install/) for more information. 

1. Remove all conflicting packages
```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

2. Update the APT package index
```bash
sudo apt update
```

3. Install packages to allow apt to use a repository over HTTPS
```bash 
sudo apt install ca-certificates curl gnupg
```

4. Add Docker's official GPG key
```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

5. Add the Docker APT repository
```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null 
```

6. Update the APT package index
```bash
sudo apt update
```

7. Install the latest version of Docker Engine and containerd
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

8. Add your user to the docker group
```bash
sudo usermod -aG docker $USER
```

9. Reboot your computer
```bash
sudo reboot
```

11. You are now done installing Docker!
