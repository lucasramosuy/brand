# Workflows de CI reutilizables

Los workflows compartidos viven en `.github/workflows/` de este repo y cada proyecto los llama con `uses: lucasramosuy/brand/.github/workflows/<archivo>@main`. Las reglas de siempre aplican: nada va directo a main y cada adopción entra por PR.

Requisito: al ser un repo privado, en **Settings → Actions → General → Access** tiene que estar habilitado "Accessible from repositories owned by lucasramosuy" para que los demás repos puedan llamarlos.

## deploy-worker.yml

Deploy a Cloudflare Workers con build y verificación. Reemplaza los `deploy.yml` copiados a mano: el caller solo declara el trigger (push a main con sus `paths`, más `workflow_dispatch`) y pasa los inputs.

```yaml
name: Deploy salida

on:
  push:
    branches: [main]
    paths:
      - '.github/workflows/deploy.yml'
      - 'index.html'
      - 'style.css'
  workflow_dispatch:

jobs:
  deploy:
    uses: lucasramosuy/brand/.github/workflows/deploy-worker.yml@main
    with:
      app: salida
      cloudflare_account_id: <account-id-de-cloudflare>
    secrets:
      CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

Inputs: `app` (requerido, arma el grupo de concurrencia), `cloudflare_account_id` (requerido), `build_command` (default `bash build.sh`), `pnpm_version` (default `12.6.0`; vacío para builds sin pnpm), `wrangler_version` (default `4.140.0`), `smoke_url` + `smoke_text` (opcionales: verificación post-deploy con 5 reintentos). Secreto requerido: `CLOUDFLARE_API_TOKEN` en el repo caller.

## ci-bun.yml

CI de pull request para proyectos Bun: checkout, setup-bun, `bun install --frozen-lockfile`, `bun run check`. Reemplaza los `ci.yml` idénticos.

```yaml
name: CI

on:
  pull_request:

jobs:
  check:
    uses: lucasramosuy/brand/.github/workflows/ci-bun.yml@main
```
