const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


pool.connect(console.log('Connected to lightbnb thru pool'));

//pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(
    `SELECT * FROM users
    WHERE email = $1;`,
    [email])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(
    `SELECT * FROM users
    WHERE id = $1;`,
    [id])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
  .query(
    `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3) RETURNING *;`,
    [user.name, user.email, user.password])
  .then((result) => {
    // console.log("new user", result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query(
    ` SELECT reservations.id, properties.title, cost_per_night, start_date, avg(rating) AS average_rating
    FROM properties
    JOIN reservations ON property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
      WHERE reservations.guest_id = $1
      GROUP BY reservations.id, properties.title, properties.cost_per_night
        ORDER BY start_date 
        LIMIT $2;`,
    [guest_id, limit])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
 
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
    `;

    if (options.city) {
      //let where = 'WHERE ';
      queryParams.push(`%${options.city}%`);
      //use indexOf within ${where} to post the number
      queryString += `WHERE city LIKE $${queryParams.indexOf(`%${options.city}%`) + 1} `;
    }

    if (options.owner_id) {
      queryParams.push(options.owner_id);
      queryString = `  SELECT properties.*, avg(property_reviews.rating) as average_rating
      FROM properties
      JOIN property_reviews ON property_id = properties.id
      JOIN users ON owner_id = users.id
      WHERE users.id = $${queryParams.indexOf(options.owner_id) + 1} `
    }

   
    //needs condition to see if WHERE exists
    //if options.city in params, then no extra WHERE
    if (options.minimum_price_per_night) {
      queryParams.push(options.minimum_price_per_night);
      if (!queryParams.includes(`%${options.city}%`) || !queryParams.includes(owner_id)) {
        //checks if there is already WHERE in statement
        queryString += `WHERE cost_per_night >= $${queryParams.indexOf(options.minimum_price_per_night) + 1} `;
      } else {
        queryString += `AND cost_per_night >= $${queryParams.indexOf(options.minimum_price_per_night) + 1} `;
      }
    }


    if (options.maximum_price_per_night) {
      queryParams.push(options.maximum_price_per_night);
      if (!queryParams.includes(`%${options.city}%`) || !queryParams.includes(owner_id) || !queryParams.includes(options.minimum_price_per_night)) {
        //checks if there is already WHERE in statement
        queryString += `WHERE cost_per_night <= $${queryParams.indexOf(options.maximum_price_per_night) + 1} `;
      } else {
        queryString += `AND cost_per_night <= $${queryParams.indexOf(options.maximum_price_per_night) + 1} `;
      }
    }
    
    queryString += `GROUP BY properties.id `

    //add in min rating
    if (options.minimum_rating) {
      queryParams.push(options.minimum_rating);
      queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.indexOf(options.minimum_rating) + 1} `;
    }

    //      if (!queryParams.includes(`%${options.city}%`) || !queryParams.includes(options.minimum_price_per_night || !queryParams.includes(options.minimum_price_per_night)) {

    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.indexOf(limit) + 1};
    `;
    

   // const addToQuery = function(option, sqlAlreadyInUse) {
    //   //Check to see if either a previous SQL verb is used
    //   //returns the query ie queryString += function return
    //   if (queryParams.indexOf(sqlAlreadyInUse) === -1) {
    //     //checks if there is already WHERE in statement
    //     return `WHERE cost_per_night >= $${queryParams.indexOf(options.minimum_price_per_night) + 1} `;
    //   }
    //   queryParams.push(options.minimum_price_per_night);
    //   queryString += `AND cost_per_night >= $${queryParams.indexOf(options.minimum_price_per_night) + 1} `;
    // }

    console.log(queryString, queryParams);
  
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
