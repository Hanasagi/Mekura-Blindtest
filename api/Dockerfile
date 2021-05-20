FROM gradle:6-jdk8 AS build
WORKDIR /blindtest

RUN ["gradle","build"]
RUN ["mkdir","/app"]

WORKDIR /blindtest/api

COPY ./ /app

EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-Djava.security.egd=file:/dev/./urandom","-jar","/app/build/libs/api-0.0.1-SNAPSHOT.jar"]