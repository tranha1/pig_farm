# Deployment

The Wagtail backend ships with multiple Django settings modules for different purposes. **Only `pig_farm_cms.settings.production` must be used for any live or customer-facing environment.**

Set the `DJANGO_SETTINGS_MODULE` environment variable to `pig_farm_cms.settings.production` for production deployments and ensure the `DJANGO_ENV` environment variable is set to `production` so that development-only settings cannot be imported accidentally.

Other settings modules (such as `pig_farm_cms.settings.dev`) are intended strictly for local development and require additional environment variables like `DJANGO_SECRET_KEY` to be configured when used.

## Database configuration

`pig_farm_cms.settings.base` now reads database settings from environment variables with PostgreSQL-friendly defaults. The following approaches are supported:

- Supply a single [`DATABASE_URL`](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) (e.g. `postgres://user:password@host:5432/pig_farm`). Query string parameters such as `sslmode=require` and `conn_max_age=60` are honoured.
- Provide individual components via `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`, and optional tuning variables like `DATABASE_CONN_MAX_AGE`, `DATABASE_SSLMODE`, or `DATABASE_SSLROOTCERT`.
- Existing `POSTGRES_*` variables (`POSTGRES_DB`, `POSTGRES_USER`, etc.) continue to be recognised for compatibility with container platforms that expose them.

When `DJANGO_ENV` is left at `development` and no database overrides are configured, the project continues to fall back to the bundled SQLite database for ease of local development. Sample configuration files are available at `BE-farm/.env.development.example` and `BE-farm/.env.production.example` in the backend project root.

## Migrating existing data

### From the SQLite development database

1. Create a data dump from the existing SQLite database:
   ```bash
   python manage.py dumpdata --natural-foreign --natural-primary --indent 2 > wagtail-backup.json
   ```
2. Configure the PostgreSQL connection variables (either `DATABASE_URL` or the individual values) and run the migrations:
   ```bash
   python manage.py migrate --noinput
   ```
3. Load the exported data into PostgreSQL:
   ```bash
   python manage.py loaddata wagtail-backup.json
   ```

### Between PostgreSQL environments

For existing PostgreSQL deployments, use native tooling to capture and restore backups when rotating credentials or moving between environments:

```bash
# Capture a custom-format backup
pg_dump --format=custom --no-owner --dbname "$DATABASE_URL" --file=backup.dump

# Restore into a fresh database
pg_restore --clean --no-owner --dbname "$TARGET_DATABASE_URL" backup.dump
```

Always run `python manage.py migrate --noinput` after restoring to ensure schema changes are applied.
