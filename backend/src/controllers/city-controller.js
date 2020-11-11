const City = require("../models/cities-model");

/**
 * @api {get} /cities/ Request All Cities information
 * @apiName getCities
 * @apiGroup Cities
 *
 * @apiSuccess {ObjectId} _id City id
 * @apiSuccess {String} Name City Name
 * @apiSuccess {String} stateId State Id related to City
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *       "_id": "ObjectId",
 *       "name": "Example",
 *       "stateId": [ _id, name, abbreviation ]
 *     },
 *     {
 *       "_id": "ObjectId",
 *       "name": "Example",
 *       "stateId": [ _id, name, abbreviation ]
 *     }
 *    ]
 *
 * @apiError CallError Api Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "error": "Internal Error"
 *     }
 */
const getCities = async (req, res) => {
  try {
    cities = await City.find({}, { __v: 0 }, { sort: { name: 1 } }).populate(
      "stateId"
    );

    return res.status(200).json(cities);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {get} /cities/:name Request City information
 * @apiParam {name} Name of city
 * @apiName getCity
 * @apiGroup Cities
 *
 * @apiSuccess {ObjectId} _id City id
 * @apiSuccess {String} Name City Name
 * @apiSuccess {String} stateId State Id related to City
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "ObjectId",
 *       "name": "Example",
 *       "stateId": [ _id, name, abbreviation ]
 *     }
 *
 * @apiError Not found city.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Couldnt find city"
 *     }
 */
const getCity = async (req, res) => {
  const { name } = req.params;

  try {
    const city = await City.findOne({ name }, { __v: 0 }).populate("stateId");

    if (!city)
      return res.status(400).json({
        error: "Could not find city",
      });

    return res.status(200).json(city);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {Post} /cities/ Request City Creation
 * @apiName createCity
 * @apiGroup Cities
 *
 * @apiParam {String} name Name of city
 * @apiParam {String} stateId Id of state selected
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *
 *
 * @apiError Could not create city.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Name not provided"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "State not provided"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "City with same name already created"
 *     }
 */
const createCity = async (req, res) => {
  const { name, stateId } = req.body;

  try {
    if (!name)
      return res.status(400).json({
        error: "Name not provided",
      });

    if (!stateId)
      return res.status(400).json({
        error: "State not provided",
      });

    const findCityByName = await City.findOne({
      name,
    });

    if (findCityByName) {
      return res.status(400).json({
        error: "City with same name already created",
      });
    }

    const city = new City({
      name,
      stateId,
    });

    await city.save();

    return res.status(201).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {Delete} /cities/:name Request City Delete
 * @apiName deleteCity
 * @apiGroup Cities
 *
 * @apiParam {String} name Name of city
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 *
 *
 * @apiError Could not delete city.
 *
 * @apiErrorExample Error-Response:
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Could not find city within the name"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Name not provided""
 *     }
 */
const deleteCity = async (req, res) => {
  const { name } = req.params;

  try {
    if (!name)
      return res.status(400).json({
        error: "Name not provided",
      });

    const findCityByName = await City.findOne({
      name,
    });

    if (!findCityByName)
      return res.status(400).json({
        error: "Could not find city within the name",
      });

    await City.findOneAndDelete({ name });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {Put} /cities/:name Request City Update
 * @apiName updateCity
 * @apiGroup Cities
 *
 * @apiParam {String} name Name of city
 * @apiParam {String} stateId Id of state selected
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *
 *
 * @apiError Could not update city.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Name not provided"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "City already created"
 *     }
 *
 *    HTTP/1.1 304 Server Error
 *     {
 *       "error": "Not modified"
 *     }
 */
const updateCity = async (req, res) => {
  const { name } = req.params;
  const { name: newName, stateId } = req.body;

  try {
    if (!name)
      return res.status(400).json({
        error: "Name not provided",
      });

    if (name !== newName) {
      const findStateWithNewName = await City.findOne({
        name: newName,
      });

      if (findStateWithNewName) {
        return res.status(400).json({
          error: "City already created",
        });
      }
    }

    await City.updateOne(
      {
        name,
      },
      {
        name: newName,
        stateId,
      }
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(304).json({ error });
  }
};

exports.getCities = getCities;
exports.getCity = getCity;
exports.createCity = createCity;
exports.deleteCity = deleteCity;
exports.updateCity = updateCity;
