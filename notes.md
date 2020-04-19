This is a document for notes that have not been added to `readme.md` or another relevant source.



## Docker, Prisma, and Apollo Server


To achieve connectivity between Apollo Server and Prisma inside the same Docker container, Apollo must know that the endpoint is not found at `localhost` but `prisma`. For this reason, there are five ENVs relevant to Prisma's endpoint. Four are used by Docker and one is used by Prisma CLI. `PRISMA_URL`, `PRISMA_PORT`, `PRISMA_SERVICE_NAME`, and `PRISMA_STAGE` are used by `docker-compose.yml` to piece together a full, relevant *local*,URL that Apollo can use to communicate with its sibling service in the Docker container.

The separation of ENVs is to allow the execution of `prisma deploy` without having to update ENV files each time from `localhost` to `prisma`.
