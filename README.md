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

```json
ndbNumber: String
longDescription: string
shortDescription: string
commonName: string
manufacturerName: string
isSurveyAvailable: boolean (string)
refuseDescription: string
refusePercentage: number
scientificName: string
nitrogenFactor: number
proteinFactor: number
fatFactor: number
carbFactor: number
foodGroup: string
langualDescription: string
footnotes: [
  {
    footnoteNumber: string
    type: string
    nutrientNumber: string
    text: int
  }
]
nutrients: [
  {
    nutrientDefinition: {
      nutrientNumber: string
      unitOfMeasure: string
      tagName: string
      description: string
      numDecimalPlaces: string
      srOrder: int
    }
    nutrientValue: number
    numDataPoints: number
    standardError: number
    source: {
      code: string
      description: string
    }
    derivation: {
      code: string
      description: string
    }
    referenceNdbNumber: int
    isFortification: boolean
    numStudies: int
    minValue: number
    maxValue: number
    degreesOfFreedom: int
    lowErrorBound: number
    upperErrorBound: number
    statComments: string
    lastModifiedDate: string
    confidenceCode: string
  }
]
weights: [
  {
    sequenceNumber: string
    amount: number
    measureDescription: string
    gramWeight: number
    numDataPoints: int
    standardDeviation: number
  }
]
sources: [
  {
    nutrientNumber: string
    dataSourceId: string
    authors: string
    title: string
    year: string
    journal: string
    volumeOrCity: string
    issueState: string
    startPage: string
    endPage: string
  }
]
```
