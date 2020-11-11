const State = require("../models/states-model");
const City = require("../models/cities-model");

/**
 * @api {get} /states/ Request All States information
 * @apiName getState
 * @apiGroup States
 *
 * @apiSuccess {ObjectId} _id State id
 * @apiSuccess {String} Name State Name
 * @apiSuccess {String} Abbreviation State Abbreviation
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 * {
 *    "_id": "5fac3ea79641030a9b8e6e1f",
 *     "name": "Ceará",
 *     "abbreviation": "CE"
 *   },
 *   {
 *     "_id": "5fac3f339641030a9b8e6e21",
 *     "name": "Rio de Janeiro",
 *     "abbreviation": "RJ"
 *   }
 * ]
 *
 * @apiError CallError Api Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Server Error
 *     {
 *       "error": "Internal Error"
 *     }
 */
const getStates = async (req, res) => {
  try {
    states = await State.find({}, { __v: 0 }, { sort: { name: 1 } });

    return res.json(states);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {get} /state/:abbr Request State information
 * @apiParam {String} Abbreviation of State
 * @apiName getState
 * @apiGroup States
 *
 * @apiSuccess {ObjectId} _id State id
 * @apiSuccess {String} Name State Name
 * @apiSuccess {String} Abbreviation State Id related to State
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "ObjectId",
 *       "name": "Example",
 *       "Abbreviation": "EX"
 *     }
 *
 * @apiError Not found state.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Couldnt find state"
 *     }
 */
const getState = async (req, res) => {
  const { abbr: abbreviation } = req.params;

  try {
    const state = await State.findOne({ abbreviation }, { __v: 0 });

    if (!state)
      return res.status(400).json({
        error: "Could not find state",
      });

    return res.status(200).json(state);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {get} /:abbr/cities Request Cities within the same state
 * @apiParam {name} Abbreviation of state
 * @apiName getAllCitiesWithinState
 * @apiGroup States
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
 *     HTTP/1.1 500 Server Error
 *     {
 *       "error": "Internal Error"
 *     }
 */
const getAllCitiesWithinState = async (req, res) => {
  const { abbr: abbreviation } = req.params;

  try {
    const state = await State.findOne({ abbreviation }, { __v: 0 });

    const cities = await City.find(
      { stateId: state._id },
      { __v: 0 },
      { sort: { name: 1 } }
    );

    return res.status(200).json(cities);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {Post} /states/ Request State Creation
 * @apiName createState
 * @apiGroup States
 *
 * @apiParam {String} name Name of state
 * @apiParam {String} abbreviation Abbreviation of state
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *
 *
 * @apiError Could not create State.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Name not provided"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Abbreviation not provided"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "State with same name already created"
 *     }
 */
const createState = async (req, res) => {
  try {
    const { name, abbreviation } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Name not provided",
      });
    }

    const findStateByName = await State.findOne({ name });

    if (findStateByName) {
      return res.status(400).json({
        error: "State with same name already created",
      });
    }

    if (!abbreviation) {
      return res.status(400).json({
        error: "Abbreviation not provided",
      });
    }

    const findStateByAbbreviation = await State.findOne({ abbreviation });

    if (findStateByAbbreviation) {
      return res.status(400).json({
        error: "State with same abbreviation already created",
      });
    }

    const state = new State({
      name,
      abbreviation,
    });

    await state.save();

    return res.status(201).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {Delete} /cities/:abbr Request State Delete
 * @apiName deleteState
 * @apiGroup States
 *
 * @apiParam {String} abbr Abbreviation of state
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 *
 *
 * @apiError Could not delete state.
 *
 * @apiErrorExample Error-Response:
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Could not find state within the name"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "Name not provided"
 *     }
 */
const deleteState = async (req, res) => {
  const { abbr: abbreviation } = req.params;

  try {
    await State.findOneAndDelete({ abbreviation });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * @api {Put} /cities/:abbr Request State Update
 * @apiName updateState
 * @apiGroup States
 *
 * @apiParam {String} name Name of State
 * @apiParam {String} abbreviation Abbreviation state selected
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
 *       "error": "Abbreviation not provided"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "State with same abbreviation already created"
 *     }
 *
 *     HTTP/1.1 400 Server Error
 *     {
 *       "error": "State with same name already created"
 *     }
 *
 *    HTTP/1.1 304 Server Error
 *     {
 *       "error": "Not modified"
 *     }
 */
const updateState = async (req, res) => {
  const { abbr: abbreviation } = req.params;
  const { name: newName, abbreviation: newAbbreviation } = req.body;

  try {
    if (!newName) {
      return res.status(400).json({
        error: "Name not provided",
      });
    }

    if (!newAbbreviation) {
      return res.status(400).json({
        error: "Abbreviation not provided",
      });
    }
    const selectedState = await State.findOne({
      abbreviation,
    });

    if (abbreviation !== newAbbreviation) {
      const findStateWithNewAbbr = await State.findOne({
        abbreviation: newAbbreviation,
      });

      if (findStateWithNewAbbr) {
        return res.status(400).json({
          error: "State with same abbreviation already created",
        });
      }
    }

    if (selectedState.name !== newName) {
      const findStateWithNewName = await State.findOne({ name: newName });

      if (findStateWithNewName) {
        return res.status(400).json({
          error: "State with same name already created",
        });
      }
    }

    await State.updateOne(
      {
        abbreviation,
      },
      {
        name: newName,
        abbreviation: newAbbreviation,
      }
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(304).json({ error });
  }
};

exports.getStates = getStates;
exports.getState = getState;
exports.getAllCitiesWithinState = getAllCitiesWithinState;
exports.createState = createState;
exports.deleteState = deleteState;
exports.updateState = updateState;
