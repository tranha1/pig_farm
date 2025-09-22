# Deployment considerations

The production configuration enables strict HTTPS settings such as secure cookies,
HSTS, and strict referrer policies. Ensure the application is deployed behind a
TLS-terminating reverse proxy or load balancer so that incoming requests use
HTTPS and these safeguards remain effective. If TLS terminates at a proxy,
forward the appropriate headers (for example `X-Forwarded-Proto`) so Django can
identify secure requests.
