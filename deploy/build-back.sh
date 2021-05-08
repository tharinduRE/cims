cd ../backend
./mvnw -Pprod,swagger jib:dockerBuild -Dmaven.test.skip=true

