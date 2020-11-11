const State = require("../models/states-model");
const City = require("../models/cities-model");

const getStates = async (req, res) => {
  try {
    states = await State.find({}, { __v: 0 }, { sort: { name: 1 } });

    return res.json(states);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

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

const createState = async (req, res) => {
  try {
    const { name, abbreviation } = req.body;

    const findStateByName = await State.findOne({ name });

    if (findStateByName) {
      return res.status(400).json({
        error: "State with same name already created",
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

const deleteState = async (req, res) => {
  const { abbr: abbreviation } = req.params;

  try {
    await State.findOneAndDelete({ abbreviation });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateState = async (req, res) => {
  const { abbr: abbreviation } = req.params;
  const { name: newName, abbreviation: newAbbreviation } = req.body;

  try {
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
