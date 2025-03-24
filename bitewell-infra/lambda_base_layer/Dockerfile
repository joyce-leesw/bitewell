FROM amazonlinux:2023

# Install Python 3.11
RUN yum update -y && \
    yum install -y python3.11 python3.11-pip zip && \
    yum clean all

# Install virtualenv and create a virtual environment
RUN python3.11 -m venv /venv

RUN /venv/bin/python3 -m ensurepip --upgrade

RUN /venv/bin/pip install --upgrade pip

# Activate virtual environment and install dependencies
COPY ./requirements.txt .
RUN /venv/bin/pip install -r requirements.txt --platform manylinux2014_x86_64 --target ./python --only-binary=:all:

RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]