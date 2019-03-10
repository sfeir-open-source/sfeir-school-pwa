'use strict';

var _ = require('underscore');
var PEOPLES = require('./data/persons').peoples.map(person => {
  // work with timestamps, it's cleaner
  person.entryDate = parseDate(person.entryDate);
  person.birthDate = parseDate(person.birthDate);
  return person;
});

exports.listAll = function(req, res) {
  console.log('List all PEOPLES');
  if (!PEOPLES || PEOPLES.length === 0) {
    return res.status(204).json();
  }
  return res.status(200).json(PEOPLES);
};

exports.filterByName = function(req, res) {
  var name = getParam(req, 'name');
  console.log('List by name : name=' + name);

  var PEOPLES = _.union(_.where(PEOPLES, { lastname: name }), _.where(PEOPLES, { firstname: name }));

  return res.status(200).json(PEOPLES);
};

exports.filterBySkill = function(req, res) {
  var skill = getParam(req, 'skill');
  console.log('List by skill : skill=' + skill);

  var filteredPeoples = _.filter(PEOPLES, function(person) {
    return _.contains(person.skills, skill);
  });

  return res.status(200).json(filteredPeoples);
};

exports.get = function(req, res) {
  var id = getId(req);
  console.log('Get person : id=' + id);

  var person = _.findWhere(PEOPLES, { id: id });

  if (!person) {
    return res.status(404).json({ error: 'La personne avec l\'id "' + id + '" n\'existe pas.' });
  }

  return res.status(200).json(person);
};

exports.getRandom = function(req, res) {
  var person = PEOPLES[Math.floor(Math.random() * PEOPLES.length)];
  if (!person) {
    return res.status(204).json();
  }
  return res.status(200).json(person);
};

exports.create = function(req, res) {
  var person = req.body;
  var lastname = person.lastname;
  var firstname = person.firstname;
  console.log('Create person : lastname=' + lastname + ', firstname=' + firstname);

  var found = _.findWhere(PEOPLES, { lastname: lastname, firstname: firstname });
  if (found) {
    return res.status(409).json({ error: 'La personne "' + lastname + ' ' + firstname + '" existe déjà.' });
  }

  delete person.id;
  person.id = createId();
  person.entryDate = parseDate('01/03/2016');
  person.birthDate = parseDate('02/06/1991');
  PEOPLES.push(person);

  return res.status(200).json(person);
};

exports.update = function(req, res) {
  var id = getId(req);
  console.log('Update person : id=' + id);

  var person = req.body;

  var index = _.findIndex(PEOPLES, function(p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'La personne avec l\'id "' + id + '" n\'existe pas.' });
  }

  Object.assign(PEOPLES[index], person);

  return res.status(200).json(PEOPLES[index]);
};

exports.delete = function(req, res) {
  var id = getId(req);
  console.log('Delete person : id=' + id);

  var index = _.findIndex(PEOPLES, function(p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'La personne avec l\'id "' + id + '" n\'existe pas.' });
  }

  PEOPLES.splice(index, 1);

  if (!PEOPLES || PEOPLES.length === 0) {
    return res.status(204).json();
  }

  return res.status(200).json(PEOPLES);
};

function getParam(req, param) {
  return req.params[param];
}

function getId(req) {
  var param = getParam(req, 'id');
  return param;
}

function createId() {
  return new Date().getTime() + '';
}

function parseDate(stringDate) {
  const dates = stringDate.split('/');
  return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
}
