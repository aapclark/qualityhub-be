About Testing

The testing suite is designed to test Apollo resolvers and Prisma functions. This will enable more thoughtful and effective refactoring of current resolvers according to specified test expectations. The test expecations will rely on the new Prisma datamodel created in the unification of QHub services.


The folder and file structure of testing will follow the structure of typeDefs in `apollo/src/typeDefs`. For example, tests for authorization will be contained in `__tests__/auth`. A generic `__scaffolding__` folder with boilerplate code for quickly implementing code is included.


## Testing Checklist
<details>
  <summary>Setup</summary>
  - [] Add config folder w/ globalSetup and globalTeardown

</details>
<details>
  <summary>Template</summary>
  - [] test 1 intent
  - [] test2 intent
  - [] test3 intent
</details>
<details>
  <summary>Auth</summary>
  <li>
  - [] registration
  - [] login
  - [] unique emails
  - [] invalid token handling
</details>
