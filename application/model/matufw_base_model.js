/**
	Core model
*/

function baseModel(child) {

/**
	Base model helpers
*/
	
	connectToDb = function(callback) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://localhost/space', function(err, db) {
			if(err) throw err;
			var collection = db.collection(child.collectionName);
			callback(err, db, collection);
		});
	}

/** 
	"Inheritable" base model functions
*/
	child.createObject = function(modelData) {
		// Array of field names
		var _modelData = modelData;
		var obj = {};
		for (var variable in modelData) {
			obj[variable] = modelData[variable];
		}
		return obj;
	}

	child.fetchById = function(primaryId, callback) {
		connectToDb(function(err, db, collection){
			if(err) throw err;
			var name = child.primaryId;
			var collection = db.collection(child.collectionName);
			var BSON = require('mongodb').BSONPure;

			// TODO: This was a weird way to get around the problem when primaryID was not recognized being a string.
			// Will have to analyze this futher at some point...
			var primaryIdStr = new String(primaryId);
			var oID = new BSON.ObjectID(primaryIdStr);
			
			collection.findOne( { '_id' :  oID }, function(err, doc) {
				if(err) throw err;				
				var obj = child.createObject(doc);
				db.close();
				callback(err, obj);
			});

		});
	}

	child.fetch = function(query, callback) {
		connectToDb(function(err, db, collection){
			if(err) throw err;
			var name = child.primaryId;
			var collection = db.collection(child.collectionName);
			collection.find(query).toArray(function(err, doc) {
				if(err) throw err;				
				db.close();
				callback(err, doc);
			});

		});
	}

	child.create = function(modelData, callback) {
		connectToDb(function(err, db, collection){
			db.collection(child.collectionName).insert(modelData, function(err, records) {
				if(err) throw err;
				console.log("Record added as " + records[0]._id);
				if (typeof callback !== 'undefined') {
					callback(records[0]._id);					
				}
				db.close();
			});
		});
	}

	child.remove = function(primaryId) {
		var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://localhost/space', function(err, db) {
			if(err) throw err;
			var collection = db.collection(child.collectionName);


		});		
	}
};

module.exports = baseModel;