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
			var oID = new BSON.ObjectID('52f07da3d85b1ad15d2ede7f');
			collection.findOne( { '_id' : oID }, function(err, doc) {
				if(err) throw err;				
				var obj = child.createObject(doc);
				callback(err, obj);
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