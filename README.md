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

### TODO

1. Remove constants file
2. Remove structure from README
3. Update README
4. Make config passable
5. Add in commented datatypes in objectifier
6. Check if booleans are working
7. Change objectifier to use mappings appropriately

## Structure

