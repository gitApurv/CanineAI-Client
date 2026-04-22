# Docker Hub Push Script

This script builds and pushes the frontend image with:

- One immutable tag: `gitsha`
- One moving tag: `latest`

## Script

`./scripts/push-dockerhub.sh`

## Required

- Docker CLI installed and logged daemon running
- Git installed
- Docker Hub username and access token
- Vite build values passed as flags

## Usage (bash)

```bash
./scripts/push-dockerhub.sh \
	--docker-username "your-dockerhub-username" \
	--docker-token "your-dockerhub-access-token" \
	--vite-api-base-url "" \
	--vite-cloudinary-cloud "" \
	--vite-cloudinary-upload-preset ""
```

## Optional Parameters

- `--image-name` default: `docapurv/canineai-client`

Example:

```bash
./scripts/push-dockerhub.sh \
	--docker-username "your-dockerhub-username" \
	--docker-token "your-dockerhub-access-token" \
	--vite-api-base-url "" \
	--vite-cloudinary-cloud "" \
	--vite-cloudinary-upload-preset ""
```
