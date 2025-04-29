import mongoose from "mongoose";

const ConnectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);

        if (connection.STATES.connected) {
            console.log(`Connected Db to : ${connection.connection.host}`);
        }

        if (connection.STATES.disconnected) {
            console.log(`DisConnecting Db to ${connection.connection.host}`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default ConnectDb;
