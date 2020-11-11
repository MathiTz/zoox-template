const City = require("../models/cities-model");

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
