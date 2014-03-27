usda-sr-parser

### usda-sr-parser

A node.js script to parse the USDA's standard reference.

The script allows a bit of flexibility in how the results are returned. No
matter what options are selected, a sqlite3 database is created. After the
database is created, if --db-only isn't passed as an argument, then the JSON
document will be created as well.

## TODO

Logic:
- For each DB, query for fields with key and add as object within food object
- From each food, use the mappings file to convert the built object
- Add on additional markup for ES query
- Query ES

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
