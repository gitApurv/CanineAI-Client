#!/usr/bin/env bash

set -euo pipefail

image_name="docapurv/canineai-client"
docker_username=""
docker_token=""
vite_api_base_url=""
vite_cloudinary_cloud=""
vite_cloudinary_upload_preset=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --docker-username)
      docker_username="${2:-}"
      shift 2
      ;;
    --docker-token)
      docker_token="${2:-}"
      shift 2
      ;;
    --vite-api-base-url)
      vite_api_base_url="${2:-}"
      shift 2
      ;;
    --vite-cloudinary-cloud)
      vite_cloudinary_cloud="${2:-}"
      shift 2
      ;;
    --vite-cloudinary-upload-preset)
      vite_cloudinary_upload_preset="${2:-}"
      shift 2
      ;;
    -h|--help)
      cat <<'EOF'
Usage: ./scripts/push-dockerhub.sh [options]

Options:
  --docker-username USERNAME
  --docker-token TOKEN
  --vite-api-base-url URL
  --vite-cloudinary-cloud NAME
  --vite-cloudinary-upload-preset NAME
EOF
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"

require_command() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Required command '$name' was not found in PATH." >&2
    exit 1
  fi
}

require_command docker
require_command git

if [[ -z "$docker_username" ]]; then
  echo "Docker username is required. Pass --docker-username." >&2
  exit 1
fi

if [[ -z "$docker_token" ]]; then
  echo "Docker Hub token is required. Pass --docker-token." >&2
  exit 1
fi

if ! git_sha="$(git -C "$project_root" rev-parse --short=8 HEAD 2>/dev/null)"; then
  echo "Unable to read git commit SHA. Ensure this runs inside a git repository." >&2
  exit 1
fi

tag="$git_sha"

if [[ -z "$vite_api_base_url" || -z "$vite_cloudinary_cloud" || -z "$vite_cloudinary_upload_preset" ]]; then
  cat >&2 <<EOF
Missing required flags.
Provide --vite-api-base-url, --vite-cloudinary-cloud, and --vite-cloudinary-upload-preset.
EOF
  exit 1
fi

echo "Using image: $image_name"
echo "Using tag:   $tag"
echo "Using build context: $project_root"

printf '%s' "$docker_token" | docker login -u "$docker_username" --password-stdin >/dev/null

cleanup() {
  docker logout >/dev/null 2>&1 || true
}
trap cleanup EXIT

docker build \
  --build-arg "VITE_API_BASE_URL=$vite_api_base_url" \
  --build-arg "VITE_CLOUDINARY_CLOUD=$vite_cloudinary_cloud" \
  --build-arg "VITE_CLOUDINARY_UPLOAD_PRESET=$vite_cloudinary_upload_preset" \
  -t "$image_name:$tag" \
  -t "$image_name:latest" \
  "$project_root"

docker push "$image_name:$tag"
docker push "$image_name:latest"

echo "Pushed tags:"
echo "- $image_name:$tag"
echo "- $image_name:latest"