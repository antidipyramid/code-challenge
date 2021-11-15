# DataMade Code Challenge: Parserator

## Instructions

This implementation of DataMade's Parserator can be installed and run in the same
way detailed in the code challenge's initial instructions.

Once cloned, the Docker container can be built with:
```
docker-compose build
```
and ran with:
```
docker-compose up
```

Once the container is running, the tests can be run using:
```bash
docker-compose -f docker-compose.yml -f tests/docker-compose.yml run --rm app
```

## Notes

This implementation was built on Linux. After some research, it became clear that there
are some operating system differences in how Docker applications can access localhost 
(as I needed to do in order to implement the unit tests).

As a result, I had to modify Django's settings to allow the host 172.17.0.1, which Docker
uses in Linux. I don't believe this would affect anything in Mac or Windows, but please
let me know if you have any problems running the application. Thank you!
