# Node.js Find a Friend API

API developed to simulate the back-end of a pet adoption service.

### Functional Requirements (FRs)  

- It must be possible to register a pet.  
- It must be possible to list all pets available for adoption in a city.  
- It must be possible to filter pets by their characteristics.  
- It must be possible to view details of a pet available for adoption.  
- It must be possible to register as an ORG.  
- It must be possible to log in as an ORG.  

### Business Rules (BRs)  

- To list pets, the city must be provided.  
- An ORG must have an address and a WhatsApp number.  
- A pet must be associated with an ORG.  
- Users who want to adopt will contact the ORG via WhatsApp.  
- All filters, except for the city, are optional.  
- To access the application as an admin, an ORG must be logged in.  

### Non-functional Requirements (NFRs)  

- The ORG's password must be encrypted.  
- Application data must be persisted in a PostgreSQL database.  
- The pet list must be paginated with 20 items per page.  
- The ORG must be identified using a JWT (JSON Web Token).  

Technologies used: Fastify as the framework, Prisma as the ORM, Axios, Zod for form validation, PostgreSQL as the database, Docker, and Vitest for unit and E2E testing.

### Installation
`npm i`

### Running
`npm run dev`

### Testing
`npm run test` (For unit tests)
`npm run test:e2e` (For E2E tests)