import mongoose from 'mongoose';

const connection = { isConnected: false };

async function DataBaseConnect(dataBase) {
    if (connection.isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        const uri = `mongodb://localhost:27017/${dataBase}`;
        
        if (mongoose.connection.readyState === 1 && mongoose.connection.host !== uri) {
            await mongoose.disconnect();
        }
        
        await mongoose.connect(uri);

        connection.isConnected = mongoose.connection.readyState === 1;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default DataBaseConnect;
