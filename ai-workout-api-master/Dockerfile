
FROM python:3.9


WORKDIR /app


COPY ./requirements.txt requirements.txt


RUN pip install -r requirements.txt


COPY . .

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]