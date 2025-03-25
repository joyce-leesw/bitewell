## Bitewell
Bitewell is a project composed of three main components:
- app: The core application deployed to AWS Lambda.
- bitewell-infra: Infrastructure as Code (IaC) for AWS resources using AWS CDK.
- bitewell-site: The frontend website, running as a development server.

Ensure you have the following installed:
- Node.js (version ≥ 18.x recommended)
- AWS CDK (npm install -g aws-cdk)
- AWS CLI (configured with credentials)
- Bash (for executing shell scripts)
- Python 3.11

## 🛠️ Infrastructure Setup

1. **Generate Base Layer**

```bash
./generate_base_layer.sh
```

2. **Deploy to AWS Lambda**

```bash
cdk deploy
```