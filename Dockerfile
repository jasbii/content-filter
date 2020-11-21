FROM openjdk:8
RUN rm target/*-docker-info.jar
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 80
ENTRYPOINT ["java", "-jar", "/app.jar"]