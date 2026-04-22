# Docker Hub Push Script

This script builds and pushes the frontend image with:

- One immutable tag: short Git SHA (8 chars)
- One moving tag: `latest`
- Fixed image name: `docapurv/canineai-client`

## Script

`./scripts/push-dockerhub.sh`

## Required

- Docker CLI installed and Docker daemon running
- Git installed
- Docker Hub username and access token
- Vite build values passed as flags

## Usage (bash)

```bash
./scripts/push-dockerhub.sh \
  --docker-username "your-dockerhub-username" \
  --docker-token "your-dockerhub-access-token" \
  --vite-api-base-url "https://your-api.example.com" \
  --vite-cloudinary-cloud "your-cloud-name" \
  --vite-cloudinary-upload-preset "your-upload-preset"
```
