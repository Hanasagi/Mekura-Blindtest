FROM gradle:6-jdk8 AS build
COPY --chown=gradle:gradle . /blindtest
WORKDIR /blindtest/api

RUN mkdir /app
RUN gradle clean build 
COPY /blindtest/api /app

FROM openjdk:8-jre-slim
EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-Djava.security.egd=file:/dev/./urandom","-jar","/app/build/libs/app.jar"]