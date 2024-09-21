import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://pmanzanares:7iSH0lNkFdGyyjkn@eva-u3-express.o81yr.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express';
            
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client