build:
	docker build --compress --force-rm --rm --tag handytec-webapp .

run:
	docker run -d -t -i -p 3000:3000 -e PORT=3000 -e NODE_ENV=development --name handytec-webapp handytec-webapp

stop:
	docker stop handytec-webapp

rm:
	docker rm handytec-webapp

rmi:
	docker rmi handytec-webapp

# run with docker-compose
run-dc:
	docker-compose up -d --build

stop-dc:
	docker-compose down