# usda-sr-parser

A node.js script to parse the USDA's standard reference.

The script allows a bit of flexibility in how the results are returned. No
matter what options are selected, a sqlite3 database is created. After the
database is created, if --db-only isn't passed as an argument, then the JSON
document will be created as well.

### Sample Commands

```bash
time node index.js --sr-dir sr26/ --sqlite-db sr.db --es-export temp.out --fill-tables '["DATSRCLN"]' --reuse-db
time node index.js --sr-dir sr26/ --sqlite-db sr.db --es-export temp.out --reuse-db
```

### Notes

Paths must be absolute. A table name can't be the same as one of the column
names (see source code and derivation code)
