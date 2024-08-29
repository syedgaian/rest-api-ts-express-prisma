
import { load } from "@langchain/core/load";
import { SerializerProtocol } from "@langchain/langgraph-checkpoint"

const CustomSerializer = {
    // Standard JSON stringify, converted to Buffer for storage
    stringify(obj: any) {
        return Buffer.from(JSON.stringify(obj));
    },

    // Parse method that converts Buffer back to the expected object using `load`
    async parse(data: Buffer) {
        return await load(data.toString());
    },
};

export default CustomSerializer;
