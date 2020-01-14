const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const dev = await Dev.find();

    return res.json(dev)
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = apiResponse.data

      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })
    }
    return res.json(dev);
  },

  async update(req, res) {
    const { github_username, name, bio } = req.body;
    const dev = await Dev.findOne({ github_username })

    if (!dev) {
     return res.status(400).json({ error: 'dev não encontrado' }) 
    }

    await dev.update({ name, bio });

    return res.json({ name, bio })
  },

  async destroy(req, res) {
    const { github_username } = req.body;
    const dev = await Dev.findOne({ github_username });

    await dev.delete()

    return res.json({ message: 'dev deletado' })
  }
};