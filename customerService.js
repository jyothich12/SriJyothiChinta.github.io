const sequenceCollectionName = process.env.MONGO_CUSTOMER_SEQUENCE;
const sequenceName = process.env.MONGO_CUSTOMER_ID_SEED;
const customerCollectionName = process.env.MONGO_CUSTOMER_COLLECTION;
const dbName = process.env.MONGO_DATABASE_NAME;

const getCustomerByEmail = async (client, email) => {
	try {

		const db = client.db(dbName);

	    // Access the collection
	    const collection = db.collection(customerCollectionName);

	    // Find the document by email
	    const document = await collection.findOne({ email: email });
	    return document;

	  } catch (err) {
	    console.error('Error getting document by name:', err);
    	throw err;
	  }

}

const createCustomer = async (client, customer) => {

	try {
		const db = client.db(dbName);

		const customerId = await getNextSequenceValue(db);
		customer.customerId = customerId;

		const collection = db.collection(customerCollectionName);
		const result = await collection.insertOne(customer);

		//console.log('Document inserted successfully. Inserted ID:', result.insertedId)
		return customerId;

	} catch (err) {
	    console.error('Error creating document:', err);
    	throw err;
	}

}


const updateCustomer = async (client, id, updatedCustomer) => {
	try {

		const db = client.db(dbName);

	    // Access the collection
	    const collection = db.collection(customerCollectionName);

	    // Update the document
	    const result = await collection.updateOne({ id: id }, { $set: updatedCustomer });
	    //console.log('Document updated successfully.');
	  } catch (err) {
	    console.error('Error updating document:', err);
    	throw err;
	  }

}

// Function to get the next sequence value
const getNextSequenceValue = async (db) => {
  try {

    // Access the sequence collection
    const sequenceCollection = db.collection(sequenceCollectionName);

    // Find the sequence document and increment the value
    const result = await sequenceCollection.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { customerIdSeedValue: 1 } },
      { upsert: true, returnDocument: 'after' }
    );

    return result.value.customerIdSeedValue;

  } catch (err) {
    console.error('Error getting next sequence value:', err);
    throw err;
  }
}


module.exports = { getCustomerByEmail, createCustomer, updateCustomer }