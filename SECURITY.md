# Security Policy

## Supported Versions

The latest tagged release is supported.

## Reporting a Vulnerability

Please report security issues by email to baditaflorin@gmail.com.

Do not open public issues for suspected vulnerabilities. Include a clear description, reproduction steps, affected version or commit, and any suggested mitigation.

## Security Baseline

- No secrets are committed.
- Frontend code does not contain API keys, passwords, private keys, or internal hostnames.
- Local hooks run `gitleaks` before commits.
- Dependencies are checked locally with `npm audit`.
