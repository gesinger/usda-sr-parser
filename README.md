# UNDER CONSTURCTION

Please mind the old code, poor documentation, and overall scruff. Release date
for a more sane version is set for mid May. Please let me know if you have
questions, comments, or requests for the finished product.

### usda-sr-parser

A node.js script to parse the USDA's standard reference.

The script allows a bit of flexibility in how the results are returned. No
matter what options are selected, a sqlite3 database is created. After the
database is created, if --db-only isn't passed as an argument, then the JSON
document will be created as well.

### Sample Commands

time node index.js --sr-dir sr26/ --sqlite-db sr.db --es-export temp.out --fill-tables '["DATSRCLN"]' --reuse-db
time node index.js --sr-dir sr26/ --sqlite-db sr.db --es-export temp.out --reuse-db

### TODO

1. Update README
2. Add in commented datatypes in objectifier
3. Check if booleans are working
4. Convert binds to use closures
