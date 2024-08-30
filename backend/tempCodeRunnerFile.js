/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('MSCodeToGive');

// Search for documents in the current collection.
db.getCollection('event')
  .find(
    {
      /*
      * Filter
      * fieldA: value or expression
      */
        fieldA: '66c9b5eb20149a62130424eb'
    },
    {
      /*
      * Projection
      * _id: 0, // exclude _id
      * fieldA: 1 // include field
      */
    }
  )
  .sort({
    /*
    * fieldA: 1 // ascending
    * fieldB: -1 // descending
    */
  });
