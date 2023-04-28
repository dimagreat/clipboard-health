# Refactoring

- First of all, I make tests for different event arguments;
- Find out issues with big integer and absence of validation for different object values and zero values (for object and partition) didn't fix as want to leave code as have initially;
- Extract DETERMISTIC_PARAMS as constants and crypto function from the `deterministicPartitionKey` function body to separate variables. Exported them to use directly inside the test file. This allows us to modify those params easier;
- Understand 2 edge behavior of function: with empty event return TRIVIAL_PARTITION_KEY and with long partition key return encrypted key;
- Get rid of if/else spaghetti and use a simple ternary check for the partition key and stringify it;
