FROM golang:1.13.4

RUN apt update -y && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash -  && \
    apt install -y nodejs  && \
    apt install -y vim

RUN go get -u github.com/hako/branca && \
    go get -u github.com/joho/godotenv && \
    go get -u github.com/99designs/gqlgen/handler && \
    go get -u github.com/prisma/prisma-client-lib-go && \
    go get -u github.com/machinebox/graphql && \
    go get -u github.com/vektah/gqlparser

RUN npm i -g prisma
RUN prisma generate

# RUN cp node-v12.9.1-linux-x64/bin/node /bin/node

# RUN rm -R node-v12.9.1-linux-x64
# RUN rm node-v12.9.1-linux-x64.tar.xz
CMD ["go", "run", "server/server.go"]